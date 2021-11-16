import * as actionTypes from './action-types'

export const getSurplus = () => ({
  type: actionTypes.GET_SURPLUS
})

export const getSurplusSuccess = (result) => ({
  type: actionTypes.GET_SURPLUS_SUCCESS,
  result
})

export const getSurplusError = (result) => ({
  type: actionTypes.GET_SURPLUS_ERROR,
  result
})

export const getDebt = () => ({
  type: actionTypes.GET_DEBT
})

export const getDebtSuccess = (result) => ({
  type: actionTypes.GET_DEBT_SUCCESS,
  result
})

export const getDebtError = (result) => ({
  type: actionTypes.GET_DEBT_ERROR,
  result
})

export const getSystemBalance = () => ({
  type: actionTypes.GET_SYSTEM_BALANCE
})

export const getSystemBalanceSuccess = (result) => ({
  type: actionTypes.GET_SYSTEM_BALANCE_SUCCESS,
  result
})

export const getSystemBalanceError = (result) => ({
  type: actionTypes.GET_SYSTEM_BALANCE_ERROR,
  result
})

export const onPerformNetting = () => ({
  type: actionTypes.ON_PERFORM_NETTING
})
export const onPerformNettingSuccess = (result) => ({
  type: actionTypes.ON_PERFORM_NETTING_SUCCESS,
  result
})
export const onPerformNettingError = (result) => ({
  type: actionTypes.ON_PERFORM_NETTING_ERROR,
  result
})
