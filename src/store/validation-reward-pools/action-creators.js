import * as actionTypes from './action-types';

export const getVRPBalance = () => ({ type: actionTypes.GET_VRP_BALANCE });
export const getVRPBalanceSuccess = (poolBalance) => ({ type: actionTypes.GET_VRP_BALANCE_SUCCESS, poolBalance });

export const getVRPPoolInfo = () => ({ type: actionTypes.GET_VRP_POOL_INFO });
export const getVRPPoolInfoSuccess = (poolInfo) => ({ type: actionTypes.GET_VRP_POOL_INFO_SUCCESS, poolInfo });

export const getVRPDelegatorsShare = () => ({ type: actionTypes.GET_VRP_DELEGATORS_SHARE });
export const getVRPDelegatorsShareSucccess = (delegatorsShare) => ({
  type: actionTypes.GET_VRP_DELEGATORS_SHARE_SUCCESS,
  delegatorsShare,
});

export const getVRPLastUpdateOfCompoundRate = () => ({
  type: actionTypes.GET_VRP_LAST_UPDATE_OF_COMPOUND_RATE,
});
export const getVRPLastUpdateOfCompoundRateSuccess = (lastUpdateOfCompoundRate) => ({
  type: actionTypes.GET_VRP_LAST_UPDATE_OF_COMPOUND_RATE_SUCCESS,
  lastUpdateOfCompoundRate,
});
