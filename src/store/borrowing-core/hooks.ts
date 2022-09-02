import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { sumBy } from 'lodash';
import { Asset } from 'typings/defi';
import { fromWei } from 'web3-utils';

import {
  setBorrowingVaults,
  setBorrowingVaultsError,
  setInterestRates,
  setOutstandingDebt,
  setSavingAssets,
  setSavingAssetsError,
  setSavingRate,
  setTotalSavingBalance,
} from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getBorrowingCoreInstance, getEpdrParametersInstance, getSavingInstance } from 'contracts/contract-instance';
import { getBorrowAssetRateAndFee, getVaultWithFee } from 'contracts/helpers/borrowing-core';

import { BorrowAssets } from 'constants/defi';
import { fillArray } from 'utils/arrays';
import { captureError } from 'utils/errors';
import { calculateInterestRate } from 'utils/numbers';

export function useBorrowingCore () {
  const dispatch = useDispatch();

  const mintedAmount = useAppSelector(({ borrowingCore }) => borrowingCore.mintedAmount);
  const liquidationFullDebt = useAppSelector(({ borrowingCore }) => borrowingCore.liquidationFullDebt);
  const normalizedDebt = useAppSelector(({ borrowingCore }) => borrowingCore.normalizedDebt);
  const outstandingDebt = useAppSelector(({ borrowingCore }) => borrowingCore.outstandingDebt);

  const borrowingVaults = useAppSelector(({ borrowingCore }) => borrowingCore.borrowingVaults);
  const borrowingVaultsLoading = useAppSelector(({ borrowingCore }) => borrowingCore.borrowingVaultsLoading);
  const borrowingVaultsError = useAppSelector(({ borrowingCore }) => borrowingCore.borrowingVaultsError);

  const totalSavingBalance = useAppSelector(({ borrowingCore }) => borrowingCore.totalSavingBalance);
  const interestRates = useAppSelector(({ borrowingCore }) => borrowingCore.interestRates);
  const savingRate = useAppSelector(({ borrowingCore }) => borrowingCore.savingRate);

  const savingAssets = useAppSelector(({ borrowingCore }) => borrowingCore.savingAssets);
  const savingAssetsLoading = useAppSelector(({ borrowingCore }) => borrowingCore.savingAssetsLoading);
  const savingAssetsError = useAppSelector(({ borrowingCore }) => borrowingCore.savingAssetsError);

  async function getBorrowingVaults () {
    try {
      const contract = await getBorrowingCoreInstance();
      const allUserVaults = await contract.getAllUserVaults(getUserAddress());
      const vaults = await Promise.all(allUserVaults.map((vault, vaultNum) => getVaultWithFee(vault, vaultNum)));
      dispatch(setBorrowingVaults(vaults));
    } catch (error) {
      dispatch(setBorrowingVaultsError(error));
      captureError(error);
    }
  }

  async function createVault (asset: Asset) {
    const contract = await getBorrowingCoreInstance();
    const receipt = await contract.createVault(asset, { from: getUserAddress() });

    getBorrowingVaults();
    return receipt;
  }

  async function getOutstandingDebt () {
    try {
      const userAddress = getUserAddress();
      const contract = await getBorrowingCoreInstance();
      const userVaultsCount = await contract.userVaultsCount(userAddress);

      const fullDebts = await Promise.all(
        fillArray(Number(userVaultsCount)).map((vaultNum) => contract.getFullDebt(userAddress, vaultNum))
      );

      const outstandingDebt = sumBy(fullDebts, item => Number(fromWei(item as string)));
      dispatch(setOutstandingDebt(outstandingDebt));
    } catch (error) {
      captureError(error);
    }
  }

  async function getTotalSavingBalance () {
    try {
      const contract = await getSavingInstance();
      const savingAmount = await contract.instance.methods.getBalance()
        .call({ from: getUserAddress() });
      dispatch(setTotalSavingBalance(fromWei(savingAmount)));
    } catch (error) {
      captureError(error);
    }
  }

  async function getSavingAssets () {
    try {
      const contract = await getSavingInstance();
      const balanceDetails = await contract.getBalanceDetails(getUserAddress());

      const interestRate = calculateInterestRate(Number(balanceDetails.interestRate));
      dispatch(setSavingAssets([{
        depositAsset: 'QUSD',
        interestAsset: 'QUSD',
        rate: interestRate,
      }]));
    } catch (error) {
      dispatch(setSavingAssetsError(error));
      captureError(error);
    }
  }

  async function getSavingRate () {
    try {
      const contract = await getEpdrParametersInstance();
      const savingRate = await contract.getUint('governed.EPDR.QUSD_savingRate');
      const rate = calculateInterestRate(Number(savingRate));
      dispatch(setSavingRate(rate));
    } catch (error) {
      captureError(error);
    }
  }

  async function getInterestRates () {
    try {
      const interestRates = await Promise.all(Object.values(BorrowAssets).map(getBorrowAssetRateAndFee));
      dispatch(setInterestRates(interestRates));
    } catch (error) {
      captureError(error);
    }
  }

  async function updateBorrowingCompoundRate (asset: Asset) {
    const contract = await getBorrowingCoreInstance();
    return contract.updateCompoundRate(asset, { from: getUserAddress(), gasBuffer: 1.2 });
  }

  return {
    mintedAmount,
    liquidationFullDebt,
    normalizedDebt,
    outstandingDebt,

    borrowingVaults,
    borrowingVaultsLoading,
    borrowingVaultsError,

    totalSavingBalance,
    interestRates,
    savingRate,

    savingAssets,
    savingAssetsLoading,
    savingAssetsError,

    getBorrowingVaults: useCallback(getBorrowingVaults, []),
    createVault: useCallback(createVault, []),
    getOutstandingDebt: useCallback(getOutstandingDebt, []),
    getTotalSavingBalance: useCallback(getTotalSavingBalance, []),
    getSavingAssets: useCallback(getSavingAssets, []),
    getSavingRate: useCallback(getSavingRate, []),
    getInterestRates: useCallback(getInterestRates, []),
    updateBorrowingCompoundRate: useCallback(updateBorrowingCompoundRate, [])
  };
}
