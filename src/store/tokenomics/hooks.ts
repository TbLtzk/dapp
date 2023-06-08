import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorHandler } from 'helpers';

import {
  setDefaultAllocationProxy,
  setDefaultAllocationProxyLoading,
  setqHolderUpdateTime,
  setQHolderUpdateTimeLoading,
  setRootNodeRewardProxy,
  setRootNodeRewardProxyLoading,
  setRootNodesAPR,
  setValidationRewardProxy,
  setValidationRewardProxyLoading,
  setValidatorsAPR,
} from './reducer';

import { getUserAddress, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import {
  getCompoundRateKeeperQVaultInstance,
  getDefaultAllocationProxyInstance,
  getQVaultInstance,
  getRewardKPIInstance,
  getRootNodeRewardProxyInstance,
  getValidationRewardProxyInstance,
} from 'contracts/contract-instance';

export function useTokenomics () {
  const dispatch = useDispatch();
  const { loadQVBalanceDetails } = useQVault();
  const { getVRPPoolInfo } = useValidationRewards();
  const { loadValidatorDelegatedStake } = useValidators();

  const defaultAllocationProxy = useAppSelector(({ tokenomics }) => tokenomics.defaultAllocationProxy);
  const defaultAllocationProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.defaultAllocationProxyLoading);
  const validationRewardProxy = useAppSelector(({ tokenomics }) => tokenomics.validationRewardProxy);
  const validationRewardProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.validationRewardProxyLoading);
  const rootNodeRewardProxy = useAppSelector(({ tokenomics }) => tokenomics.rootNodeRewardProxy);
  const rootNodeRewardProxyLoading = useAppSelector(({ tokenomics }) => tokenomics.rootNodeRewardProxyLoading);
  const qHolderUpdateTime = useAppSelector(({ tokenomics }) => tokenomics.qHolderUpdateTime);
  const qHolderUpdateTimeLoading = useAppSelector(({ tokenomics }) => tokenomics.qHolderUpdateTimeLoading);
  const rootNodesAPR = useAppSelector(({ tokenomics }) => tokenomics.rootNodesAPR);
  const validatorsAPR = useAppSelector(({ tokenomics }) => tokenomics.validatorsAPR);

  async function getDefaultAllocationProxy () {
    try {
      const contract = await getDefaultAllocationProxyInstance();
      const balance = await contract.getBalance();
      dispatch(setDefaultAllocationProxy(balance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function allocateDefaultProxyRewards () {
    dispatch(setDefaultAllocationProxyLoading(true));
    try {
      const contract = await getDefaultAllocationProxyInstance();
      const tx = await contract.allocate({ from: getUserAddress() });

      return {
        tx,
        onSuccess: () => {
          getDefaultAllocationProxy();
          getRootNodeRewardProxy();
          getValidationRewardProxy();
        },
        onFinally: () => {
          dispatch(setDefaultAllocationProxyLoading(false));
        }
      };
    } catch (e) {
      dispatch(setDefaultAllocationProxyLoading(false));
      throw e;
    }
  }

  async function getRootNodeRewardProxy () {
    try {
      const contract = await getRootNodeRewardProxyInstance();
      const balance = await contract.getBalance();
      dispatch(setRootNodeRewardProxy(balance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function allocateRootNodeProxyRewards () {
    dispatch(setRootNodeRewardProxyLoading(true));
    try {
      const contract = await getRootNodeRewardProxyInstance();
      const tx = await contract.allocate({ from: getUserAddress() });

      return {
        tx,
        onSuccess: () => {
          getRootNodeRewardProxy();
        },
        onFinally: () => {
          dispatch(setRootNodeRewardProxyLoading(false));
        }
      };
    } catch (e) {
      dispatch(setRootNodeRewardProxyLoading(false));
      throw e;
    }
  }

  async function getValidationRewardProxy () {
    try {
      const contract = await getValidationRewardProxyInstance();
      const balance = await contract.getBalance();
      dispatch(setValidationRewardProxy(balance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function allocateValidationProxyRewards () {
    dispatch(setValidationRewardProxyLoading(true));
    try {
      const contract = await getValidationRewardProxyInstance();
      const tx = await contract.allocate({ from: getUserAddress() });

      return {
        tx,
        onSuccess: () => {
          getValidationRewardProxy();
          getVRPPoolInfo();
          loadValidatorDelegatedStake();
        },
        onFinally: () => {
          dispatch(setValidationRewardProxyLoading(false));
        }
      };
    } catch (e) {
      dispatch(setValidationRewardProxyLoading(false));
      throw e;
    }
  }

  async function getQHolderUpdateTime () {
    try {
      const contract = await getCompoundRateKeeperQVaultInstance();
      const lastUpdate = await contract.getLastUpdate();
      dispatch(setqHolderUpdateTime(lastUpdate));
      loadQVBalanceDetails();
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function allocateQHolderRewards () {
    dispatch(setQHolderUpdateTimeLoading(true));
    try {
      const contract = await getQVaultInstance();
      const tx = await contract.updateCompoundRate({
        from: getUserAddress(),
      });

      return {
        tx,
        onSuccess: () => {
          getQHolderUpdateTime();
        },
        onFinally: () => {
          dispatch(setQHolderUpdateTimeLoading(false));
        }
      };
    } catch (e) {
      dispatch(setQHolderUpdateTimeLoading(false));
      throw e;
    }
  }

  async function getRootNodesAPR () {
    try {
      const contract = getRewardKPIInstance();
      const apr = await contract.getRootNodesAPR();
      dispatch(setRootNodesAPR(apr));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getValidatorsAPR () {
    try {
      const contract = getRewardKPIInstance();
      const apr = await contract.getValidatorsAPR();
      dispatch(setValidatorsAPR(apr));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    defaultAllocationProxy,
    defaultAllocationProxyLoading,

    validationRewardProxy,
    validationRewardProxyLoading,

    rootNodeRewardProxy,
    rootNodeRewardProxyLoading,

    qHolderUpdateTime,
    qHolderUpdateTimeLoading,

    rootNodesAPR,
    validatorsAPR,

    getDefaultAllocationProxy: useCallback(getDefaultAllocationProxy, []),
    allocateDefaultProxyRewards: useCallback(allocateDefaultProxyRewards, []),

    getRootNodeRewardProxy: useCallback(getRootNodeRewardProxy, []),
    allocateRootNodeProxyRewards: useCallback(allocateRootNodeProxyRewards, []),

    getValidationRewardProxy: useCallback(getValidationRewardProxy, []),
    allocateValidationProxyRewards: useCallback(allocateValidationProxyRewards, []),

    getQHolderUpdateTime: useCallback(getQHolderUpdateTime, []),
    allocateQHolderRewards: useCallback(allocateQHolderRewards, []),

    getValidatorsAPR: useCallback(getValidatorsAPR, []),
    getRootNodesAPR: useCallback(getRootNodesAPR, []),
  };
}
