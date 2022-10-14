import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { transformToPercentage } from '@q-dev/utils';

import { setDelegatorsShare, setLastUpdateOfCompoundRate, setPoolBalance, setPoolInfo } from './reducer';

import { getUserAddress, useAppSelector } from 'store';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

import { captureError } from 'utils/errors';

export function useValidationRewards () {
  const dispatch = useDispatch();

  const poolInfo = useAppSelector(({ validationRewards }) => validationRewards.poolInfo);
  const poolBalance = useAppSelector(({ validationRewards }) => validationRewards.poolBalance);
  const delegatorsShare = useAppSelector(({ validationRewards }) => validationRewards.delegatorsShare);
  const lastUpdateOfCompoundRate = useAppSelector(
    ({ validationRewards }) => validationRewards.lastUpdateOfCompoundRate
  );

  async function getVRPDelegatorsShare () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const delegatorsShare = await contract.getDelegatorsShare(getUserAddress());
      dispatch(setDelegatorsShare(Number(transformToPercentage(delegatorsShare)) || 0));
    } catch (error) {
      captureError(error);
    }
  }

  async function getVRPPoolInfo () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const poolInfo = await contract.getPoolInfo(getUserAddress());
      dispatch(setPoolInfo(poolInfo));
    } catch (error) {
      captureError(error);
    }
  }

  async function getVRPLastUpdateOfCompoundRate () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const lastUpdateOfCompoundRate = await contract.getLastUpdateOfCompoundRate(getUserAddress());
      dispatch(setLastUpdateOfCompoundRate(lastUpdateOfCompoundRate));
    } catch (error) {
      captureError(error);
    }
  }

  async function getVRPBalance () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const amount = await contract.getBalance();
      dispatch(setPoolBalance(amount));
    } catch (error) {
      captureError(error);
    }
  }

  return {
    poolInfo,
    poolBalance,
    delegatorsShare,
    lastUpdateOfCompoundRate,

    getVRPDelegatorsShare: useCallback(getVRPDelegatorsShare, []),
    getVRPPoolInfo: useCallback(getVRPPoolInfo, []),
    getVRPLastUpdateOfCompoundRate: useCallback(getVRPLastUpdateOfCompoundRate, []),
    getVRPBalance: useCallback(getVRPBalance, [])
  };
}
