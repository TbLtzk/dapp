import * as actionTypes from './action-types';

const initialState = {
  surplus: 0,
  debt: 0,
  systemBalance: 0,

  loadingPerformNetting: false
};

export default function systemBalance (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SURPLUS_SUCCESS:
      return {
        ...state,
        surplus: action.result
      };
    case actionTypes.GET_SURPLUS_ERROR:
      return {
        ...state,
        surplus: action.result
      };
    case actionTypes.GET_DEBT_SUCCESS:
      return {
        ...state,
        debt: action.result
      };
    case actionTypes.GET_DEBT_ERROR:
      return {
        ...state,
        debt: action.result
      };
    case actionTypes.GET_SYSTEM_BALANCE_SUCCESS:
      return {
        ...state,
        systemBalance: action.result
      };
    case actionTypes.GET_SYSTEM_BALANCE_ERROR:
      return {
        ...state,
        systemBalance: action.result
      };
    case actionTypes.ON_PERFORM_NETTING:
      return {
        ...state,
        loadingPerformNetting: true
      };
    case actionTypes.ON_PERFORM_NETTING_SUCCESS:
      return {
        ...state,
        loadingPerformNetting: false
      };
    case actionTypes.ON_PERFORM_NETTING_ERROR:
      return {
        ...state,
        loadingPerformNetting: false
      };
    default:
      return state;
  }
}
