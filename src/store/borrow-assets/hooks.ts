import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SubmitTransactionResponse } from '@q-dev/q-js-sdk';
import { ApproveType, Asset } from 'typings/defi';
import { fromWei, toWei } from 'web3-utils';

import { setBorrowAllowanceDeposit, setBorrowAllowanceError, setBorrowAllowanceRepay, setBorrowVault, setBorrowVaultError } from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getBorrowingCoreInstance, getBorrowingInstance, getStableCoinInstance } from 'contracts/contract-instance';
import { convertToBigAmount, prepareVaultdata } from 'contracts/helpers/borrow-assets-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import { captureError } from 'utils/errors';

export function useBorrowAssets () {
  const dispatch = useDispatch();

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
      const { address } = await getBorrowingCoreInstance();
      if (borrowType === 'deposit') {
        const contract = await getBorrowingInstance(asset);
        const allowAmount = await contract.methods.allowance(getUserAddress(), address).call();
        dispatch(setBorrowAllowanceDeposit(fromWei(allowAmount)));
      } else {
        const contract = await getStableCoinInstance();
        const allowance = await contract.allowance(getUserAddress(), address);
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
    const { address } = await getBorrowingCoreInstance();

    let receipt: SubmitTransactionResponse;
    if (borrowType === 'deposit') {
      const contract = await getBorrowingInstance(asset);
      receipt = {
        promiEvent: contract.methods.approve(address, MAX_APPROVE_AMOUNT)
          .send({ from: userAddress })
      };
    } else {
      const contract = await getStableCoinInstance();
      receipt = await contract.approve(address, MAX_APPROVE_AMOUNT, { from: userAddress });
    }

    if ('promiEvent' in receipt) {
      receipt?.promiEvent
        .once('receipt', () => {
          getBorrowingAllowance({ borrowType, asset });
        });
    }

    return receipt;
  }

  async function borrowAsset ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance();
    const receipt = await contract.generateStc(vaultId, toWei(amount), { from: getUserAddress() });

    receipt.promiEvent.once('receipt', () => { getBorrowingVault(vaultId); });
    return receipt;
  }

  async function repayBorrowing ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance();
    const receipt = await contract.payBackStc(vaultId, toWei(amount), { from: getUserAddress() });

    receipt.promiEvent.once('receipt', () => { getBorrowingVault(vaultId); });
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

    receipt.promiEvent.once('receipt', () => { getBorrowingVault(vaultId); });
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

    receipt.promiEvent.once('receipt', () => { getBorrowingVault(vaultId); });
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
