import { RootState } from 'store';

export const borrowVaultSelector = (state: RootState) => state.borrowAssets.borrowVault;
export const borrowVaultLoadingSelector = (state: RootState) => state.borrowAssets.borrowVaultLoading;
export const borrowVaultErrorSelector = (state: RootState) => state.borrowAssets.borrowVaultError;

export const allowanceDepositSelector = (state: RootState) => state.borrowAssets.allowanceDeposit;
export const allowanceRepaySelector = (state: RootState) => state.borrowAssets.allowanceRepay;
export const allowanceErrorSelector = (state: RootState) => state.borrowAssets.allowanceError;
