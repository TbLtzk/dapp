import * as actionTypes from './action-types';

export const getAccountBalance = (address) => ({
  type: actionTypes.GET_ACCOUNT_BALANCE,
  address,
});

export const setAccountBalance = (data) => ({
  type: actionTypes.SET_ACCOUNT_BALANCE,
  payload: data,
});

export const getUserBalance = (address) => ({
  type: actionTypes.GET_QV_USER_BALANCE,
  address,
});

export const setUserBalance = (data) => ({
  type: actionTypes.SET_QV_USER_BALANCE,
  payload: data,
});

export const getLockedAssets = (address) => ({
  type: actionTypes.GET_QV_LOCKED_ASSETS,
  address,
});
export const setLockedAssets = (votingWeight, votingLockingEnd) => ({
  type: actionTypes.SET_QV_LOCKED_ASSETS,
  votingWeight,
  votingLockingEnd,
});

export const setDepositCall = (address, amountQ, label) => ({
  type: actionTypes.SET_QV_DEPOSIT_CALL,
  address,
  amountQ,
  label,
});

export const setSendCall = (address, amount, label) => ({
  type: actionTypes.SET_SEND_CALL,
  address,
  amount,
  label,
});

export const setWithdrawCall = (address, amountQ, label) => ({
  type: actionTypes.SET_QV_WITHDRAW_CALL,
  address,
  amountQ,
  label,
});
export const setLockAmount = (address, amountQ, label) => ({
  type: actionTypes.SET_QV_LOCK_AMOUNT,
  address,
  amountQ,
  label,
});
export const setUnlockAmount = (address, amountQ, label) => ({
  type: actionTypes.SET_QV_UNLOCK_AMOUNT,
  address,
  amountQ,
  label
});

export const setDelegateStake = (address, delegateAddresses, stakes, label) => ({
  type: actionTypes.SET_DELEGATE_STAKE,
  address,
  delegateAddresses,
  stakes,
  label
});

export const getDelegationsList = () => ({
  type: actionTypes.GET_DELEGATIONS_LIST,
});

export const getDelegationInfo = (address) => ({
  type: actionTypes.GET_DELEGATION_INFO,
  address,
});

export const setDelegationInfo = (result) => ({
  type: actionTypes.SET_DELEGATION_INFO,
  result,
});

export const getDelegationsListSuccess = (result) => ({
  type: actionTypes.GET_DELEGATIONS_LIST_SUCCESS,
  result,
});
export const getDelegationsListError = (result) => ({
  type: actionTypes.GET_DELEGATIONS_LIST_ERROR,
  result,
});

export const getQVBalance = () => ({
  type: actionTypes.GET_QV_BALANCE,
});
export const getQVBalanceSuccess = (result) => ({
  type: actionTypes.GET_QV_BALANCE_SUCCESS,
  result,
});

export const onClaimStakeDelegatorReward = (label) => ({
  type: actionTypes.ON_CLAIM_STAKE_DELEGATOR_REWARD,
  label
});

export const setAnnounceNewVotingAgent = (address, label) => ({
  type: actionTypes.SET_ANNOUNCE_VOTING_AGENT,
  address,
  label
});

export const setNewVotingAgent = (label) => ({
  type: actionTypes.SET_NEW_VOTING_AGENT,
  label
});

export const getOutstandingDelegationRewards = () => ({
  type: actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS,
});

export const getOutstandingDelegationRewardsSuccess = (result) => ({
  type: actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS_SUCCESS,
  result,
});
export const getOutstandingDelegationRewardsError = (result) => ({
  type: actionTypes.GET_OUTSTANDING_DELEGATION_REWARDS_ERROR,
  result,
});

export const getMinimumQVaultTimeLock = (address) => ({
  type: actionTypes.GET_QVAULT_MINIMUM_TIME_LOCK,
  address,
});

export const setMinimumQVaultTimeLock = (data) => ({
  type: actionTypes.SET_QVAULT_MINIMUM_TIME_LOCK,
  payload: data,
});

export const getQVaultTimeLocks = (address) => ({
  type: actionTypes.GET_QVAULT_TIME_LOCKS,
  address,
});

export const setQVaultTimeLocks = (data) => ({
  type: actionTypes.SET_QVAULT_TIME_LOCKS,
  payload: data,
});
