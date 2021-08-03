import * as actionTypes from '../actions/action-types/system-reserve'

const initialState = {
  availableAmount: 0
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
    default:
      return state
  }
}
