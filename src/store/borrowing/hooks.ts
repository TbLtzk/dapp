import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { toBigNumber } from '@q-dev/utils';
import { ErrorHandler } from 'helpers';
import { Asset } from 'typings/defi';

import {
  setBorrowingFee,
  setBorrowingVaults,
  setBorrowingVaultsError,
  setCollateralBalance,
  setInterestRates,
} from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getBorrowingCoreInstance, getBorrowingInstance } from 'contracts/contract-instance';
import { prepareVaultdata } from 'contracts/helpers/borrow-assets-helper';
import { getBorrowAssetRateAndFee } from 'contracts/helpers/borrowing-core';

import { fromWei } from 'utils/web3';

export function useBorrowing () {
  const dispatch = useDispatch();
  const collateralBalance = useAppSelector(({ borrowing }) => borrowing.collateralBalance);
  const borrowingFee = useAppSelector(({ borrowing }) => borrowing.borrowingFee);

  async function getCollateralBalance (asset: Asset) {
    try {
      const borrowingInstance = await getBorrowingInstance(asset);
      const [decimals, balance] = await Promise.all([
        borrowingInstance.decimals(),
        borrowingInstance.balanceOf(getUserAddress())
      ]);
      dispatch(setCollateralBalance(fromWei(balance, decimals)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getBorrowingFee (asset: Asset) {
    try {
      const { borrowingFee } = await getBorrowAssetRateAndFee(asset);
      dispatch(setBorrowingFee(borrowingFee));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function updateBorrowingCompoundRate (asset: Asset) {
    const contract = await getBorrowingCoreInstance();
    return contract.updateCompoundRate(asset, { from: getUserAddress() });
  }

  return {
    collateralBalance,
    borrowingFee,

    getCollateralBalance: useCallback(getCollateralBalance, []),
    getBorrowingFee: useCallback(getBorrowingFee, []),
    updateBorrowingCompoundRate: useCallback(updateBorrowingCompoundRate, [])
  };
}

export function useInterestRates () {
  const dispatch = useDispatch();

  const interestRates = useAppSelector(({ borrowing }) => borrowing.interestRates);
  const interestRatesLoading = useAppSelector(({ borrowing }) => borrowing.interestRatesLoading);

  async function getInterestRates (collaterals: Asset[]) {
    try {
      const userAddress = getUserAddress();
      const contract = await getBorrowingCoreInstance();
      const vaults = await contract.getAllUserVaults(userAddress);

      const debts = await Promise.all(
        vaults.map(async (v, id) => ({
          asset: v.colKey,
          debt: fromWei(await contract.getFullDebt(userAddress, id))
        }))
      );

      const interestRates = await Promise.all(
        collaterals.map(getBorrowAssetRateAndFee)
      );

      const rates = interestRates.map(item => ({
        ...item,
        outstandingDebt: debts
          .filter(({ asset }) => asset === item.asset)
          .reduce((acc, { debt }) => acc.plus(toBigNumber(debt)), toBigNumber(0))
          .toString()
      }));

      dispatch(setInterestRates(rates));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    interestRates,
    interestRatesLoading,
    getInterestRates: useCallback(getInterestRates, []),
  };
}

export function useBorrowingVaults () {
  const dispatch = useDispatch();

  const borrowingVaults = useAppSelector(({ borrowing }) => borrowing.borrowingVaults);
  const borrowingVaultsLoading = useAppSelector(({ borrowing }) => borrowing.borrowingVaultsLoading);
  const borrowingVaultsError = useAppSelector(({ borrowing }) => borrowing.borrowingVaultsError);

  async function getBorrowingVaults () {
    try {
      const contract = await getBorrowingCoreInstance();
      const allUserVaults = await contract.getAllUserVaults(getUserAddress());
      const vaultsWithId = allUserVaults.map((vault, id) => ({ ...vault, id }));

      const vaults = await Promise.all(vaultsWithId.map(async (vault) => {
        const vaultStats = await contract.getVaultStats(getUserAddress(), vault.id);
        const borrowVault = await prepareVaultdata(vaultStats, getUserAddress());
        return {
          ...vault,
          assetPrice: borrowVault.collateralDetails.assetPrice,
          outstandingDebt: borrowVault.borrowingDetails.outstandingDebt,
          borrowingLimit: borrowVault.borrowingDetails.borrowingLimit,
          lockedCollateral: borrowVault.collateralDetails.lockedCollateral,
        };
      }));
      dispatch(setBorrowingVaults(vaults));
    } catch (error) {
      dispatch(setBorrowingVaultsError(error));
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function createVault (asset: Asset) {
    const contract = await getBorrowingCoreInstance();
    const tx = await contract.createVault(asset, { from: getUserAddress() });

    return {
      tx,
      onSuccess: () => {
        getBorrowingVaults();
      }
    };
  }

  return {
    borrowingVaults,
    borrowingVaultsLoading,
    borrowingVaultsError,

    getBorrowingVaults: useCallback(getBorrowingVaults, []),
    createVault: useCallback(createVault, []),
  };
}
