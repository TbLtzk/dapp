import { BorrowAssetsRateAndFee, SavingAssets, VaultWithFee } from 'typings/defi';

import * as types from './types';

interface BorrowingCoreItems {
  mintedAmount: number | string;
  normalizedDebt: number | string;
  liquidationFullDebt: number | string;

  borrowingVaults: VaultWithFee[];
  borrowingVaultsError: Error | null | unknown;
  borrowingVaultsLoading: boolean;

  outstandingDebt: number;
  outstandingDebtLoading: boolean;
  outstandingDebtError: Error | null | unknown;

  savingAssets: SavingAssets[];
  savingAssetsLoading: boolean;
  savingAssetsError: Error | null | unknown;

  totalSavingBalance: number | string;
  totalSavingBalanceLoading: boolean;
  totalSavingBalanceError: Error | null | unknown;

  savingRate: number | string;
  savingRateLoading: boolean;
  savingRateError: Error | null | unknown;

  interestRates: BorrowAssetsRateAndFee[];
  interestRatesLoading: boolean;
  interestRatesError: Error | null | unknown;
}

const initialState: BorrowingCoreItems = {
  mintedAmount: 0,
  normalizedDebt: 0,
  liquidationFullDebt: 0,

  borrowingVaults: [],
  borrowingVaultsError: null,
  borrowingVaultsLoading: true,

  outstandingDebt: 0,
  outstandingDebtLoading: true,
  outstandingDebtError: null,

  savingAssets: [],
  savingAssetsLoading: true,
  savingAssetsError: null,

  totalSavingBalance: 0,
  totalSavingBalanceLoading: true,
  totalSavingBalanceError: null,

  savingRate: 0,
  savingRateLoading: true,
  savingRateError: null,

  interestRates: [],
  interestRatesLoading: true,
  interestRatesError: null,
};

export default function reducer (state = initialState, action: types.BorrowingCoreActions) {
  switch (action.type) {
    case 'GET_BORROWING_VAULTS_SUCCESS':
      return {
        ...state,
        mintedAmount: 0,
        normalizedDebt: 0,
        liquidationFullDebt: 0,
        borrowingVaults: action.vaults,
        borrowingVaultsLoading: false,
      };
    case 'GET_BORROWING_VAULTS_ERROR':
      return {
        ...state,
        borrowingVaults: [],
        borrowingVaultsError: action.error,
        borrowingVaultsLoading: false,
      };
    case 'GET_SAVING_ASSETS_SUCCESS':
      return {
        ...state,
        savingAssets: action.savingAssets,
        savingAssetsLoading: false,
      };
    case 'GET_SAVING_ASSETS_ERROR':
      return {
        ...state,
        savingAssetsError: action.error,
        savingAssetsLoading: false,
      };
    case 'GET_TOTAL_SAVING_BALANCE_SUCCESS':
      return {
        ...state,
        totalSavingBalance: action.totalSavingBalance,
        totalSavingBalanceLoading: false,
      };
    case 'GET_TOTAL_SAVING_BALANCE_ERROR':
      return {
        ...state,
        totalSavingBalanceError: action.error,
        totalSavingBalanceLoading: false,
      };
    case 'GET_OUTSTANDING_DEBT_SUCCESS':
      return {
        ...state,
        outstandingDebt: action.outstandingDebt,
        outstandingDebtLoading: false,
      };
    case 'GET_OUTSTANDING_DEBT_ERROR':
      return {
        ...state,
        outstandingDebtError: action.error,
        outstandingDebtLoading: false,
      };

    case 'GET_SAVING_RATE_SUCCESS':
      return {
        ...state,
        savingRate: action.savingRate,
        savingRateLoading: false,
      };

    case 'GET_SAVING_RATE_ERROR':
      return {
        ...state,
        savingRateERROR: action.error,
        savingRateLoading: false,
      };

    case 'GET_INTEREST_RATES_SUCCESS':
      return {
        ...state,
        interestRates: action.interestRates,
        interestRatesLoading: false,
      };
    case 'GET_INTEREST_RATES_ERROR':
      return {
        ...state,
        interestRatesError: action.error,
        interestRatesLoading: false,
      };
    default:
      return state;
  }
}
