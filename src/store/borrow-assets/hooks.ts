import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ApproveType, Asset } from 'typings/defi';
import { TransactionReceipt } from 'web3-eth';
import { fromWei, toWei } from 'web3-utils';

import { setBorrowAllowanceDeposit, setBorrowAllowanceError, setBorrowAllowanceRepay, setBorrowVault, setBorrowVaultError } from './reducer';

import { getUserAddress, useAppSelector } from 'store';
import { useBorrowingCore } from 'store/borrowing-core/hooks';
import { useSavingAssets } from 'store/saving-assets/hooks';

import { getBorrowingCoreInstance } from 'contracts/contract-instance';
import { convertToBigAmount, getDeFiContractByType, prepareVaultdata } from 'contracts/helpers/borrow-assets-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import { captureError } from 'utils/errors';

export function useBorrowAssets () {
  const dispatch = useDispatch();
  const { getOutstandingDebt, getTotalSavingBalance } = useBorrowingCore();
  const { getSavingAvailableToDeposit } = useSavingAssets();

  const borrowVault = useAppSelector(({ borrowAssets }) => borrowAssets.borrowVault);
  const borrowVaultLoading = useAppSelector(({ borrowAssets }) => borrowAssets.borrowVaultLoading);
  const borrowVaultError = useAppSelector(({ borrowAssets }) => borrowAssets.borrowVaultError);

  const allowanceDeposit = useAppSelector(({ borrowAssets }) => borrowAssets.allowanceDeposit);
  const allowanceRepay = useAppSelector(({ borrowAssets }) => borrowAssets.allowanceRepay);
  const allowanceError = useAppSelector(({ borrowAssets }) => borrowAssets.allowanceError);

  async function getBorrowingVault (vaultId: number | string) {
    try {
      const userAddress = getUserAddress();
      const contract = await getBorrowingCoreInstance();
      const vaultStats = await contract.getVaultStats(userAddress, vaultId);
      const borrowVault = await prepareVaultdata(vaultStats, userAddress);

      dispatch(setBorrowVault(borrowVault));
    } catch (error) {
      dispatch(setBorrowVaultError(error));
      captureError(error);
    }
  }

  async function getBorrowingAllowance ({ borrowType, asset }: { borrowType: ApproveType; asset: Asset }) {
    try {
      const contract = await getDeFiContractByType(borrowType, asset);
      const borrowingCoreInstance = await getBorrowingCoreInstance();
      const allowance = await contract.allowance(getUserAddress(), borrowingCoreInstance.address);

      if (borrowType === 'deposit') {
        const allowAmount = await allowance.call();
        dispatch(setBorrowAllowanceDeposit(fromWei(allowAmount)));
      } else {
        dispatch(setBorrowAllowanceRepay(fromWei(allowance)));
      }
    } catch (error) {
      dispatch(setBorrowAllowanceError(error));
      captureError(error);
    }
  }

  async function approveBorrowing ({ borrowType, asset }: {
    borrowType: ApproveType;
    asset: Asset;
  }) {
    const userAddress = getUserAddress();
    const borrowingContract = await getBorrowingCoreInstance();
    const contract = await getDeFiContractByType(borrowType, asset);

    let receipt: TransactionReceipt;
    if (borrowType === 'deposit') {
      receipt = await contract.approve(borrowingContract.address, MAX_APPROVE_AMOUNT)
        .send({ from: userAddress });
    } else {
      receipt = await contract.approve(borrowingContract.address, MAX_APPROVE_AMOUNT, { from: userAddress });
    }

    getBorrowingAllowance({ borrowType, asset });
    return receipt;
  }

  async function borrowAsset ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance();
    const receipt = await contract.generateStc(vaultId, toWei(amount), { from: getUserAddress() });

    getBorrowingVault(vaultId);
    getOutstandingDebt();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();

    return receipt;
  }

  async function repayBorrowing ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance();
    const receipt = await contract.payBackStc(vaultId, toWei(amount), { from: getUserAddress() });

    getBorrowingVault(vaultId);
    getOutstandingDebt();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();

    return receipt;
  }

  async function depositCollateral ({ amount, vaultId, decimals }: {
    amount: string;
    vaultId: number;
    decimals: number;
  }) {
    const contract = await getBorrowingCoreInstance();
    const convertAmount = convertToBigAmount(decimals);
    const receipt = await contract.depositCol(vaultId, convertAmount(amount), {
      from: getUserAddress()
    });

    getBorrowingVault(vaultId);
    getOutstandingDebt();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();

    return receipt;
  }

  async function withdrawCollateral ({ amount, vaultId, decimals }: {
    amount: string;
    vaultId: number;
    decimals: number;
  }) {
    const contract = await getBorrowingCoreInstance();
    const convertAmount = convertToBigAmount(decimals);

    const receipt = await contract.withdrawCol(vaultId, convertAmount(amount), {
      from: getUserAddress()
    });
    await getBorrowingVault(vaultId);

    getOutstandingDebt();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();

    return receipt;
  }

  return {
    borrowVault,
    borrowVaultLoading,
    borrowVaultError,

    allowanceDeposit,
    allowanceRepay,
    allowanceError,

    getBorrowingVault: useCallback(getBorrowingVault, []),
    getBorrowingAllowance: useCallback(getBorrowingAllowance, []),
    approveBorrowing: useCallback(approveBorrowing, []),
    borrowAsset: useCallback(borrowAsset, []),
    repayBorrowing: useCallback(repayBorrowing, []),
    depositCollateral: useCallback(depositCollateral, []),
    withdrawCollateral: useCallback(withdrawCollateral, []),
  };
}
