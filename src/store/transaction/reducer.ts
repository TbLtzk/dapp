import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PendingTransaction {
  id: string;
  title: string;
  hideLoading: boolean;
}

interface TransactionState {
  pendingTransactions: PendingTransaction[];
}

const initialState: TransactionState = {
  pendingTransactions: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setPendingTransactions: (state, { payload }: PayloadAction<PendingTransaction[]>) => {
      state.pendingTransactions = payload;
    },
  }
});

export const { setPendingTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
