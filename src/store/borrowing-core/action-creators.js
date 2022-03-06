import * as actionTypes from './action-types'

export const setCreateQBTCVault = () => ({
  type: actionTypes.SET_CREATE_QBTC_VAULT
})

export const getTotalCollateralLockedAndOutstandingDebt = () => ({
  type: actionTypes.GET_TOTAL_COLLATERAL_LOCKED_AND_OUTSTANDING_DEBT
})

export const setOutstandingDebt = (data) => ({
  type: actionTypes.SET_OUTSTANDING_DEBT,
  payload: data
})

export const setTotalCollateralLocked = (data) => ({
  type: actionTypes.SET_TOTAL_COLLATERAL_LOCKED,
  payload: data
})

export const getTotalSavingBalance = () => ({
  type: actionTypes.GET_TOTAL_SAVING_BALANCE
})

export const setTotalSavingBalance = (data) => ({
  type: actionTypes.SET_TOTAL_SAVING_BALANCE,
  payload: data
})

export const getSavingAssets = () => ({
  type: actionTypes.GET_SAVING_ASSETS
})

export const setSavingAssets = (data) => ({
  type: actionTypes.SET_SAVING_ASSETS,
  payload: data
})

export const getBorrowingVaults = () => ({
  type: actionTypes.GET_BORROWING_VAULTS
})

export const setBorrowingVaults = (data) => ({
  type: actionTypes.SET_BORROWING_VAULTS,
  payload: data
})

export const getTotalSupply = () => ({
  type: actionTypes.GET_TOTAL_SUPPLY
})

export const setTotalSupply = (data) => ({
  type: actionTypes.SET_TOTAL_SUPPLY,
  payload: data
})

export const getSavingAndInterestRate = (unitType) => ({
  type: actionTypes.GET_SAVING_AND_INTEREST_RATE,
  unitType
})

export const setSavingRate = (data) => ({
  type: actionTypes.SET_SAVING_RATE,
  payload: data
})

export const setInterestRate = (data) => ({
  type: actionTypes.SET_INTEREST_RATE,
  payload: data
})
