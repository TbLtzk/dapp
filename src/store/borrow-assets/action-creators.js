import * as actionTypes from './action-types'

export const getBorrowAllowance = (borrowType) => ({
  type: actionTypes.GET_BORROW_ALLOWANCE,
  borrowType
})

export const setBorrowAllowanceDeposit = (data) => ({
  type: actionTypes.SET_BORROW_ALLOWANCE_DEPOSIT,
  payload: data
})

export const setBorrowAllowanceRepay = (data) => ({
  type: actionTypes.SET_BORROW_ALLOWANCE_REPAY,
  payload: data
})

export const getBorrowCollateralInfo = () => ({
  type: actionTypes.GET_BORROW_COLLATERAL_INFO
})

export const setBorrowCollateralInfo = (data) => ({
  type: actionTypes.SET_BORROW_COLLATERAL_INFO,
  payload: data
})

export const getBorrowVaultInfo = (vaultId) => ({
  type: actionTypes.GET_BORROW_VAULT_INFO,
  vaultId
})

export const setBorrowVaultInfo = (data) => ({
  type: actionTypes.SET_BORROW_VAULT_INFO,
  payload: data
})

export const setBorrowAprove = (borrowType) => ({
  type: actionTypes.SET_BORROW_APPROVE,
  borrowType
})

export const setBorrowWithdraw = (amount, vaultId) => ({
  type: actionTypes.SET_BORROW_WITHDRAW,
  amount,
  vaultId
})

export const setBorrowAsBorrow = (amount, vaultId) => ({
  type: actionTypes.SET_BORROW_AS_BORROW,
  amount,
  vaultId
})

export const setBorrowDeposit = (amount, vaultId) => ({
  type: actionTypes.SET_BORROW_DEPOSIT,
  amount,
  vaultId
})

export const setBorrowRepay = (amount, vaultId) => ({
  type: actionTypes.SET_BORROW_REPAY,
  amount,
  vaultId
})
