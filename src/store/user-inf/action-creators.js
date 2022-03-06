import * as actionTypes from './action-types'

export const setUserAddress = (address) => ({
  type: actionTypes.SET_USER_ADDRESS,
  address
})

export const setUserBalance = (balance) => ({
  type: actionTypes.SET_USER_BALANCE,
  balance
})

export const setNetwork = (network) => ({
  type: actionTypes.SET_NETWORK,
  network
})

export const setLoadType = (loadType) => ({
  type: actionTypes.SET_LOAD_TYPE,
  loadType
})
