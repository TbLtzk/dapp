import { useCallback, useState } from 'react';

import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import { ApproveType, Asset, StablecoinAsset, VaultData } from 'typings/defi';

import { getBorrowingCoreInstance, getBorrowingInstance, getStableCoinInstance } from 'contracts/contract-instance';
import { prepareVaultdata } from 'contracts/helpers/borrow-assets-helper';

import { MAX_APPROVE_AMOUNT, UINT_PSEUDO_UNDEFINED } from 'constants/boundaries';
import { Bus } from 'utils/event-bus';
import { fromWei, toWei } from 'utils/web3';

function getDefaultVaultData () {
  return {
    collateralDetails: {
      collateralAsset: '' as Asset,
      lockedCollateral: '0',
      assetPrice: '0',
      availableWithdraw: '0',
      availableDeposit: '0',
      liquidationPrice: UINT_PSEUDO_UNDEFINED,
      decimals: 0
    },
    borrowingDetails: {
      collateralValue: 0,
      borrowingFee: 0,
      borrowingAsset: '0',
      borrowingLimit: '0',
      availableBorrow: '0',
      availableRepay: '0',
      outstandingDebt: '0',
      liquidationLimit: '0',
    }
  };
}

export function useBorrowAssets (stablecoinAsset: StablecoinAsset) {
  const [borrowVault, setBorrowVault] = useState<VaultData>(getDefaultVaultData());
  const [allowanceDeposit, setAllowanceDeposit] = useState('0');
  const [allowanceRepay, setAllowanceRepay] = useState('0');
  const { address: accountAddress } = useWeb3Context();

  async function getBorrowingVault (vaultId: number | string) {
    try {
      const contract = await getBorrowingCoreInstance(stablecoinAsset);
      const vaultStats = await contract.getVaultStats(accountAddress, vaultId);
      const borrowVault = await prepareVaultdata(stablecoinAsset, vaultStats, accountAddress);

      setBorrowVault(borrowVault);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getBorrowingAllowance ({ borrowType, asset }: { borrowType: ApproveType; asset: Asset }) {
    try {
      const { address } = await getBorrowingCoreInstance(stablecoinAsset);
      if (borrowType === 'deposit') {
        const contract = await getBorrowingInstance(asset);
        const [allowAmount, decimals] = await Promise.all([
          contract.allowance(accountAddress, address),
          contract.decimals()
        ]);
        setAllowanceDeposit(fromWei(allowAmount, decimals));
      } else {
        const contract = await getStableCoinInstance(stablecoinAsset);
        const allowance = await contract.allowance(accountAddress, address);
        setAllowanceRepay(fromWei(allowance));
      }
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function approveBorrowing ({ borrowType, asset }: {
    borrowType: ApproveType;
    asset: Asset;
  }) {
    const { address } = await getBorrowingCoreInstance(stablecoinAsset);

    const contract = borrowType === 'deposit'
      ? await getBorrowingInstance(asset)
      : await getStableCoinInstance(stablecoinAsset);
    const tx = await contract.approve(address, MAX_APPROVE_AMOUNT, { from: accountAddress });

    return {
      tx,
      onSuccess: () => {
        Bus.updateBorrowingAllowance({ borrowType, asset });
      }
    };
  }

  async function borrowAsset ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance(stablecoinAsset);
    const tx = await contract.generateStc(vaultId, toWei(amount), { from: accountAddress });

    return {
      tx,
      onSuccess: () => {
        Bus.updateBorrowingVault(vaultId);
      }
    };
  }

  async function repayBorrowing ({ amount, vaultId }: { amount: string; vaultId: number }) {
    const contract = await getBorrowingCoreInstance(stablecoinAsset);
    const tx = await contract.payBackStc(vaultId, toWei(amount), { from: accountAddress });

    return {
      tx,
      onSuccess: () => {
        Bus.updateBorrowingVault(vaultId);
      }
    };
  }

  async function depositCollateral ({ amount, vaultId, decimals }: {
    amount: string;
    vaultId: number;
    decimals: number;
  }) {
    const contract = await getBorrowingCoreInstance(stablecoinAsset);
    const tx = await contract.depositCol(vaultId, toWei(amount, decimals), {
      from: accountAddress
    });

    return {
      tx,
      onSuccess: () => {
        Bus.updateBorrowingVault(vaultId);
      }
    };
  }

  async function withdrawCollateral ({ amount, vaultId, decimals }: {
    amount: string;
    vaultId: number;
    decimals: number;
  }) {
    const contract = await getBorrowingCoreInstance(stablecoinAsset);
    const tx = await contract.withdrawCol(vaultId, toWei(amount, decimals), {
      from: accountAddress
    });

    return {
      tx,
      onSuccess: () => {
        Bus.updateBorrowingVault(vaultId);
      }
    };
  }

  return {
    borrowVault,
    allowanceDeposit,
    allowanceRepay,

    getBorrowingVault: useCallback(getBorrowingVault, [stablecoinAsset]),
    getBorrowingAllowance: useCallback(getBorrowingAllowance, [stablecoinAsset]),
    approveBorrowing: useCallback(approveBorrowing, [stablecoinAsset]),
    borrowAsset: useCallback(borrowAsset, [stablecoinAsset]),
    repayBorrowing: useCallback(repayBorrowing, [stablecoinAsset]),
    depositCollateral: useCallback(depositCollateral, [stablecoinAsset]),
    withdrawCollateral: useCallback(withdrawCollateral, [stablecoinAsset]),
  };
}
