import * as actionTypes from '../action-types/q-vault'

export const setError = (data) => ({
  type: actionTypes.SET_QV_ERROR,
  error: data
})

export const getAccountBalance = (address) => ({
  type: actionTypes.GET_ACCOUNT_BALANCE,
  address
})

export const setAccountBalance = (data) => ({
  type: actionTypes.SET_ACCOUNT_BALANCE,
  payload: data
})

export const getUserBalance = (address) => ({
  type: actionTypes.GET_QV_USER_BALANCE,
  address
})

export const setUserBalance = (data) => ({
  type: actionTypes.SET_QV_USER_BALANCE,
  payload: data
})

export const getLockedAssets = (address) => ({
  type: actionTypes.GET_QV_LOCKED_ASSETS,
  address
})
export const setLockedAssets = (votingWeight, votingLockingEnd) => ({
  type: actionTypes.SET_QV_LOCKED_ASSETS,
  votingWeight,
  votingLockingEnd
})

// loading compound rate
export const getUpdateCompoundRate = (address) => ({
  type: actionTypes.GET_UPDATE_COMPOUND_RATE,
  address
})

export const setUpdateCompoundRate = (data) => ({
  type: actionTypes.SET_UPDATE_COMPOUND_RATE,
  payload: data
})

// Action without write to Store
export const setDepositCall = (address, amountQ) => ({
  type: actionTypes.SET_QV_DEPOSIT_CALL,
  address,
  amountQ
})
export const setWithdrawCall = (address, amountQ) => ({
  type: actionTypes.SET_QV_WITHDRAW_CALL,
  address,
  amountQ
})
export const setLockAmount = (address, amountQ) => ({
  type: actionTypes.SET_QV_LOCK_AMOUNT,
  address,
  amountQ
})
export const setUnlockAmount = (address, amountQ) => ({
  type: actionTypes.SET_QV_UNLOCK_AMOUNT,
  address,
  amountQ
})

export const setDelegateStake = (address, delegateAddresses, stakes) => ({
  type: actionTypes.SET_DELEGATE_STAKE,
  address,
  delegateAddresses,
  stakes
})

export const getDelegationsList = () => ({
  type: actionTypes.GET_DELEGATIONS_LIST
})
export const getDelegationsListSuccess = (result) => ({
  type: actionTypes.GET_DELEGATIONS_LIST_SUCCESS,
  result
})
export const getDelegationsListError = (result) => ({
  type: actionTypes.GET_DELEGATIONS_LIST_ERROR,
  result
})

export const getQVBalance = () => ({
  type: actionTypes.GET_QV_BALANCE
})
export const getQVBalanceSuccess = (result) => ({
  type: actionTypes.GET_QV_BALANCE_SUCCESS,
  result
})

export const onClaimStakeDelegatorReward = () => ({
  type: actionTypes.ON_CLAIM_STAKE_DELEGATOR_REWARD
})

export const getOutstandingDelegationRewards = () => ({
  type: actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS
})

export const getOutstandingDelegationRewardsSuccess = (result) => ({
  type: actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS_SUCCESS,
  result
})
export const getOutstandingDelegationRewardsError = (result) => ({
  type: actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS_ERROR,
  result
})

// sdk creaters
export const getMinimumQVaultTimeLock = (address) => ({
  type: actionTypes.GET_QVAULT_MINIMUM_TIME_LOCK,
  address
})

export const setMinimumQVaultTimeLock = (data) => ({
  type: actionTypes.SET_QVAULT_MINIMUM_TIME_LOCK,
  payload: data
})

export const getQVaultTimeLocks = (address) => ({
  type: actionTypes.GET_QVAULT_TIME_LOCKS,
  address
})

export const setQVaultTimeLocks = (data) => ({
  type: actionTypes.SET_QVAULT_TIME_LOCKS,
  payload: data
})
