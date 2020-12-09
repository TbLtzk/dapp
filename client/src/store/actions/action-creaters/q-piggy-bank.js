import * as actionTypes from '../action-types/q-piggy-bank';

export const setUserBalance = (userAddress) => ({type: actionTypes.SET_PB_USER_BALANCE, userAddress});
export const setUserBalanceSuccess = (data) => ({type: actionTypes.SET_PB_USER_BALANCE_SUCCESS, payload: data});

export const setError = (data) => ({type: actionTypes.SET_PB_ERROR, error: data});
