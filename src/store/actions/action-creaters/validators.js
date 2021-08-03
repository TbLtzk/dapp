import * as actionTypes from '../action-types/validators'

export const setError = (data) => ({
  type: actionTypes.SET_VAL_ERROR,
  error: data
})

export const getDelegatorsShare = (address) => ({
  type: actionTypes.GET_VAL_DELEGATORS_SHARE,
  address
})

export const setDelegatorsShare = (data) => ({
  type: actionTypes.SET_VAL_DELEGATORS_SHARE,
  payload: data
})

export const getInterestRate = (address) => ({
  type: actionTypes.GET_VAL_INTEREST_RATE,
  address
})

export const setInterestRate = (data) => ({
  type: actionTypes.SET_VAL_INTEREST_RATE,
  payload: data
})

export const getTotalStake = (address) => ({
  type: actionTypes.GET_VAL_TOTAL_STAKE,
  address
})
export const setTotalStake = (data) => ({
  type: actionTypes.SET_VAL_TOTAL_STAKE,
  payload: data
})

export const getOwnStake = (address) => ({
  type: actionTypes.GET_VAL_OWN_STAKE,
  address
})

export const setOwnStake = (data) => ({
  type: actionTypes.SET_VAL_OWN_STAKE,
  payload: data
})

export const getSelfStake = (address) => ({
  type: actionTypes.GET_VAL_SELF_STAKE,
  address
})

export const setSelfStake = (data) => ({
  type: actionTypes.SET_VAL_SELF_STAKE,
  payload: data
})

export const getDelegatedStake = (address) => ({
  type: actionTypes.GET_VAL_DELEGATED_STAKE,
  address
})
export const setDelegatedStake = (data) => ({
  type: actionTypes.SET_VAL_DELEGATED_STAKE,
  payload: data
})

export const getAccTotalStake = (address) => ({
  type: actionTypes.GET_VAL_ACC_TOTAL_STAKE,
  address
})

export const setAccTotalStake = (data) => ({
  type: actionTypes.SET_VAL_ACC_TOTAL_STAKE,
  payload: data
})

export const getValidatorMembers = () => ({
  type: actionTypes.GET_VALIDATORS_MEMBERS
})
export const getValidatorMembersSuccess = (data) => ({
  type: actionTypes.GET_VALIDATORS_MEMBERS_SUCCESS,
  data: data
})
export const getValidatorMembersError = (error) => ({
  type: actionTypes.GET_VALIDATORS_MEMBERS_ERROR,
  error: error
})

// Action without write to Store
export const setDelegatorsShareSend = (address, uintPercent) => ({
  type: actionTypes.SET_VAL_DELEGATORS_SHARE_SEND,
  address,
  uintPercent
})

export const setInterestRateSend = (address, uintPercent) => ({
  type: actionTypes.SET_VAL_INTEREST_RATE_SEND,
  address,
  uintPercent
})

export const getIsUserValidator = (address) => ({
  type: actionTypes.IS_USER_VALIDATOR,
  address
})
export const isUserValidatorSuccess = (result) => ({
  type: actionTypes.IS_USER_VALIDATOR_SUCCESS,
  result
})
