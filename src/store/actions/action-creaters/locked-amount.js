import * as actionTypes from '../action-types/locked-amount'

export const setError = (data) => ({
  type: actionTypes.SET_VAL_ERROR,
  error: data
})

export const getQVaultAmount = (address) => ({
  type: actionTypes.GET_QVAULT_AMOUNT,
  address
})

export const setQVaultAmount = (data) => ({
  type: actionTypes.SET_QVAULT_AMOUNT,
  payload: data
})

export const getRootNodeAmount = (address) => ({
  type: actionTypes.GET_ROOTNODE_AMOUNT,
  address
})

export const setRootNodeAmount = (data) => ({
  type: actionTypes.SET_ROOTNODE_AMOUNT,
  payload: data
})

export const getValidatorAmount = (address) => ({
  type: actionTypes.GET_VALIDATOR_AMOUNT,
  address
})

export const setValidatorAmount = (data) => ({
  type: actionTypes.SET_VALIDATOR_AMOUNT,
  payload: data
})

export const setDepositLockedAmount = (data) => ({
  type: actionTypes.SET_LOCKEDAMOUNT_CALL,
  payload: data
})

export const setPurgeTimeLocksAmount = (data) => ({
  type: actionTypes.SET_PURGEAMOUNT_CALL,
  payload: data
})
