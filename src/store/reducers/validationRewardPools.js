import * as actionTypes from '../actions/action-types/validation-reward-pools'

const initialState = {
  poolInfo: null,
  delegatorShare: null,
  balance: 0,
  lastUpdateOfCompoundRate: null,
  loadingUpdateOfCompoundRate: false
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
    default:
      return state
  }
}
