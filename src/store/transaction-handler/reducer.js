import * as actionTypes from './action-types'

const initialState = {
  transactionLoading: false,
  errorMessage: null,
  transactionCounter: 0,
  successMessage: null
}

export default function transactionHandler (state = initialState, action) {
  let newTrCounter

  switch (action.type) {
    case actionTypes.SET_TRANSACTION_LOADING:
      return {
        ...state,
        transactionLoading: !state.transactionLoading
      }
    case actionTypes.SET_TRANSACTION_LOADING_SUCCESS:
      return {
        ...state,
        transactionLoading: false,
        successMessage: action.successMessage
      }
    case actionTypes.SET_TRANSACTION_LOADING_ERROR:
      return {
        ...state,
        transactionLoading: false,
        errorMessage: action.errorMessage
      }
    case actionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        transactionLoading: false,
        errorMessage: action.errorMessage
      }
    case actionTypes.SET_TRANSACTION_COUNTER:
      newTrCounter = state.transactionCounter + action.payload
      newTrCounter = newTrCounter < 0 ? 0 : newTrCounter
      return {
        ...state,
        transactionCounter: newTrCounter
      }
    default:
      return state
  }
}
