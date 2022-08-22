import * as actionTypes from './action-types';

import { TABLE_TYPES } from 'constants/tableTypes';

const initialState = {
  isUserValidator: false,
  compoundRateKeeperExists: false,

  validatorTotalStake: 0,
  validatorDelegatedStake: 0,
  validatorAcountableTotalStake: 0,
  validatorAccountableSelfStake: 0,

  inactiveValidators: 0,

  validatorsShort: [],
  loadingValidatorsShort: true,

  validatorsWidened: [],
  loadingValidatorsWidened: true,

  validatorsMonitoring: [],
  loadingValidatorsMonitoring: true,

  errorMembers: null,

  validatorWithdrawalInfo: [],

  validatorsTimeLocks: null,
  validatorsMinimumTimeLock: null,
};

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VALIDATORS_MEMBERS:
      switch (action.tableType) {
        case TABLE_TYPES.validatorsWidened:
          return {
            ...state,
            validatorsWidened: action.payload,
            loadingValidatorsWidened: false,
          };
        case TABLE_TYPES.validatorsShort:
          return {
            ...state,
            validatorsShort: action.payload,
            loadingValidatorsShort: false,
          };
        case TABLE_TYPES.validatorsMonitoring:
          return {
            ...state,
            validatorsMonitoring: action.payload,
            loadingValidatorsMonitoring: false,
          };
      }
      break;

    case actionTypes.GET_VALIDATOR_TOTAL_STAKE_SUCCESS:
      return {
        ...state,
        validatorTotalStake: action.validatorTotalStake,
      };

    case actionTypes.GET_VALIDATOR_DELEGATED_STAKE_SUCCESS:
      return {
        ...state,
        validatorDelegatedStake: action.validatorDelegatedStake,
      };

    case actionTypes.GET_VALIDATOR_ACCOUNTABLE_TOTAL_STAKE_SUCCESS:
      return {
        ...state,
        validatorAcountableTotalStake: action.validatorAcountableTotalStake,
      };

    case actionTypes.GET_VALIDATOR_ACCOUNTABLE_SELF_STAKE_SUCCESS:
      return {
        ...state,
        validatorAccountableSelfStake: action.validatorAccountableSelfStake,
      };

    case actionTypes.SET_INACTIVE_VALIDATORS: {
      return {
        ...state,
        inactiveValidators: action.payload,
      };
    }
    case actionTypes.SET_IS_USER_VALIDATOR:
      return {
        ...state,
        isUserValidator: action.result,
      };
    case actionTypes.SET_VALIDATORS_MINIMUM_TIME_LOCK:
      return {
        ...state,
        validatorsMinimumTimeLock: action.payload,
      };
    case actionTypes.SET_VALIDATORS_TIME_LOCKS:
      return {
        ...state,
        validatorsTimeLocks: action.payload,
      };
    case actionTypes.SET_COMPOUND_RATE_KEEPER_EXISTS: {
      return {
        ...state,
        compoundRateKeeperExists: action.payload,
      };
    }
    case actionTypes.GET_VALIDATORS_WITHDRAWAL_INFO_SUCCESS: {
      return {
        ...state,
        validatorWithdrawalInfo: action.withdrawalInfo,
      };
    }
    default:
      return state;
  }
}
