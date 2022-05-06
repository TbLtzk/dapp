import * as actionTypes from './action-types';

export const getAvailableAmount = () => ({
  type: actionTypes.GET_AVAILABLE_AMOUNT
});

export const getAvailableAmountSuccess = (result) => ({
  type: actionTypes.GET_AVAILABLE_AMOUNT_SUCCESS,
  result
});

export const getAvailableAmountError = (result) => ({
  type: actionTypes.GET_AVAILABLE_AMOUNT_ERROR,
  result
});

export const getSystemReserveBalance = () => ({ type: actionTypes.GET_SYSTEM_RESERVE_BALANCE });

export const setSystemReserveBalance = (data) => ({ type: actionTypes.SET_SYSTEM_RESERVE_BALANCE, payload: data });
