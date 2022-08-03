
import { ErrorMessage, SuccessMessage } from 'typings/transaction';

import * as types from './types';

export const getUserBalances = (): types.GetUserBalances => ({
  type: 'GET_USER_BALANCES',
});

export const setClearTransaction = (): types.SetClearTransaction => ({
  type: 'SET_CLEAR_TRANSACTION',
});

export const setTransactionHash = (transactionHash: string): types.SetTransactionHash => ({
  type: 'SET_TRANSACTION_HASH',
  transactionHash,
});

export const setTransactionLoading = (): types.SetTransactionLoading => ({
  type: 'SET_TRANSACTION_LOADING',
});

export const setTransactionLoadingSuccess = (successMessage: SuccessMessage): types.SetTransactionLoadingSuccess => ({
  type: 'SET_TRANSACTION_LOADING_SUCCESS',
  successMessage,
});

export const setTransactionLoadingError = (errorMessage: ErrorMessage): types.SetTransactionLoadingError => ({
  type: 'SET_TRANSACTION_LOADING_ERROR',
  errorMessage,
});

export const setTransactionLoadingComplete = (): types.SetTransactionLoadingComplete => ({
  type: 'SET_TRANSACTION_LOADING_COMPLETE',
});
