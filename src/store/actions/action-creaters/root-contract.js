import * as actionTypes from '../action-types/root-contract'

/* getRootMembersData */
export const getRootMembersData = (contract) => ({
  type: actionTypes.GET_ROOT_MEMBERS_DATA,
  contract
})

export const getRootMembersDataSuccess = (result) => ({
  type: actionTypes.GET_ROOT_MEMBERS_DATA_SUCCESS,
  result
})

export const getRootMembersDataError = (result) => ({
  type: actionTypes.GET_ROOT_MEMBERS_DATA_ERROR,
  result
})

/* stakeToPanel */
export const stakeToPanel = (contract, data, callBack = () => {}) => ({
  type: actionTypes.STAKE_TO_PANEL,
  contract,
  data,
  callBack
})

export const stakeToPanelSuccess = (result) => ({
  type: actionTypes.STAKE_TO_PANEL_SUCCESS,
  result
})

export const stakeToPanelError = (result) => ({
  type: actionTypes.STAKE_TO_PANEL_ERROR,
  result
})

/* announceWithdrawal */
export const announceWithdrawal = (contract, amount, paymentInf, callBack = () => {}) => ({
  type: actionTypes.ANNOUNCE_WITHDRAWAL,
  contract,
  amount,
  paymentInf,
  callBack
})

export const announceWithdrawalSuccess = (result) => ({
  type: actionTypes.ANNOUNCE_WITHDRAWAL_SUCCESS,
  result
})

export const announceWithdrawalError = (result) => ({
  type: actionTypes.ANNOUNCE_WITHDRAWAL_ERROR,
  result
})

/* WITHDRAW */
export const withdraw = (contract, amount, payTo, paymentInf, callBack = () => {}) => ({
  type: actionTypes.WITHDRAW,
  contract,
  amount,
  payTo,
  paymentInf,
  callBack
})

export const withdrawSuccess = (result) => ({
  type: actionTypes.WITHDRAW_SUCCESS,
  result
})

export const withdrawError = (result) => ({
  type: actionTypes.WITHDRAW_ERROR,
  result
})

/* check is user root node */
export const checkIsUserRootNode = (contract, address) => ({
  type: actionTypes.CHECK_IS_USER_ROOT_NODE,
  contract,
  address
})

export const checkIsUserRootNodeSuccess = (result) => ({
  type: actionTypes.CHECK_IS_USER_ROOT_NODE_SUCCESS,
  result
})

export const checkIsUserRootNodeError = (result) => ({
  type: actionTypes.CHECK_IS_USER_ROOT_NODE_ERROR,
  result
})

/* check is user root node */
export const getRootNodeStakes = (contract, address) => ({
  type: actionTypes.GET_ROOT_NODE_STAKES,
  contract,
  address
})

export const getRootNodeStakesSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_STAKES_SUCCESS,
  result
})

export const getRootNodeStakesError = (result) => ({
  type: actionTypes.GET_ROOT_NODE_STAKES_ERROR,
  result
})

/* check is user root node */
export const getWithdrawals = (address) => ({
  type: actionTypes.GET_WITHDRAWALS,
  address
})

export const getWithdrawalsSuccess = (result) => ({
  type: actionTypes.GET_WITHDRAWALS_SUCCESS,
  result
})

export const getWithdrawalsError = (result) => ({
  type: actionTypes.GET_WITHDRAWALS_ERROR,
  result
})

// sdk creaters
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
