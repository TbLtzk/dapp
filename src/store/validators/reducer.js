import * as actionTypes from './action-types';

import TABLE_TYPES from 'constants/tableTypes';

const initialState = {
  delegatorsShare: 0,
  totalStake: 0,
  ownStake: 0,
  delegatedStake: 0,
  accountableTotalStake: 0,
  interestRate: 0,
  selfStake: 0,

  validatorsShort: [],
  loadingValidatorsShort: true,

  validatorsWidened: [],
  loadingValidatorsWidened: true,

  validatorsMonitoring: [],
  loadingValidatorsMonitoring: true,

  validatorWithdrawalInfo: [],

  errorMembers: null,
  isUserValidator: false,

  validatorsTimeLocks: null,
  validatorsMinimumTimeLock: null,

  compoundRateKeeperExists: false
};

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VALIDATORS_MEMBERS:
      switch (action.tableType) {
        case TABLE_TYPES.validatorsWidened:
          return {
            ...state,
            validatorsWidened: action.payload,
            loadingValidatorsWidened: false
          };
        case TABLE_TYPES.validatorsShort:
          return {
            ...state,
            validatorsShort: action.payload,
            loadingValidatorsShort: false
          };
        case TABLE_TYPES.validatorsMonitoring:
          return {
            ...state,
            validatorsMonitoring: action.payload,
            loadingValidatorsMonitoring: false
          };
      }
      break;
    case actionTypes.SET_VALIDATORS_DELEGATORS_SHARE:
      return {
        ...state,
        delegatorsShare: action.payload
      };
    case actionTypes.SET_VALIDATORS_TOTAL_STAKE:
      return {
        ...state,
        totalStake: action.payload
      };
    case actionTypes.SET_VALIDATORS_OWN_STAKE:
      return {
        ...state,
        ownStake: action.payload
      };
    case actionTypes.SET_VALIDATORS_SELF_STAKE:
      return {
        ...state,
        selfStake: action.payload
      };
    case actionTypes.SET_VALIDATORS_DELEGATED_STAKE:
      return {
        ...state,
        delegatedStake: action.payload
      };
    case actionTypes.SET_VALIDATORS_ACCOUNTABLE_TOTAL_STAKE:
      return {
        ...state,
        accountableTotalStake: action.payload
      };
    case actionTypes.SET_VALIDATORS_INTEREST_RATE:
      return {
        ...state,
        interestRate: action.payload
      };
    case actionTypes.SET_IS_USER_VALIDATOR:
      return {
        ...state,
        isUserValidator: action.result
      };
    case actionTypes.SET_VALIDATORS_MINIMUM_TIME_LOCK:
      return {
        ...state,
        validatorsMinimumTimeLock: action.payload
      };
    case actionTypes.SET_VALIDATORS_TIME_LOCKS:
      return {
        ...state,
        validatorsTimeLocks: action.payload
      };
    case actionTypes.SET_COMPOUND_RATE_KEEPER_EXISTS: {
      return {
        ...state,
        compoundRateKeeperExists: action.payload
      };
    }
    case actionTypes.SET_VALIDATORS_WITHDRAWAL_INFO: {
      return {
        ...state,
        validatorWithdrawalInfo: action.payload
      };
    }
    default:
      return state;
  }
}
