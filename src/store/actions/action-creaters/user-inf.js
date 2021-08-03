import * as actionTypes from '../action-types/user-inf'

/* set user address from metamask */
export const setUserAddress = (address) => ({
  type: actionTypes.SET_USER_ADDRESS,
  address
})

/* set user balance from metamask */
export const setUserBalance = (balance) => ({
  type: actionTypes.SET_USER_BALANCE,
  balance
})
