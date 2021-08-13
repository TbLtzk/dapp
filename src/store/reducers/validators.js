import * as actionTypes from '../actions/action-types/validators'

const initialState = {
  lastUpdate: 0,
  loadCounter: 0,
  error: '',

  delegatorsShare: 0,
  totalStake: 0,
  ownStake: 0,
  delegatedStake: 0,
  accTotalStake: 0,
  interestRate: 0,
  selfStake: 0,

  validatorMembers: [],
  loadingMembers: true,
  errorMembers: null,
  isUserValidator: false,

  validatorsTimeLocks: null,
  validatorsMinimumTimeLock: null
}

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VAL_DATA_IS_LOADING:
      return {
        ...state,
        loadCounter: state.loadCounter + 1
      }
    case actionTypes.SET_VAL_DATA_IS_LOADED:
      return {
        ...state,
        lastUpdate: Date.now(),
        loadCounter: state.loadCounter - 1
      }
    case actionTypes.SET_VAL_ERROR:
      return {
        ...state,
        lastUpdate: Date.now(),
        loadCounter: state.loadCounter - 1,
        error: action.error
      }
    case actionTypes.SET_VAL_DELEGATORS_SHARE:
      return {
        ...state,
        delegatorsShare: action.payload
      }
    case actionTypes.SET_VAL_TOTAL_STAKE:
      return {
        ...state,
        totalStake: action.payload
      }
    case actionTypes.SET_VAL_OWN_STAKE:
      return {
        ...state,
        ownStake: action.payload
      }
    case actionTypes.SET_VAL_SELF_STAKE:
      return {
        ...state,
        selfStake: action.payload
      }
    case actionTypes.SET_VAL_DELEGATED_STAKE:
      return {
        ...state,
        delegatedStake: action.payload
      }
    case actionTypes.SET_VAL_ACC_TOTAL_STAKE:
      return {
        ...state,
        accTotalStake: action.payload
      }
    case actionTypes.SET_VAL_INTEREST_RATE:
      return {
        ...state,
        interestRate: action.payload
      }
    case actionTypes.GET_VALIDATORS_MEMBERS:
      return {
        ...state,
        loadingMembers: true
      }
    case actionTypes.GET_VALIDATORS_MEMBERS_SUCCESS:
      return {
        ...state,
        loadingMembers: false,
        validatorMembers: action.data,
        errorMembers: null
      }
    case actionTypes.GET_VALIDATORS_MEMBERS_ERROR:
      return {
        ...state,
        loadingMembers: false,
        validatorMembers: [],
        errorMembers: action.error
      }
    case actionTypes.IS_USER_VALIDATOR_SUCCESS:
      return {
        ...state,
        isUserValidator: action.result
      }
    case actionTypes.SET_VALIDATORS_MINIMUM_TIME_LOCK:
      return {
        ...state,
        validatorsMinimumTimeLock: action.payload
      }
    case actionTypes.SET_VALIDATORS_TIME_LOCKS:
      return {
        ...state,
        validatorsTimeLocks: action.payload
      }
    default:
      return {
        ...state,
        lastUpdate: Date.now()
      }
  }
}
