import * as actionTypes from './action-types';

export const getVestingBalance = (address) => ({
  type: actionTypes.GET_VESTING_BALANCE,
  address
});

export const setVestingBalance = (data) => ({
  type: actionTypes.SET_VESTING_BALANCE,
  payload: data
});

export const getMinimumVestingTimeLock = (address) => ({
  type: actionTypes.GET_VESTING_MINIMUM_TIME_LOCK,
  address
});

export const setMinimumVestingTimeLock = (data) => ({
  type: actionTypes.SET_VESTING_MINIMUM_TIME_LOCK,
  payload: data
});

export const getVestingTimeLocks = (address) => ({
  type: actionTypes.GET_VESTING_TIME_LOCKS,
  address
});

export const setVestingTimeLocks = (data) => ({
  type: actionTypes.SET_VESTING_TIME_LOCKS,
  payload: data
});

export const setVestingWithdraw = (data) => ({
  type: actionTypes.SET_VESTING_WITHDRAW,
  amountQ: data
});

export const setVestingDeposit = (data) => ({
  type: actionTypes.SET_VESTING_DEPOSIT,
  payload: data
});
