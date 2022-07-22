import * as actionTypes from './action-types';

export const setPerformNetting = () => ({
  type: actionTypes.SET_PERFORM_NETTING,
});

export const getStableCoinTotalSupply = () => ({
  type: actionTypes.GET_SC_TOTAL_SUPPLY,
});

export const getStableCoinTotalSupplySuccess = (stableCoinTotalSupply) => ({
  type: actionTypes.GET_SC_TOTAL_SUPPLY_SUCCESS,
  stableCoinTotalSupply
});

export const getStableCoinTotalSupplyError = (error) => ({
  type: actionTypes.GET_SC_TOTAL_SUPPLY_ERROR,
  error
});

export const getSystemBalance = () => ({
  type: actionTypes.GET_SB_BALANCE,
});

export const getSystemBalanceSuccess = (systemBalance) => ({
  type: actionTypes.GET_SB_BALANCE_SUCCESS,
  systemBalance
});

export const getSystemBalanceError = (error) => ({
  type: actionTypes.GET_SB_BALANCE_ERROR,
  error
});

export const getSystemBalanceDebt = () => ({
  type: actionTypes.GET_SB_DEBT,
});

export const getSystemBalanceDebtSuccess = (systemBalanceDebt) => ({
  type: actionTypes.GET_SB_DEBT_SUCCESS,
  systemBalanceDebt
});

export const getSystemBalanceDebtError = (error) => ({
  type: actionTypes.GET_SB_DEBT_ERROR,
  error
});

export const getSystemBalanceSurplus = () => ({
  type: actionTypes.GET_SB_SURPLUS,
});

export const getSystemBalanceSurplusSuccess = (systemBalanceSurplus) => ({
  type: actionTypes.GET_SB_SURPLUS_SUCCESS,
  systemBalanceSurplus
});

export const getSystemBalanceSurplusError = (error) => ({
  type: actionTypes.GET_SB_SURPLUS_ERROR,
  error
});

export const getSystemReserveAvailableAmount = () => ({
  type: actionTypes.GET_SR_AVAILABLE_AMOUNT,
});

export const getSystemReserveAvailableAmountSuccess = (systemReserveAvailableAmount) => ({
  type: actionTypes.GET_SR_AVAILABLE_AMOUNT_SUCCESS,
  systemReserveAvailableAmount
});

export const getSystemReserveAvailableAmountError = (error) => ({
  type: actionTypes.GET_SR_AVAILABLE_AMOUNT_ERROR,
  error
});

export const getSystemReserveBalance = () => ({
  type: actionTypes.GET_SR_BALANCE,
});

export const getSystemReserveBalanceSuccess = (systemReserveBalance) => ({
  type: actionTypes.GET_SR_BALANCE_SUCCESS,
  systemReserveBalance
});

export const getSystemReserveBalanceError = (error) => ({
  type: actionTypes.GET_SR_BALANCE_ERROR,
  error
});
