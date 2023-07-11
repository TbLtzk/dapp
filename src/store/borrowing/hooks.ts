import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { toBigNumber } from '@q-dev/utils';
import { ErrorHandler } from 'helpers';
import { Asset, StablecoinAsset } from 'typings/defi';

import {
  setAssetInfo,
  setBorrowingFee,
  setBorrowingVaults,
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

  const assets = useAppSelector(({ borrowing }) => borrowing.assetsMap);

  function getAssetInfo (asset: Asset) {
    return assets[asset].info;
  }

  function getCollateralBalance (asset: Asset) {
    return assets[asset].collateralBalance;
  }

  function getBorrowingFee (asset: Asset, stablecoinAsset: StablecoinAsset) {
    return assets[asset].borrowingFee[stablecoinAsset];
  }

  async function loadAssetInfo (asset: Asset) {
    try {
      const borrowingInstance = await getBorrowingInstance(asset);
      const [decimals, symbol, name] = await Promise.all([
        borrowingInstance.decimals(),
        borrowingInstance.symbol(),
        borrowingInstance.name(),
      ]);
      dispatch(setAssetInfo({
        asset,
        info: { decimals, symbol, name }
      }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadCollateralBalance (asset: Asset) {
    try {
      const borrowingInstance = await getBorrowingInstance(asset);
      const balance = await borrowingInstance.balanceOf(getUserAddress());
      dispatch(setCollateralBalance({ asset, balance }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadBorrowingFee (asset: Asset, stablecoinAsset: StablecoinAsset) {
    try {
      const { borrowingFee } = await getBorrowAssetRateAndFee(asset, stablecoinAsset);
      dispatch(setBorrowingFee({ asset, stablecoinAsset, borrowingFee }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function updateBorrowingCompoundRate (asset: Asset, stablecoinAsset: StablecoinAsset) {
    const contract = await getBorrowingCoreInstance(stablecoinAsset);
    return contract.updateCompoundRate(asset, { from: getUserAddress() });
  }

  return {
    getAssetInfo,
    getCollateralBalance,
    getBorrowingFee,

    loadAssetInfo: useCallback(loadAssetInfo, []),
    loadCollateralBalance: useCallback(loadCollateralBalance, []),
    loadBorrowingFee: useCallback(loadBorrowingFee, []),
    updateBorrowingCompoundRate: useCallback(updateBorrowingCompoundRate, [])
  };
}

export function useInterestRates (asset: StablecoinAsset) {
  const dispatch = useDispatch();

  const interestRates = useAppSelector(({ borrowing }) => borrowing.stablecoinMap[asset].interestRates);
  const interestRatesLoading = useAppSelector(({ borrowing }) => borrowing.stablecoinMap[asset].interestRatesLoading);

  async function loadInterestRates (collaterals: Asset[]) {
    try {
      const userAddress = getUserAddress();
      const contract = await getBorrowingCoreInstance(asset);
      const vaults = await contract.getAllUserVaults(userAddress);

      const debts = await Promise.all(
        vaults.map(async (v, id) => ({
          asset: v.colKey,
          debt: fromWei(await contract.getFullDebt(userAddress, id))
        }))
      );

      const interestRates = await Promise.all(
        collaterals.map((item) => getBorrowAssetRateAndFee(item, asset))
      );

      const rates = interestRates.map(item => ({
        ...item,
        outstandingDebt: debts
          .filter(({ asset }) => asset === item.asset)
          .reduce((acc, { debt }) => acc.plus(toBigNumber(debt)), toBigNumber(0))
          .toString()
      }));

      dispatch(setInterestRates({ stablecoinAsset: asset, rates }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    interestRates,
    interestRatesLoading,
    loadInterestRates: useCallback(loadInterestRates, [asset]),
  };
}

export function useBorrowingVaults (asset: StablecoinAsset) {
  const dispatch = useDispatch();

  const borrowingVaults = useAppSelector(({ borrowing }) => borrowing.stablecoinMap[asset].borrowingVaults);
  const borrowingVaultsLoading = useAppSelector(({ borrowing }) =>
    borrowing.stablecoinMap[asset].borrowingVaultsLoading
  );

  async function loadBorrowingVaults () {
    try {
      const contract = await getBorrowingCoreInstance(asset);
      const allUserVaults = await contract.getAllUserVaults(getUserAddress());
      const vaultsWithId = allUserVaults.map((vault, id) => ({ ...vault, id }));

      const vaults = await Promise.all(vaultsWithId.map(async (vault) => {
        const vaultStats = await contract.getVaultStats(getUserAddress(), vault.id);
        const borrowVault = await prepareVaultdata(asset, vaultStats, getUserAddress());
        return {
          ...vault,
          assetPrice: borrowVault.collateralDetails.assetPrice,
          outstandingDebt: borrowVault.borrowingDetails.outstandingDebt,
          borrowingLimit: borrowVault.borrowingDetails.borrowingLimit,
          lockedCollateral: borrowVault.collateralDetails.lockedCollateral,
        };
      }));
      dispatch(setBorrowingVaults({ stablecoinAsset: asset, vaults }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function createVault (borrowingAsset: Asset) {
    const contract = await getBorrowingCoreInstance(asset);
    const tx = await contract.createVault(borrowingAsset, { from: getUserAddress() });

    return {
      tx,
      onSuccess: () => {
        loadBorrowingVaults();
      }
    };
  }

  return {
    borrowingVaults,
    borrowingVaultsLoading,

    loadBorrowingVaults: useCallback(loadBorrowingVaults, [asset]),
    createVault: useCallback(createVault, [asset]),
  };
}
