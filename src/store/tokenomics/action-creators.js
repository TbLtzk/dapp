import * as actionTypes from './action-types';

export const getDefaultAllocationProxy = (isAllocate) => ({
  type: actionTypes.GET_DEFAULT_ALLOCATION_PROXY,
  isAllocate,
});

export const getDefaultAllocationProxyError = (error) => ({
  type: actionTypes.GET_DEFAULT_ALLOCATION_PROXY_ERROR,
  error: error,
});

export const getDefaultAllocationProxySuccess = (result) => ({
  type: actionTypes.GET_DEFAULT_ALLOCATION_PROXY_SUCCESS,
  result,
});

export const getValidationRewardProxy = (isAllocate) => ({
  type: actionTypes.GET_VALIDATION_REWARD_PROXY,
  isAllocate,
});

export const getValidationRewardProxyProxyError = (error) => ({
  type: actionTypes.GET_VALIDATION_REWARD_PROXY_ERROR,
  error,
});

export const getValidationRewardProxyProxySuccess = (result) => ({
  type: actionTypes.GET_VALIDATION_REWARD_PROXY_SUCCESS,
  result,
});

export const getRootNodeRewardProxy = (isAllocate) => ({
  type: actionTypes.GET_ROOT_NODE_REWARD_PROXY,
  isAllocate,
});

export const getRootNodeRewardProxyError = (error) => ({
  type: actionTypes.GET_ROOT_NODE_REWARD_PROXY_ERROR,
  error,
});

export const getRootNodeRewardProxySuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_REWARD_PROXY_SUCCESS,
  result,
});

export const getQHolderTimeUpdate = (isUpdateTime) => ({
  type: actionTypes.GET_Q_HOLDER_TIME_UPDATE,
  isUpdateTime,
});

export const getQHolderTimeUpdateError = (error) => ({
  type: actionTypes.GET_Q_HOLDER_TIME_UPDATE_ERROR,
  error,
});

export const getQHolderTimeUpdateSuccess = (result) => ({
  type: actionTypes.GET_Q_HOLDER_TIME_UPDATE_SUCCESS,
  result,
});
