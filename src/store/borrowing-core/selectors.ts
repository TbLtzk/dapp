import { RootState } from 'store';

export const mintedAmountSelector = (state: RootState) => state.borrowingCore.mintedAmount;
export const liquidationFullDebtSelector = (state: RootState) => state.borrowingCore.liquidationFullDebt;
export const normalizedDebtSelector = (state: RootState) => state.borrowingCore.normalizedDebt;

export const borrowingVaultsSelector = (state: RootState) => state.borrowingCore.borrowingVaults;
export const borrowingVaultsLoadingSelector = (state: RootState) => state.borrowingCore.borrowingVaultsLoading;
export const borrowingVaultsErrorSelector = (state: RootState) => state.borrowingCore.borrowingVaultsError;

export const outstandingDebtSelector = (state: RootState) => state.borrowingCore.outstandingDebt;
export const outstandingDebtLoadingSelector = (state: RootState) => state.borrowingCore.outstandingDebtLoading;
export const outstandingDebtErrorSelector = (state: RootState) => state.borrowingCore.outstandingDebtError;

export const totalSavingBalanceSelector = (state: RootState) => state.borrowingCore.totalSavingBalance;
export const totalSavingBalanceLoadingSelector = (state: RootState) => state.borrowingCore.totalSavingBalanceLoading;
export const totalSavingBalanceErrorSelector = (state: RootState) => state.borrowingCore.totalSavingBalance;

export const interestRatesSelector = (state: RootState) => state.borrowingCore.interestRates;
export const interestRatesLoadingSelector = (state: RootState) => state.borrowingCore.interestRatesLoading;
export const interestRatesErrorSelector = (state: RootState) => state.borrowingCore.interestRatesError;

export const savingRateSelector = (state: RootState) => state.borrowingCore.savingRate;
export const savingRateLoadingSelector = (state: RootState) => state.borrowingCore.savingRateLoading;
export const savingRateErrorSelector = (state: RootState) => state.borrowingCore.savingRateError;

export const savingAssetsSelector = (state: RootState) => state.borrowingCore.savingAssets;
export const savingAssetsLoadingSelector = (state: RootState) => state.borrowingCore.savingAssetsLoading;
export const savingAssetsErrorSelector = (state: RootState) => state.borrowingCore.savingAssetsError;
