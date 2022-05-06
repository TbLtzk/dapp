import * as actionTypes from './action-types';

export const setErrorMessage = (errorMessage) => ({
  type: actionTypes.SET_ERROR_MESSAGE,
  errorMessage
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

export const setTransactionCounter = (number) => ({
  type: actionTypes.SET_TRANSACTION_COUNTER,
  payload: number
});
