import * as actionTypes from './action-types';

import { TABLE_TYPES } from 'constants/tableTypes';

const initialState = {
  rootMembers: [],
  loadingRootMembers: true,

  rootMembersMonitoring: [],
  loadingRootMembersMonitoring: true,

  rootMemebersTotalStake: 0,

  isUserRootNode: false,
  rootNodeStake: 0,
  withdrawals: {},

  rootMinimumTimeLock: 0,
  rootTimeLocks: null
};

export default function rootContract (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ROOT_MEMBERS:
      switch (action.tableType) {
        case TABLE_TYPES.rootNodesShort:
        case TABLE_TYPES.rootNodesWidened: {
          return {
            ...state,
            rootMembers: action.table,
            rootMemebersTotalStake: action.totalStake,
            loadingRootMembers: false
          };
        }
        case TABLE_TYPES.rootNodesMonitoring: {
          return {
            ...state,
            rootMembersMonitoring: action.table,
            loadingRootMembersMonitoring: false
          };
        }
      }
      break;
    case actionTypes.SET_CHECK_IS_USER_ROOT_NODE:
      return {
        ...state,
        isUserRootNode: action.result
      };

    case actionTypes.SET_ROOT_NODE_STAKES:
      return {
        ...state,
        rootNodeStake: action.result
      };
    case actionTypes.SET_ROOT_WITHDRAWALS:
      return {
        ...state,
        withdrawals: action.result
      };
    case actionTypes.SET_ROOT_MINIMUM_TIME_LOCK:
      return {
        ...state,
        rootMinimumTimeLock: action.payload
      };
    case actionTypes.SET_ROOT_TIME_LOCKS:
      return {
        ...state,
        rootTimeLocks: action.payload
      };
    default:
      return state;
  }
}
