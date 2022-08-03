import { RootState } from 'store';

export const transactionLoadingSelector = (state: RootState) => state.transactionHandler.transactionLoading;
export const transactionHashSelector = (state: RootState) => state.transactionHandler.transactionHash;
export const successMessageSelector = (state: RootState) => state.transactionHandler.successMessage;
export const errorMessageSelector = (state: RootState) => state.transactionHandler.errorMessage;
