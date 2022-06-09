import * as actionTypes from './action-types';

const initialState = {
  defaultAllocationProxy: 0,
  defaultAllocationProxyError: null,
  defaultAllocationProxyLoading: false,

  validationRewardProxy: 0,
  validationRewardProxyError: null,
  validationRewardProxyLoading: false,

  rootNodeRewardProxy: 0,
  rootNodeRewardProxyError: null,
  rootNodeRewardProxyLoading: false,

  qHolderTimeUpdate: 0,
  qHolderTimeUpdateError: null,
  qHolderTimeUpdateLoading: false,
};

export default function index(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_DEFAULT_ALLOCATION_PROXY:
      return {
        ...state,
        defaultAllocationProxyLoading: action.isAllocate,
      };
    case actionTypes.GET_DEFAULT_ALLOCATION_PROXY_ERROR:
      return {
        ...state,
        defaultAllocationProxyError: action.error,
        defaultAllocationProxyLoading: false,
      };
    case actionTypes.GET_DEFAULT_ALLOCATION_PROXY_SUCCESS:
      return {
        ...state,
        defaultAllocationProxy: action.result,
        defaultAllocationProxyLoading: false,
      };

    case actionTypes.GET_VALIDATION_REWARD_PROXY:
      return {
        ...state,
        validationRewardProxyLoading: action.isAllocate,
      };
    case actionTypes.GET_VALIDATION_REWARD_PROXY_ERROR:
      return {
        ...state,
        validationRewardProxyError: action.error,
      };
    case actionTypes.GET_VALIDATION_REWARD_PROXY_SUCCESS:
      return {
        ...state,
        validationRewardProxy: action.result,
        validationRewardProxyLoading: false,
      };

    case actionTypes.GET_ROOT_NODE_REWARD_PROXY:
      return {
        ...state,
        rootNodeRewardProxyLoading: action.isAllocate,
      };
    case actionTypes.GET_ROOT_NODE_REWARD_PROXY_ERROR:
      return {
        ...state,
        rootNodeRewardProxyError: action.error,
        rootNodeRewardProxyLoading: false,
      };
    case actionTypes.GET_ROOT_NODE_REWARD_PROXY_SUCCESS:
      return {
        ...state,
        rootNodeRewardProxy: action.result,
        rootNodeRewardProxyLoading: false,
      };

    case actionTypes.GET_Q_HOLDER_TIME_UPDATE:
      return {
        ...state,
        qHolderTimeUpdateLoading: action.isUpdateTime,
      };
    case actionTypes.GET_Q_HOLDER_TIME_UPDATE_ERROR:
      return {
        ...state,
        qHolderTimeUpdateError: action.error,
        qHolderTimeUpdateLoading: false,
      };
    case actionTypes.GET_Q_HOLDER_TIME_UPDATE_SUCCESS:
      return {
        ...state,
        qHolderTimeUpdate: action.result,
        qHolderTimeUpdateLoading: false,
      };
    default:
      return state;
  }
}
