import * as actionTypes from '../actions/action-types/borrowing-core'

const initialState = {
  shouldAddCoins: !localStorage.getItem('shouldAddCoins') || Boolean(JSON.parse(localStorage.getItem('shouldAddCoins')))
}

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SHOULD_ADD_COINS:
      localStorage.setItem('shouldAddCoins', false)
      return {
        ...state,
        shouldAddCoins: false
      }
    default:
      return state
  }
}
