import * as actionTypes from './action-types'

export const getAllowance = (userAddress, contractAddress) => ({
  type: actionTypes.GET_ALLOWANCE,
  userAddress,
  contractAddress
})

export const getAllowanceSuccess = (result) => ({
  type: actionTypes.GET_ALLOWANCE_SUCCESS,
  result
})

export const getSymbol = () => ({
  type: actionTypes.GET_SYMBOL
})

export const getSymbolSuccess = (result) => ({
  type: actionTypes.GET_SYMBOL_SUCCESS,
  result
})
