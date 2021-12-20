import * as actionTypes from './action-types'

const initialState = {
  savingAviableToDeposit: null,
  savingBalanceDetails: {},
  savingAllowance: null
}

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SAVING_BALANCE_DETAILS:
      return {
        ...state,
        savingBalanceDetails: action.payload
      }
    case actionTypes.SET_SAVING_ALLOWANCE:
      return {
        ...state,
        savingAllowance: action.payload
      }
    case actionTypes.SET_SAVING_AVIABLE_TO_DEPOSIT:
      return {
        ...state,
        savingAviableToDeposit: action.payload
      }
    default:
      return state
  }
}
