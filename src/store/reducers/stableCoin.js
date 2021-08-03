import * as actionTypes from '../actions/action-types/stable-coin'

const initialState = {
  balance: 0,
  symbol: null
}

export default function stableCoin (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALLOWANCE_SUCCESS:
      return {
        ...state,
        balance: action.result
      }
    case actionTypes.GET_SYMBOL_SUCCESS:
      return {
        ...state,
        symbol: action.result
      }
    default:
      return state
  }
}
