import * as actionTypes from '../action-types/q-piggy-bank';

export const setError = (data) => ({
  type: actionTypes.SET_PB_ERROR,
  error: data
});

export const getUserBalance = (address) => ({
  type: actionTypes.GET_PB_USER_BALANCE,
  address
});
export const setUserBalance = (data) => ({
  type: actionTypes.SET_PB_USER_BALANCE,
  payload: data
});

export const getLockedAssets = (address) => ({
  type: actionTypes.GET_PB_LOCKED_ASSETS,
  address
});
export const setLockedAssets = (votingWeight, votingLockingEnd) => ({
  type: actionTypes.SET_PB_LOCKED_ASSETS,
  votingWeight,
  votingLockingEnd,
});

// Action without write to Store
export const setDepositCall = (address, amountQ) => ({
  type: actionTypes.SET_PB_DEPOSIT_CALL,
  address,
  amountQ
});
export const setWithdrawCall = (address, amountQ) => ({
  type: actionTypes.SET_PB_WITHDRAW_CALL,
  address,
  amountQ
});
export const setLockAmount = (address, amountQ) => ({
  type: actionTypes.SET_PB_LOCK_AMOUNT,
  address,
  amountQ,
});
export const setUnlockAmount = (address, amountQ) => ({
  type: actionTypes.SET_PB_UNLOCK_AMOUNT,
  address,
  amountQ
});

export const getDelegationsList = (address) => ({
  type: actionTypes.GET_DELEGATIONS_LIST,
  address
});
export const getDelegationsListSuccess = (result) => ({
  type: actionTypes.GET_DELEGATIONS_LIST_SUCCESS,
  result
});
export const getDelegationsListError = (result) => ({
  type: actionTypes.GET_DELEGATIONS_LIST_ERROR,
  result
});

export const getPBBalance = () => ({
  type: actionTypes.GET_PB_BALANCE,
});
export const getPBBalanceSuccess = (result) => ({
  type: actionTypes.GET_PB_BALANCE_SUCCESS,
  result
});
