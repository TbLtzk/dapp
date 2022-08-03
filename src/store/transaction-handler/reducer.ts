import { ErrorMessage, SuccessMessage } from 'typings/transaction';

import * as types from './types';

interface TransactionState {
  transactionLoading: boolean;
  transactionHash: string | null;
  errorMessage: ErrorMessage | null;
  successMessage: SuccessMessage | null;
}

const initialState = {
  transactionLoading: false,
  transactionHash: null,
  errorMessage: null,
  successMessage: null,
} as TransactionState;

export default function transactionHandler (state = initialState, action: types.TransactionActions) {
  switch (action.type) {
    case 'SET_TRANSACTION_LOADING':
      return {
        ...state,
        transactionLoading: true,
      };
    case 'SET_TRANSACTION_HASH':
      return {
        ...state,
        transactionHash: action.transactionHash,
      };
    case 'SET_TRANSACTION_LOADING_SUCCESS':
      return {
        ...state,
        transactionLoading: false,
        successMessage: action.successMessage,
      };
    case 'SET_TRANSACTION_LOADING_ERROR':
      return {
        ...state,
        transactionLoading: false,
        errorMessage: action.errorMessage,
      };
    case 'SET_TRANSACTION_LOADING_COMPLETE':
      return {
        ...state,
        transactionLoading: false,
      };
    case 'SET_CLEAR_TRANSACTION':
      return { ...initialState };
    default:
      return state;
  }
}
