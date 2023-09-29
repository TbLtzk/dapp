import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { transformToPercentage } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';

import { setDelegatorsShare, setLastUpdateOfCompoundRate, setPoolBalance, setPoolInfo } from './reducer';

import { useAppSelector } from 'store';

import { getValidationRewardPoolsInstance } from 'contracts/contract-instance';

export function useValidationRewards () {
  const dispatch = useDispatch();
  const { address: accountAddress } = useWeb3Context();

  const poolInfo = useAppSelector(({ validationRewards }) => validationRewards.poolInfo);
  const poolBalance = useAppSelector(({ validationRewards }) => validationRewards.poolBalance);
  const delegatorsShare = useAppSelector(({ validationRewards }) => validationRewards.delegatorsShare);
  const lastUpdateOfCompoundRate = useAppSelector(
    ({ validationRewards }) => validationRewards.lastUpdateOfCompoundRate
  );

  async function getVRPDelegatorsShare () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const delegatorsShare = await contract.getDelegatorsShare(accountAddress);
      dispatch(setDelegatorsShare(Number(transformToPercentage(delegatorsShare)) || 0));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getVRPPoolInfo () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const poolInfo = await contract.getPoolInfo(accountAddress);
      dispatch(setPoolInfo(poolInfo));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getVRPLastUpdateOfCompoundRate () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const lastUpdateOfCompoundRate = await contract.getLastUpdateOfCompoundRate(accountAddress);
      dispatch(setLastUpdateOfCompoundRate(lastUpdateOfCompoundRate));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getVRPBalance () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const amount = await contract.getBalance();
      dispatch(setPoolBalance(amount));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
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
