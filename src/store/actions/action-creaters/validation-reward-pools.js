import * as actionTypes from '../action-types/validation-reward-pools'

export const setError = (data) => ({ type: actionTypes.SET_VRP_ERROR, error: data })

export const getBalance = (address) => ({ type: actionTypes.GET_VRP_BALANCE, address })
export const setBalance = (data) => ({ type: actionTypes.SET_VRP_BALANCE, payload: data })

export const getVRPBalance = (address) => ({ type: actionTypes.GET_VRP_BALANCE_DASHBOARD, address })
export const getVRPBalanceSuccess = (result) => ({ type: actionTypes.GET_VRP_BALANCE_DASHBOARD_SUCCESS, result })
