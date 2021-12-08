import * as actionTypes from './action-types'

const initialState = {
  availableAmount: 0,
  reserveBalance: 0
}

export default function systemReserve (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_AVAILABLE_AMOUNT_SUCCESS:
      return {
        ...state,
        availableAmount: action.result
      }
    case actionTypes.GET_AVAILABLE_AMOUNT_ERROR:
      return {
        ...state,
        availableAmount: action.result
      }
    case actionTypes.SET_SYSTEM_RESERVE_BALANCE:
      return {
        ...state,
        reserveBalance: action.payload
      }
    default:
      return state
  }
}
