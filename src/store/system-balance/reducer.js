import * as actionTypes from './action-types';

const initialState = {
  stableCoinTotalSupply: 0,

  systemBalanceSurplus: 0,
  systemBalance: 0,
  systemBalanceDebt: 0,

  systemReserveAvailableAmount: 0,
  systemReserveBalance: 0,

  error: null,
};

export default function systemBalance (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SC_TOTAL_SUPPLY_SUCCESS:
      return {
        ...state,
        stableCoinTotalSupply: action.stableCoinTotalSupply,
      };
    case actionTypes.GET_SC_TOTAL_SUPPLY_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.GET_SB_SURPLUS_SUCCESS:
      return {
        ...state,
        systemBalanceSurplus: action.systemBalanceSurplus,
      };

    case actionTypes.GET_SB_SURPLUS_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.GET_SB_BALANCE_SUCCESS:
      return {
        ...state,
        systemBalance: action.systemBalance,
      };
    case actionTypes.GET_SB_BALANCE_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.GET_SB_DEBT_SUCCESS:
      return {
        ...state,
        systemBalanceDebt: action.systemBalanceDebt,
      };
    case actionTypes.GET_SB_DEBT_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.GET_SR_AVAILABLE_AMOUNT_SUCCESS:
      return {
        ...state,
        systemReserveAvailableAmount: action.systemReserveAvailableAmount,
      };
    case actionTypes.GET_SR_AVAILABLE_AMOUNT_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.GET_SR_BALANCE_SUCCESS:
      return {
        ...state,
        systemReserveBalance: action.systemReserveBalance,
      };
    case actionTypes.GET_SR_BALANCE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
