import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  isLoading: boolean;
  hash: string;
  successMessage: string;
  errorMessage: string;
}

const initialState: TransactionState = {
  isLoading: false,
  hash: '',
  errorMessage: '',
  successMessage: '',
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setHash: (state, { payload }: PayloadAction<string>) => {
      state.hash = payload;
    },

    setSuccessMessage: (state, { payload }: PayloadAction<string>) => {
      state.successMessage = payload;
    },

    setErrorMessage: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    },

    reset: (state) => {
      state.isLoading = false;
      state.hash = '';
      state.errorMessage = '';
      state.successMessage = '';
    },
  }
});

export const {
  setLoading,
  setHash,
  setSuccessMessage,
  setErrorMessage,
  reset,
} = transactionSlice.actions;
export default transactionSlice.reducer;
