import * as actionTypes from './action-types';

export const setValidatorsWithdraw = (address, amountQ, label) => ({
  type: actionTypes.SET_VALIDATORS_WITHDRAW,
  address,
  amountQ,
  label
});

export const setValidatorsCommitStake = (address, amountQ, label) => ({
  type: actionTypes.SET_VALIDATORS_COMMIT_STAKE,
  address,
  amountQ,
  label
});

export const setValidatorsAnnounceWithdrawal = (address, amountQ, label) => ({
  type: actionTypes.SET_VALIDATORS_ANNOUNCE_WITHDRAWAL,
  address,
  amountQ,
  label
});

export const getDelegatorsShare = (address) => ({
  type: actionTypes.GET_VALIDATORS_DELEGATORS_SHARE,
  address,
});

export const setDelegatorsShare = (data) => ({
  type: actionTypes.SET_VALIDATORS_DELEGATORS_SHARE,
  payload: data,
});

export const getInterestRate = (address) => ({
  type: actionTypes.GET_VALIDATORS_INTEREST_RATE,
  address,
});

export const setInterestRate = (data) => ({
  type: actionTypes.SET_VALIDATORS_INTEREST_RATE,
  payload: data,
});

export const getTotalStake = (address) => ({
  type: actionTypes.GET_VALIDATORS_TOTAL_STAKE,
  address,
});
export const setTotalStake = (data) => ({
  type: actionTypes.SET_VALIDATORS_TOTAL_STAKE,
  payload: data,
});

export const getOwnStake = (address) => ({
  type: actionTypes.GET_VALIDATORS_OWN_STAKE,
  address,
});

export const setOwnStake = (data) => ({
  type: actionTypes.SET_VALIDATORS_OWN_STAKE,
  payload: data,
});

export const getSelfStake = (address) => ({
  type: actionTypes.GET_VALIDATORS_SELF_STAKE,
  address,
});

export const setSelfStake = (data) => ({
  type: actionTypes.SET_VALIDATORS_SELF_STAKE,
  payload: data,
});

export const getDelegatedStake = (address) => ({
  type: actionTypes.GET_VALIDATORS_DELEGATED_STAKE,
  address,
});
export const setDelegatedStake = (data) => ({
  type: actionTypes.SET_VALIDATORS_DELEGATED_STAKE,
  payload: data,
});

export const getAccountableTotalStake = (address) => ({
  type: actionTypes.GET_VALIDATORS_ACCOUNTABLE_TOTAL_STAKE,
  address,
});

export const setAccountableTotalStake = (data) => ({
  type: actionTypes.SET_VALIDATORS_ACCOUNTABLE_TOTAL_STAKE,
  payload: data,
});

export const getValidatorMembers = (tableType) => ({
  type: actionTypes.GET_VALIDATORS_MEMBERS,
  tableType,
});

export const setValidatorMembers = (tableType, data) => ({
  type: actionTypes.SET_VALIDATORS_MEMBERS,
  tableType,
  payload: data,
});

// Action without write to Store
export const setDelegatorsShareSend = (address, uintPercent, label) => ({
  type: actionTypes.SET_VALIDATORS_DELEGATORS_SHARE_SEND,
  address,
  uintPercent,
  label
});

export const setInterestRateSend = (address, uintPercent, label) => ({
  type: actionTypes.SET_VALIDATORS_INTEREST_RATE_SEND,
  address,
  uintPercent,
  label
});

export const getIsUserValidator = (address) => ({
  type: actionTypes.GET_IS_USER_VALIDATOR,
  address,
});
export const setIsUserValidator = (result) => ({
  type: actionTypes.SET_IS_USER_VALIDATOR,
  result,
});

export const getMinimumValidatorsTimeLock = (address) => ({
  type: actionTypes.GET_VALIDATORS_MINIMUM_TIME_LOCK,
  address,
});

export const setMinimumValidatorsTimeLock = (data) => ({
  type: actionTypes.SET_VALIDATORS_MINIMUM_TIME_LOCK,
  payload: data,
});

export const getValidatorsTimeLocks = (address) => ({
  type: actionTypes.GET_VALIDATORS_TIME_LOCKS,
  address,
});

export const setValidatorsTimeLocks = (data) => ({
  type: actionTypes.SET_VALIDATORS_TIME_LOCKS,
  payload: data,
});

export const setValidatorsEnterShortList = (address) => ({
  type: actionTypes.SET_VALIDATORS_ENTER_SHORT_LIST,
  address,
});

export const getValidatorWithdrawalInfo = (address) => ({
  type: actionTypes.GET_VALIDATORS_WITHDRAWAL_INFO,
  address,
});

export const setValidatorWithdrawalInfo = (data) => ({
  type: actionTypes.SET_VALIDATORS_WITHDRAWAL_INFO,
  payload: data,
});

export const getCompoundRateKeeperExists = () => ({
  type: actionTypes.GET_COMPOUND_RATE_KEEPER_EXISTS,
});

export const setCompoundRateKeeperExists = (data) => ({
  type: actionTypes.SET_COMPOUND_RATE_KEEPER_EXISTS,
  payload: data,
});

export const setInactiveValidators = (inactiveValidators) => ({
  type: actionTypes.SET_INACTIVE_VALIDATORS,
  payload: inactiveValidators,
});
