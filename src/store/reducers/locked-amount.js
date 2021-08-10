import * as actionTypes from "../actions/action-types/locked-amount";

const initialState = {
  lastUpdate: 0,
  loadCounter: 0,
  error: "",

  qVaultAmount: null,
  rootNodeAmount: null,
  validatorAmount: null,
  vestingAmount: null,
};

export default function index(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOCK_DATA_IS_LOADING:
      return {
        ...state,
        loadCounter: state.loadCounter + 1,
      };
    case actionTypes.SET_LOCK_DATA_IS_LOADED:
      return {
        ...state,
        lastUpdate: Date.now(),
        loadCounter: state.loadCounter - 1,
      };
    case actionTypes.SET_LOCK_ERROR:
      return {
        ...state,
        lastUpdate: Date.now(),
        loadCounter: state.loadCounter - 1,
        error: action.error,
      };
    case actionTypes.SET_QVAULT_AMOUNT:
      return {
        ...state,
        qVaultAmount: action.payload,
      };
    case actionTypes.SET_ROOTNODE_AMOUNT:
      return {
        ...state,
        rootNodeAmount: action.payload,
      };
    case actionTypes.SET_VALIDATOR_AMOUNT:
      return {
        ...state,
        validatorAmount: action.payload,
      };
    case actionTypes.SET_VESTING_AMOUNT:
      return {
        ...state,
        vestingAmount: action.payload,
      };
    default:
      return {
        ...state,
        lastUpdate: Date.now(),
      };
  }
}
