import * as actionTypes from './action-types'

const initialState = {
  rootMembersData: [],
  loadingRootMembersData: true,

  isUserRootNode: false,
  rootNodeStake: 0,
  withdrawals: 0,

  qVaultMinimumTimeLock: 0,
  qVaultTimeLocks: null
}

export default function rootContract (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ROOT_MEMBERS_DATA:
      return {
        ...state,
        rootMembersData: action.result,
        loadingRootMembersData: false
      }
    case actionTypes.SET_CHECK_IS_USER_ROOT_NODE:
      return {
        ...state,
        isUserRootNode: action.result
      }
    case actionTypes.SET_ROOT_NODE_STAKES:
      return {
        ...state,
        rootNodeStake: action.result
      }
    case actionTypes.SET_ROOT_WITHDRAWALS:
      return {
        ...state,
        withdrawals: action.result
      }
    case actionTypes.SET_ROOT_MINIMUM_TIME_LOCK:
      return {
        ...state,
        rootMinimumTimeLock: action.payload
      }
    case actionTypes.SET_ROOT_TIME_LOCKS:
      return {
        ...state,
        rootTimeLocks: action.payload
      }
    default:
      return state
  }
}
