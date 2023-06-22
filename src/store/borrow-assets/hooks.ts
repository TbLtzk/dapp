import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorHandler } from 'helpers';
import { ApproveType, Asset } from 'typings/defi';

import { setBorrowAllowanceDeposit, setBorrowAllowanceError, setBorrowAllowanceRepay, setBorrowVault, setBorrowVaultError } from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getBorrowingCoreInstance, getBorrowingInstance, getStableCoinInstance } from 'contracts/contract-instance';
import { prepareVaultdata } from 'contracts/helpers/borrow-assets-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import { fromWei, toWei } from 'utils/web3';

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
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getBorrowingAllowance ({ borrowType, asset }: { borrowType: ApproveType; asset: Asset }) {
    try {
      const { address } = await getBorrowingCoreInstance();
      if (borrowType === 'deposit') {
        const contract = await getBorrowingInstance(asset);
        const [allowAmount, decimals] = await Promise.all([
          contract.allowance(getUserAddress(), address),
          contract.decimals()
        ]);
        dispatch(setBorrowAllowanceDeposit(fromWei(allowAmount, decimals)));
      } else {
        const contract = await getStableCoinInstance();
        const allowance = await contract.allowance(getUserAddress(), address);
        dispatch(setBorrowAllowanceRepay(fromWei(allowance)));
      }
    } catch (error) {
      dispatch(setBorrowAllowanceError(error));
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function approveBorrowing ({ borrowType, asset }: {
    borrowType: ApproveType;
    asset: Asset;
  }) {
    const userAddress = getUserAddress();
    const { address } = await getBorrowingCoreInstance();

    const contract = borrowType === 'deposit'
      ? await getBorrowingInstance(asset)
      : await getStableCoinInstance();
    const tx = await contract.approve(address, MAX_APPROVE_AMOUNT, { from: userAddress });

    return {
      tx,
      onSuccess: () => {
        getBorrowingAllowance({ borrowType, asset });
      }
    };
  }

  async function borrowAsset ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance();
    const tx = await contract.generateStc(vaultId, toWei(amount), { from: getUserAddress() });

    return {
      tx,
      onSuccess: () => {
        getBorrowingVault(vaultId);
      }
    };
  }

  async function repayBorrowing ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance();
    const tx = await contract.payBackStc(vaultId, toWei(amount), { from: getUserAddress() });

    return {
      tx,
      onSuccess: () => {
        getBorrowingVault(vaultId);
      }
    };
  }

  async function depositCollateral ({ amount, vaultId, decimals }: {
    amount: string;
    vaultId: number;
    decimals: number;
  }) {
    const contract = await getBorrowingCoreInstance();
    const tx = await contract.depositCol(vaultId, toWei(amount, decimals), {
      from: getUserAddress()
    });

    return {
      tx,
      onSuccess: () => {
        getBorrowingVault(vaultId);
      }
    };
  }

  async function withdrawCollateral ({ amount, vaultId, decimals }: {
    amount: string;
    vaultId: number;
    decimals: number;
  }) {
    const contract = await getBorrowingCoreInstance();
    const tx = await contract.withdrawCol(vaultId, toWei(amount, decimals), {
      from: getUserAddress()
    });

    return {
      tx,
      onSuccess: () => {
        getBorrowingVault(vaultId);
      }
    };
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
