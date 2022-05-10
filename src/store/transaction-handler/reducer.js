import * as actionTypes from './action-types';

const initialState = {
  transactionLoading: false,
  errorMessage: null,
  successMessage: null
};

export default function transactionHandler (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TRANSACTION_LOADING:
      return {
        ...state,
        transactionLoading: true
      };
    case actionTypes.SET_TRANSACTION_LOADING_SUCCESS:
      return {
        ...state,
        transactionLoading: false,
        successMessage: action.successMessage
      };
    case actionTypes.SET_TRANSACTION_LOADING_ERROR:
      return {
        ...state,
        transactionLoading: false,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
}
