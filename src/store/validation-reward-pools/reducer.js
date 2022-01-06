import * as actionTypes from './action-types'

const initialState = {
  poolInfo: 0,
  delegatorShare: 0,
  balance: 0,
  lastUpdateOfCompoundRate: 0,
  loadingUpdateOfCompoundRate: false,
  isStakerRewardPoolMsgDisplayed: false,
  rewardPoolsBalance: 0
}

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VRP_BALANCE:
      return {
        ...state,
        balance: action.payload
      }
    case actionTypes.SET_VRP_POOL_INFO:
      return {
        ...state,
        poolInfo: action.payload
      }
    case actionTypes.SET_REWARD_POOLS_BALANCE: {
      return {
        ...state,
        rewardPoolsBalance: action.payload
      }
    }
    case actionTypes.SET_VRP_DELEGATOR_SHARE_DATA:
      return {
        ...state,
        delegatorShare: action.payload
      }
    case actionTypes.SET_VRP_LAST_UPDATE_OF_COMPOUND_RATE_DATA:
      return {
        ...state,
        lastUpdateOfCompoundRate: action.payload
      }
    case actionTypes.SET_VRP_LOADING_COMPOUND_RATE:
      return {
        ...state,
        loadingUpdateOfCompoundRate: action.payload
      }
    case actionTypes.SET_IS_STAKER_REWARD_POOL_MSG_DISPLAYED:
      return {
        ...state,
        isStakerRewardPoolMsgDisplayed: action.payload
      }
    default:
      return state
  }
}
