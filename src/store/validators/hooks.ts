import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fromWei } from 'web3-utils';

import {
  setAccountableSelfStake,
  setAccountableTotalStake,
  setCompoundRateKeeperExists,
  setDelegatedStake,
  setInactiveCount,
  setIsValidator,
  setMinimumTimeLock,
  setTimeLocks,
  setTotalStake,
  setValidators,
  setValidatorsMonitoring,
  setValidatorStats,
  setWithdrawalInfo
} from './reducer';

import { getState, getUserAddress, useAppSelector } from 'store';

import {
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';
import { getBlockSealingAliasMap } from 'contracts/helpers/aliases-helper';
import { getMonitoringValidators, getValidator, getValidators } from 'contracts/helpers/validators-helper';

import { dateToUnix } from 'utils/date';
import { captureError } from 'utils/errors';

export function useValidators () {
  const dispatch = useDispatch();

  const validators = useAppSelector(({ validators }) => validators.validators);
  const validatorsLoading = useAppSelector(({ validators }) => validators.validatorsLoading);

  const validatorStats = useAppSelector(({ validators }) => validators.validatorStats);
  const validatorStatsLoading = useAppSelector(({ validators }) => validators.validatorStatsLoading);

  const validatorsMonitoring = useAppSelector(({ validators }) => validators.validatorsMonitoring);
  const validatorsMonitoringLoading = useAppSelector(({ validators }) => validators.validatorsMonitoringLoading);

  const inactiveValidatorsCount = useAppSelector(({ validators }) => validators.inactiveCount);
  const inactiveValidatorsCountLoading = useAppSelector(({ validators }) => validators.inactiveCountLoading);

  const validatorsMinimumTimeLock = useAppSelector(({ validators }) => validators.minimumTimeLock);
  const validatorsTimeLocks = useAppSelector(({ validators }) => validators.timeLocks);

  const isValidator = useAppSelector(({ validators }) => validators.isValidator);
  const validatorWithdrawalInfo = useAppSelector(({ validators }) => validators.withdrawalInfo);
  const compoundRateKeeperExists = useAppSelector(({ validators }) => validators.compoundRateKeeperExists);

  const validatorTotalStake = useAppSelector(({ validators }) => validators.totalStake);
  const validatorDelegatedStake = useAppSelector(({ validators }) => validators.delegatedStake);
  const validatorAccountableTotalStake = useAppSelector(({ validators }) => validators.accountableTotalStake);
  const validatorAccountableSelfStake = useAppSelector(({ validators }) => validators.accountableSelfStake);

  async function loadValidatorTotalStake () {
    try {
      const contract = await getValidatorsInstance();
      const validatorTotalStake = await contract.getValidatorTotalStake(getUserAddress());
      dispatch(setTotalStake(fromWei(validatorTotalStake)));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorDelegatedStake () {
    try {
      const contract = await getValidatorsInstance();
      const validatorDelegatedStake = await contract.instance.methods
        .getValidatorDelegatedStake(getUserAddress()).call();
      dispatch(setDelegatedStake(fromWei(validatorDelegatedStake)));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorAccountableTotalStake () {
    try {
      const contract = await getValidatorsInstance();
      const accountableTotalStake = await contract.getAccountableTotalStake(getUserAddress());
      dispatch(setAccountableTotalStake(fromWei(accountableTotalStake)));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorAccountableSelfStake (address?: string) {
    try {
      const contract = await getValidatorsInstance();
      const accountableSelfStake = await contract.getAccountableSelfStake(address ?? getUserAddress());
      dispatch(setAccountableSelfStake(fromWei(accountableSelfStake)));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorWithdrawalInfo () {
    try {
      const contract = await getValidatorsInstance();
      const withdrawalInfo = await contract.getWithdrawalInfo(getUserAddress());
      dispatch(setWithdrawalInfo(withdrawalInfo));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorsShortList () {
    try {
      const validatorsInstance = await getValidatorsInstance();
      const shortList = await validatorsInstance.getShortList();
      const aliasesMap = await getBlockSealingAliasMap(
        shortList.map((item) => item.address),
        getState().user.chainId
      );

      const validatorsWithAlias = shortList.map((member) => ({
        ...member,
        alias: aliasesMap[member.address],
      }));

      dispatch(setValidators(validatorsWithAlias));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorStats () {
    try {
      await loadValidatorsShortList();
      const { validators: shortList } = getState().validators;

      const validatorsInstance = await getValidatorsInstance();
      const validators = await getValidators(shortList);

      const validationRewardPoolsInstance = await getValidationRewardPoolsInstance();
      const stats = await Promise.all(
        validators.map((validator, idx) =>
          getValidator(validator, idx, validatorsInstance, validationRewardPoolsInstance)
        )
      );

      dispatch(setValidatorStats(stats));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadMonitoringValidators (indexerUrl: string) {
    try {
      await loadValidatorsShortList();
      const { validators: shortList } = getState().validators;
      const monitoringValidators = await getMonitoringValidators(shortList.map(v => v.address), indexerUrl);
      dispatch(setValidatorsMonitoring(shortList.map((validator, i) => ({
        rank: i + 1,
        ...validator,
        ...monitoringValidators[i],
      }))));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadInactiveValidatorsCount (indexerUrl: string) {
    try {
      await loadValidatorsShortList();
      const { validators: shortList } = getState().validators;

      const indexer = await getIndexerInstance(indexerUrl);
      const validatorAddresses = shortList.map((user) => user.address);
      const inactiveValidators = await indexer.getInactiveValidators(validatorAddresses);
      dispatch(setInactiveCount(inactiveValidators));
    } catch (error) {
      captureError(error);
    }
  }

  async function checkIsValidator () {
    try {
      const userAddress = getUserAddress();
      const contract = await getValidatorsInstance();
      const isInShortList = await contract.isInShortList(userAddress);
      const isInLongList = await contract.isInLongList(userAddress);
      dispatch(setIsValidator(isInShortList && isInLongList));
    } catch (error) {
      captureError(error);
      dispatch(setIsValidator(false));
    }
  }

  async function loadCompoundRateKeeperExists () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const compoundRateKeeperExists = await contract.compoundRateKeeperExists(getUserAddress());
      dispatch(setCompoundRateKeeperExists(compoundRateKeeperExists));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorMinimumTimeLock (address: string) {
    try {
      const contract = await getValidatorsInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      dispatch(setMinimumTimeLock(fromWei(minimumBalance)));
    } catch (error) {
      captureError(error);
    }
  }

  async function loadValidatorTimeLocks (address: string) {
    try {
      const contract = await getValidatorsInstance();
      const timeLocks = await contract.getTimeLocks(address);
      dispatch(setTimeLocks(timeLocks));
    } catch (error) {
      captureError(error);
    }
  }

  return {
    validators,
    validatorsLoading,

    validatorStats,
    validatorStatsLoading,

    validatorsMonitoring,
    validatorsMonitoringLoading,

    inactiveValidatorsCount,
    inactiveValidatorsCountLoading,

    validatorsMinimumTimeLock,
    validatorsTimeLocks,

    isValidator,
    validatorWithdrawalInfo,
    compoundRateKeeperExists,

    validatorTotalStake,
    validatorDelegatedStake,
    validatorAccountableTotalStake,
    validatorAccountableSelfStake,

    loadValidatorTotalStake: useCallback(loadValidatorTotalStake, []),
    loadValidatorDelegatedStake: useCallback(loadValidatorDelegatedStake, []),
    loadValidatorAccountableTotalStake: useCallback(loadValidatorAccountableTotalStake, []),
    loadValidatorAccountableSelfStake: useCallback(loadValidatorAccountableSelfStake, []),
    loadValidatorWithdrawalInfo: useCallback(loadValidatorWithdrawalInfo, []),
    loadValidatorsShortList: useCallback(loadValidatorsShortList, []),
    loadInactiveValidatorsCount: useCallback(loadInactiveValidatorsCount, []),
    loadValidatorStats: useCallback(loadValidatorStats, []),
    loadMonitoringValidators: useCallback(loadMonitoringValidators, []),
    checkIsValidator: useCallback(checkIsValidator, []),
    loadCompoundRateKeeperExists: useCallback(loadCompoundRateKeeperExists, []),
    loadValidatorMinimumTimeLock: useCallback(loadValidatorMinimumTimeLock, []),
    loadValidatorTimeLocks: useCallback(loadValidatorTimeLocks, []),
  };
}
