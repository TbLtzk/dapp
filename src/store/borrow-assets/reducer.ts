import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VaultData } from 'typings/defi';

interface BorrowAssetsState {
  borrowVault: VaultData;
  borrowVaultLoading: boolean;
  borrowVaultError: unknown;

  allowanceRepay: number | string;
  allowanceDeposit: number | string;
  allowanceError: unknown;
}

const initialState: BorrowAssetsState = {
  borrowVault: {} as VaultData,
  borrowVaultLoading: true,
  borrowVaultError: null,

  allowanceRepay: 0,
  allowanceDeposit: 0,
  allowanceError: null,
};

const borrowAssetsSlice = createSlice({
  name: 'borrow-assets',
  initialState,
  reducers: {
    setBorrowVault (state, { payload }: PayloadAction<VaultData>) {
      state.borrowVault = payload;
      state.borrowVaultError = null;
      state.borrowVaultLoading = false;
    },

    setBorrowVaultError (state, { payload }: PayloadAction<unknown>) {
      state.borrowVault = {} as VaultData;
      state.borrowVaultError = payload;
      state.borrowVaultLoading = false;
    },

    setBorrowAllowanceRepay (state, { payload }: PayloadAction<number | string>) {
      state.allowanceRepay = payload;
    },

    setBorrowAllowanceDeposit (state, { payload }: PayloadAction<number | string>) {
      state.allowanceDeposit = payload;
    },

    setBorrowAllowanceError (state, { payload }: PayloadAction<unknown>) {
      state.allowanceError = payload;
    }
  }
});

export const {
  setBorrowVault,
  setBorrowVaultError,
  setBorrowAllowanceRepay,
  setBorrowAllowanceDeposit,
  setBorrowAllowanceError,
} = borrowAssetsSlice.actions;
export default borrowAssetsSlice.reducer;
