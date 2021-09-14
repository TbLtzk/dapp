import * as actionTypes from '../actions/action-types/validators'

const initialState = {

  delegatorsShare: 0,
  totalStake: 0,
  ownStake: 0,
  delegatedStake: 0,
  accountableTotalStake: 0,
  interestRate: 0,
  selfStake: 0,
  validatorShortlist: [],
  validatorWithdrawalInfo: [],

  validatorMembers: [],
  loadingMembers: true,
  errorMembers: null,
  isUserValidator: false,

  validatorsTimeLocks: null,
  validatorsMinimumTimeLock: null
}

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VALIDATORS_DELEGATORS_SHARE:
      return {
        ...state,
        delegatorsShare: action.payload
      }
    case actionTypes.SET_VALIDATORS_TOTAL_STAKE:
      return {
        ...state,
        totalStake: action.payload
      }
    case actionTypes.SET_VALIDATORS_OWN_STAKE:
      return {
        ...state,
        ownStake: action.payload
      }
    case actionTypes.SET_VALIDATORS_SELF_STAKE:
      return {
        ...state,
        selfStake: action.payload
      }
    case actionTypes.SET_VALIDATORS_DELEGATED_STAKE:
      return {
        ...state,
        delegatedStake: action.payload
      }
    case actionTypes.SET_VALIDATORS_ACCOUNTABLE_TOTAL_STAKE:
      return {
        ...state,
        accountableTotalStake: action.payload
      }
    case actionTypes.SET_VALIDATORS_INTEREST_RATE:
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
    case actionTypes.SET_IS_USER_VALIDATOR:
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
    case actionTypes.SET_VALIDATORS_SHORT_LIST: {
      return {
        ...state,
        validatorShortlist: action.payload
      }
    }
    case actionTypes.SET_VALIDATORS_WITHDRAWAL_INFO: {
      return {
        ...state,
        validatorWithdrawalInfo: action.payload
      }
    }
    default:
      return {
        ...state,
        lastUpdate: Date.now()
      }
  }
}
