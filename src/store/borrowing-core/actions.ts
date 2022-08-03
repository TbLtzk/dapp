import { Asset, BorrowAssetsRateAndFee, SavingAssets, VaultWithFee } from 'typings/defi';

import * as types from './types';

export const setCreateVault = (asset: Asset, label: string): types.SetCreateVault => ({
  type: 'SET_CREATE_VAULT',
  asset,
  label,
});

export const getBorrowingVaults = (): types.GetBorrowingVaults => ({
  type: 'GET_BORROWING_VAULTS',
});

export const getBorrowingVaultsSuccess = (vaults: VaultWithFee[]): types.GetBorrowingVaultsSuccess => ({
  type: 'GET_BORROWING_VAULTS_SUCCESS',
  vaults,
});

export const getBorrowingVaultsError = (error: Error | unknown): types.GetBorrowingVaultsError => ({
  type: 'GET_BORROWING_VAULTS_ERROR',
  error,
});

export const getSavingAssets = (): types.GetSavingAssets => ({
  type: 'GET_SAVING_ASSETS',
});

export const getSavingAssetsSuccess = (savingAssets: SavingAssets[]): types.GetSavingAssetsSuccess => ({
  type: 'GET_SAVING_ASSETS_SUCCESS',
  savingAssets,
});

export const getSavingAssetsError = (error: Error | unknown): types.GetSavingAssetsError => ({
  type: 'GET_SAVING_ASSETS_ERROR',
  error,
});

export const getTotalSavingBalance = (): types.GetTotalSavingBalance => ({
  type: 'GET_TOTAL_SAVING_BALANCE',
});

export const getTotalSavingBalanceSuccess = (
  totalSavingBalance: string | number
): types.GetTotalSavingBalanceSuccess => ({
  type: 'GET_TOTAL_SAVING_BALANCE_SUCCESS',
  totalSavingBalance,
});

export const getTotalSavingBalanceError = (error: Error | unknown): types.GetTotalSavingBalanceError => ({
  type: 'GET_TOTAL_SAVING_BALANCE_ERROR',
  error,
});

export const getOutstandingDebt = (): types.GetOutstandingDebt => ({
  type: 'GET_OUTSTANDING_DEBT',
});

export const getOutstandingDebtSuccess = (outstandingDebt: number): types.GetOutstandingDebtSuccess => ({
  type: 'GET_OUTSTANDING_DEBT_SUCCESS',
  outstandingDebt,
});

export const getOutstandingDebtError = (error: Error | unknown): types.GetOutstandingDebtError => ({
  type: 'GET_OUTSTANDING_DEBT_ERROR',
  error,
});

export const getSavingRate = (): types.GetSavingRate => ({
  type: 'GET_SAVING_RATE',
});

export const getSavingRateSuccess = (savingRate: number): types.GetSavingRateSuccess => ({
  type: 'GET_SAVING_RATE_SUCCESS',
  savingRate,
});

export const getSavingRateError = (error: Error | unknown): types.GetSavingRateError => ({
  type: 'GET_SAVING_RATE_ERROR',
  error,
});

export const getInterestRates = (): types.GetInterestRates => ({
  type: 'GET_INTEREST_RATES',
});

export const getInterestRatesSuccess = (interestRates: BorrowAssetsRateAndFee[]): types.GetInterestRatesSuccess => ({
  type: 'GET_INTEREST_RATES_SUCCESS',
  interestRates,
});

export const getInterestRatesError = (error: Error | unknown): types.GetInterestRatesError => ({
  type: 'GET_INTEREST_RATES_ERROR',
  error,
});
