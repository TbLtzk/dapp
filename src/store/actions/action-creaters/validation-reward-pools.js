import * as actionTypes from '../action-types/validation-reward-pools'

export const getVRPBalance = (address) => ({ type: actionTypes.GET_VRP_BALANCE, address })
export const setVRPBalance = (data) => ({ type: actionTypes.SET_VRP_BALANCE, payload: data })

export const getVRPPoolInfo = (address) => ({ type: actionTypes.GET_VRP_POOL_INFO, address })
export const setVRPPoolInfo = (data) => ({ type: actionTypes.SET_VRP_POOL_INFO, payload: data })

export const getVRPDelegatorsShare = (address) => ({ type: actionTypes.GET_VRP_DELEGATOR_SHARE, address })
export const setVRPDelegatorsShare = (amount) => ({ type: actionTypes.SET_VRP_DELEGATOR_SHARE, amount })
export const setVRPDelegatorsShareData = (data) => ({ type: actionTypes.SET_VRP_DELEGATOR_SHARE_DATA, payload: data })
