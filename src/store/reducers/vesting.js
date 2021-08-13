import * as actionTypes from '../actions/action-types/vesting'

const initialState = {
  vestingBalance: null,
  vestingMinimumTimeLock: null,
  vestingTimeLocks: null
}

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VESTING_BALANCE:
      return {
        ...state,
        vestingBalance: action.payload
      }
    case actionTypes.SET_VESTING_MINIMUM_TIME_LOCK:
      return {
        ...state,
        vestingMinimumTimeLock: action.payload
      }
    case actionTypes.SET_VESTING_TIME_LOCKS:
      return {
        ...state,
        vestingTimeLocks: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
