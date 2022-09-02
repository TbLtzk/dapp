import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BorrowAssetsRateAndFee, SavingAssets, VaultWithFee } from 'typings/defi';

interface BorrowingCoreState {
  mintedAmount: number | string;
  normalizedDebt: number | string;
  liquidationFullDebt: number | string;
  outstandingDebt: number;

  borrowingVaults: VaultWithFee[];
  borrowingVaultsError: Error | null | unknown;
  borrowingVaultsLoading: boolean;

  savingAssets: SavingAssets[];
  savingAssetsLoading: boolean;
  savingAssetsError: Error | null | unknown;

  totalSavingBalance: number | string;
  savingRate: number | string;
  interestRates: BorrowAssetsRateAndFee[];
}

const initialState: BorrowingCoreState = {
  mintedAmount: 0,
  normalizedDebt: 0,
  liquidationFullDebt: 0,
  outstandingDebt: 0,

  borrowingVaults: [],
  borrowingVaultsLoading: true,
  borrowingVaultsError: null,

  savingAssets: [],
  savingAssetsLoading: true,
  savingAssetsError: null,

  totalSavingBalance: 0,
  savingRate: 0,
  interestRates: [],
};

const borrowingCoreSlice = createSlice({
  name: 'borrowing-core',
  initialState,
  reducers: {
    setBorrowingVaults (state, { payload }: PayloadAction<VaultWithFee[]>) {
      state.mintedAmount = 0;
      state.normalizedDebt = 0;
      state.liquidationFullDebt = 0;
      state.borrowingVaults = payload;
      state.borrowingVaultsLoading = false;
    },

    setBorrowingVaultsError (state, { payload }: PayloadAction<unknown>) {
      state.borrowingVaultsError = payload;
      state.borrowingVaultsLoading = false;
      state.borrowingVaults = [];
    },

    setSavingAssets (state, { payload }: PayloadAction<SavingAssets[]>) {
      state.savingAssets = payload;
      state.savingAssetsLoading = false;
    },

    setSavingAssetsError (state, { payload }: PayloadAction<unknown>) {
      state.savingAssetsError = payload;
      state.savingAssetsLoading = false;
    },

    setTotalSavingBalance (state, { payload }: PayloadAction<number | string>) {
      state.totalSavingBalance = payload;
    },

    setOutstandingDebt (state, { payload }: PayloadAction<number>) {
      state.outstandingDebt = payload;
    },

    setSavingRate (state, { payload }: PayloadAction<number | string>) {
      state.savingRate = payload;
    },

    setInterestRates (state, { payload }: PayloadAction<BorrowAssetsRateAndFee[]>) {
      state.interestRates = payload;
    },
  }
});

export const {
  setBorrowingVaults,
  setBorrowingVaultsError,
  setSavingAssets,
  setSavingAssetsError,
  setTotalSavingBalance,
  setOutstandingDebt,
  setSavingRate,
  setInterestRates,
} = borrowingCoreSlice.actions;
export default borrowingCoreSlice.reducer;
