import * as actionTypes from '../actions/action-types/system-balance';

const initialState = {
  surplus: 0,
  debt: 0,
  systemBalance: 0,
};

export default function systemBalance(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SURPLUS_SUCCESS:
      return {
        ...state,
        surplus: action.result,
      };
    case actionTypes.GET_SURPLUS_ERROR:
      return {
        ...state,
        surplus: action.result,
      };
    case actionTypes.GET_DEBT_SUCCESS:
      return {
        ...state,
        debt: action.result,
      };
    case actionTypes.GET_DEBT_ERROR:
      return {
        ...state,
        debt: action.result,
      };
    case actionTypes.GET_SYSTEM_BALANCE_SUCCESS:
      return {
        ...state,
        systemBalance: action.result,
      };
    case actionTypes.GET_SYSTEM_BALANCE_ERROR:
      return {
        ...state,
        systemBalance: action.result,
      };
    default:
      return state;
  }
}
