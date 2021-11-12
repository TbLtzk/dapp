import * as actionTypes from './action-types'

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
