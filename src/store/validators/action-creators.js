import * as actionTypes from './action-types';

// Balance
export const getValidatorTotalStake = () => ({
  type: actionTypes.GET_VALIDATOR_TOTAL_STAKE,
});

export const getValidatorTotalStakeSuccess = (validatorTotalStake) => ({
  type: actionTypes.GET_VALIDATOR_TOTAL_STAKE_SUCCESS,
  validatorTotalStake,
});

export const getValidatorDelegatedStake = () => ({
  type: actionTypes.GET_VALIDATOR_DELEGATED_STAKE,
});

export const getValidatorDelegatedStakeSuccess = (validatorDelegatedStake) => ({
  type: actionTypes.GET_VALIDATOR_DELEGATED_STAKE_SUCCESS,
  validatorDelegatedStake,
});

export const getValidatorAccountableTotalStake = () => ({
  type: actionTypes.GET_VALIDATOR_ACCOUNTABLE_TOTAL_STAKE
});

export const getValidatorAccountableTotalStakeSuccess = (validatorAcountableTotalStake) => ({
  type: actionTypes.GET_VALIDATOR_ACCOUNTABLE_TOTAL_STAKE_SUCCESS,
  validatorAcountableTotalStake,
});

export const getValidatorAccountableSelfStake = (address) => ({
  type: actionTypes.GET_VALIDATOR_ACCOUNTABLE_SELF_STAKE,
  address
});

export const getValidatorAccountableSelfStakeSuccess = (validatorAccountableSelfStake) => ({
  type: actionTypes.GET_VALIDATOR_ACCOUNTABLE_SELF_STAKE_SUCCESS,
  validatorAccountableSelfStake,
});

// Table
export const getValidatorMembers = (tableType, indexerUrl) => ({
  type: actionTypes.GET_VALIDATORS_MEMBERS,
  tableType,
  indexerUrl
});

export const setValidatorMembers = (tableType, data) => ({
  type: actionTypes.SET_VALIDATORS_MEMBERS,
  tableType,
  payload: data,
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

export const getValidatorWithdrawalInfo = () => ({
  type: actionTypes.GET_VALIDATORS_WITHDRAWAL_INFO,
});

export const setValidatorWithdrawalInfo = (withdrawalInfo) => ({
  type: actionTypes.GET_VALIDATORS_WITHDRAWAL_INFO_SUCCESS,
  withdrawalInfo,
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
