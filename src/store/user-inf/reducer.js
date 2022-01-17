import * as actionTypes from './action-types'

const initialState = {
  userAddress: null,
  balance: null,
  network: null
}

export default function userAuth (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.address
      }
    case actionTypes.SET_NETWORK:
      return {
        ...state,
        network: action.network
      }
    case actionTypes.SET_USER_BALANCE:
      return {
        ...state,
        balance: action.balance
      }
    default:
      return state
  }
}
