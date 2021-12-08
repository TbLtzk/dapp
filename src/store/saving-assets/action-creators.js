import * as actionTypes from './action-types'

export const getSavingAviableToDeposit = () => ({
  type: actionTypes.GET_SAVING_AVIABLE_TO_DEPOSIT
})

export const setSavingAviableToDeposit = (data) => ({
  type: actionTypes.SET_SAVING_AVIABLE_TO_DEPOSIT,
  payload: data
})

export const getSavingBalanceDetails = () => ({
  type: actionTypes.GET_SAVING_BALANCE_DETAILS
})

export const setSavingBalanceDetails = (data) => ({
  type: actionTypes.SET_SAVING_BALANCE_DETAILS,
  payload: data
})

export const getSavingAllowance = () => ({
  type: actionTypes.GET_SAVING_ALLOWANCE
})

export const setSavingAllowance = (data) => ({
  type: actionTypes.SET_SAVING_ALLOWANCE,
  payload: data
})

export const setSavingAprove = () => ({
  type: actionTypes.SET_SAVING_APROVE
})

export const setSavingWithdraw = (amount) => ({
  type: actionTypes.SET_SAVING_WITHDRAW,
  amount
})

export const setSavingDeposit = (amount) => ({
  type: actionTypes.SET_SAVING_DEPOSIT,
  amount
})
