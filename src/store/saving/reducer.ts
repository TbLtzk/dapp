import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavingAsset } from 'typings/defi';

interface BalanceDetails {
  interestRate: number;
  currentBalance: string;
  estimatedInterest: number;
}

interface SavingState {
  availableToDeposit: string;
  balanceDetails: BalanceDetails;
  allowance: string;
  totalSavingBalance: number | string;
  savingRate: number | string;

  savingAssets: SavingAsset[];
  savingAssetsLoading: boolean;
  savingAssetsError: Error | null | unknown;
}

const initialState: SavingState = {
  availableToDeposit: '0',
  totalSavingBalance: 0,
  savingRate: 0,
  allowance: '0',
  balanceDetails: {
    interestRate: 0,
    currentBalance: '0',
    estimatedInterest: 0,
  },

  savingAssets: [],
  savingAssetsLoading: true,
  savingAssetsError: null,
};

const savingSlice = createSlice({
  name: 'saving',
  initialState,
  reducers: {
    setBalanceDetails (state, { payload }: PayloadAction<BalanceDetails>) {
      state.balanceDetails = payload;
    },

    setAllowance (state, { payload }: PayloadAction<string>) {
      state.allowance = payload;
    },

    setAvailableToDeposit (state, { payload }: PayloadAction<string>) {
      state.availableToDeposit = payload;
    },

    setSavingAssets (state, { payload }: PayloadAction<SavingAsset[]>) {
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

    setSavingRate (state, { payload }: PayloadAction<number | string>) {
      state.savingRate = payload;
    },
  }
});

export const {
  setBalanceDetails,
  setAllowance,
  setAvailableToDeposit,
  setSavingAssets,
  setSavingAssetsError,
  setTotalSavingBalance,
  setSavingRate,
} = savingSlice.actions;
export default savingSlice.reducer;
