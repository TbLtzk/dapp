import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BorrowingVault, InterestRate } from 'typings/defi';

interface BorrowingState {
  collateralBalance: string;
  borrowingFee: number;

  interestRates: InterestRate[];
  interestRatesLoading: boolean;

  borrowingVaults: BorrowingVault[];
  borrowingVaultsError: Error | null | unknown;
  borrowingVaultsLoading: boolean;
}

const initialState: BorrowingState = {
  collateralBalance: '0',
  borrowingFee: 0,

  interestRates: [],
  interestRatesLoading: true,

  borrowingVaults: [],
  borrowingVaultsLoading: true,
  borrowingVaultsError: null,
};

const borrowingCoreSlice = createSlice({
  name: 'borrowing',
  initialState,
  reducers: {
    setBorrowingVaults (state, { payload }: PayloadAction<BorrowingVault[]>) {
      state.borrowingVaults = payload;
      state.borrowingVaultsLoading = false;
    },

    setBorrowingVaultsError (state, { payload }: PayloadAction<unknown>) {
      state.borrowingVaultsError = payload;
      state.borrowingVaultsLoading = false;
      state.borrowingVaults = [];
    },

    setCollateralBalance (state, { payload }: PayloadAction<string>) {
      state.collateralBalance = payload;
    },

    setBorrowingFee (state, { payload }: PayloadAction<number>) {
      state.borrowingFee = payload;
    },

    setInterestRates (state, { payload }: PayloadAction<InterestRate[]>) {
      state.interestRates = payload;
      state.interestRatesLoading = false;
    },
  }
});

export const {
  setBorrowingVaults,
  setBorrowingVaultsError,
  setCollateralBalance,
  setBorrowingFee,
  setInterestRates,
} = borrowingCoreSlice.actions;
export default borrowingCoreSlice.reducer;
