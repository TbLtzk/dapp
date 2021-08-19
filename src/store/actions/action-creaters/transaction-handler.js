import * as actionTypes from '../action-types/transaction-handler'

export const setTransactionLoading = () => ({
  type: actionTypes.SET_TRANSACTION_LOADING
})

export const setTransactionLoadingSuccess = (successMessage) => ({
  type: actionTypes.SET_TRANSACTION_LOADING_SUCCESS,
  successMessage
})

export const setTransactionLoadingError = (errorMessage) => ({
  type: actionTypes.SET_TRANSACTION_LOADING_ERROR,
  errorMessage
})

export const setTransactionCounter = (number) => ({
  type: actionTypes.SET_TRANSACTION_COUNTER,
  payload: number
})
