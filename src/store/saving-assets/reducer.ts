import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BalanceDetails {
  interestRate: number;
  currentBalance: string;
  estimatedInterest: number;
}

interface SavingAssetsState {
  availableToDeposit: string;
  balanceDetails: BalanceDetails;
  allowance: string;
}

const initialState: SavingAssetsState = {
  availableToDeposit: '0',
  balanceDetails: {
    interestRate: 0,
    currentBalance: '0',
    estimatedInterest: 0,
  },
  allowance: '0',
};

const savingAssetsSlice = createSlice({
  name: 'saving-assets',
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
    }
  }
});

export const {
  setBalanceDetails,
  setAllowance,
  setAvailableToDeposit
} = savingAssetsSlice.actions;
export default savingAssetsSlice.reducer;
