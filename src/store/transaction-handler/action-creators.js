import * as actionTypes from './action-types';

export const getBalances = () => ({
  type: actionTypes.GET_BALANCES
});

export const setClearMessages = () => ({
  type: actionTypes.SET_CLEAR_MESSAGES
});

export const setTransactionLoading = () => ({
  type: actionTypes.SET_TRANSACTION_LOADING
});

export const setTransactionLoadingSuccess = (successMessage) => ({
  type: actionTypes.SET_TRANSACTION_LOADING_SUCCESS,
  successMessage
});

export const setTransactionLoadingError = (errorMessage) => ({
  type: actionTypes.SET_TRANSACTION_LOADING_ERROR,
  errorMessage
});
