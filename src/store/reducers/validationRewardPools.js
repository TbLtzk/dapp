import * as actionTypes from '../actions/action-types/validation-reward-pools'

const initialState = {
  poolInfo: null,
  delegatorShare: null,
  balance: 0
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
    default:
      return state
  }
}
