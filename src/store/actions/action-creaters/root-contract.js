import * as actionTypes from '../action-types/root-contract'

export const setRootStakeToPanel = (data) => ({
  type: actionTypes.SET_ROOT_STAKE_TO_PANEL,
  data
})

export const setRootAnnounceWithdrawal = (amount, paymentInf) => ({
  type: actionTypes.SET_ROOT_ANNOUNCE_WITHDRAWAL,
  amount,
  paymentInf
})

export const setRootWithdraw = (amount, payTo, paymentInf) => ({
  type: actionTypes.SET_ROOT_WITHDRAW,
  amount,
  payTo,
  paymentInf
})

export const getRootMembersData = () => ({
  type: actionTypes.GET_ROOT_MEMBERS_DATA
})

export const setRootMembersData = (result) => ({
  type: actionTypes.SET_ROOT_MEMBERS_DATA,
  result
})

export const getCheckIsUserRootNode = (address) => ({
  type: actionTypes.GET_CHECK_IS_USER_ROOT_NODE,
  address
})

export const setCheckIsUserRootNode = (result) => ({
  type: actionTypes.SET_CHECK_IS_USER_ROOT_NODE,
  result
})

export const getRootNodeStakes = (address) => ({
  type: actionTypes.GET_ROOT_NODE_STAKES,
  address
})

export const setRootNodeStakes = (result) => ({
  type: actionTypes.SET_ROOT_NODE_STAKES,
  result
})

export const getRootWithdrawals = (address) => ({
  type: actionTypes.GET_ROOT_WITHDRAWALS,
  address
})

export const setRootWithdrawals = (result) => ({
  type: actionTypes.SET_ROOT_WITHDRAWALS,
  result
})

export const getMinimumRootTimeLock = (address) => ({
  type: actionTypes.GET_ROOT_MINIMUM_TIME_LOCK,
  address
})

export const setMinimumRootTimeLock = (data) => ({
  type: actionTypes.SET_ROOT_MINIMUM_TIME_LOCK,
  payload: data
})

export const getRootTimeLocks = (address) => ({
  type: actionTypes.GET_ROOT_TIME_LOCKS,
  address
})

export const setRootTimeLocks = (data) => ({
  type: actionTypes.SET_ROOT_TIME_LOCKS,
  payload: data
})
