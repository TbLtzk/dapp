import { Asset, BorrowAssetsRateAndFee, SavingAssets, VaultWithFee } from 'typings/defi';

export type DeFiError = {
  error: Error | unknown | any;
};

export interface SetCreateVault {
  type: 'SET_CREATE_VAULT';
  asset: Asset;
}

export interface GetBorrowingVaults {
  type: 'GET_BORROWING_VAULTS';
}

export interface GetBorrowingVaultsSuccess {
  type: 'GET_BORROWING_VAULTS_SUCCESS';
  vaults: VaultWithFee[];
}

export interface GetBorrowingVaultsError extends DeFiError {
  type: 'GET_BORROWING_VAULTS_ERROR';
}

export interface GetSavingAssets {
  type: 'GET_SAVING_ASSETS';
}

export interface GetSavingAssetsSuccess {
  type: 'GET_SAVING_ASSETS_SUCCESS';
  savingAssets: SavingAssets[];
}

export interface GetSavingAssetsError extends DeFiError {
  type: 'GET_SAVING_ASSETS_ERROR';
}

export interface GetTotalSavingBalance {
  type: 'GET_TOTAL_SAVING_BALANCE';
}

export interface GetTotalSavingBalanceSuccess {
  type: 'GET_TOTAL_SAVING_BALANCE_SUCCESS';
  totalSavingBalance: string | number;
}

export interface GetTotalSavingBalanceError extends DeFiError {
  type: 'GET_TOTAL_SAVING_BALANCE_ERROR';
}

export interface GetOutstandingDebt {
  type: 'GET_OUTSTANDING_DEBT';
}

export interface GetOutstandingDebtSuccess {
  type: 'GET_OUTSTANDING_DEBT_SUCCESS';
  outstandingDebt: number;
}

export interface GetOutstandingDebtError extends DeFiError {
  type: 'GET_OUTSTANDING_DEBT_ERROR';
}

export interface GetSavingRate {
  type: 'GET_SAVING_RATE';
}

export interface GetSavingRateSuccess {
  type: 'GET_SAVING_RATE_SUCCESS';
  savingRate: number;
}

export interface GetSavingRateError extends DeFiError {
  type: 'GET_SAVING_RATE_ERROR';
}

export interface GetInterestRates {
  type: 'GET_INTEREST_RATES';
}

export interface GetInterestRatesSuccess {
  type: 'GET_INTEREST_RATES_SUCCESS';
  interestRates: BorrowAssetsRateAndFee[];
}

export interface GetInterestRatesError extends DeFiError {
  type: 'GET_INTEREST_RATES_ERROR';
}

export type BorrowingCoreActions =
  | GetBorrowingVaultsSuccess
  | GetBorrowingVaultsError
  | GetSavingAssetsSuccess
  | GetSavingAssetsError
  | GetTotalSavingBalanceSuccess
  | GetTotalSavingBalanceError
  | GetOutstandingDebtSuccess
  | GetOutstandingDebtError
  | GetSavingRateSuccess
  | GetSavingRateError
  | GetInterestRatesSuccess
  | GetInterestRatesError;
