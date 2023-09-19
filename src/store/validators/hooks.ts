import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';
import { toBigNumber } from '@q-dev/utils';
import { ErrorHandler } from 'helpers';

import {
  setAccountableSelfStake,
  setAccountableTotalStake,
  setCompoundRateKeeperExists,
  setDelegatedStake,
  setInactiveCount,
  setIsValidator,
  setIsValidatorInLongList,
  setTotalStake,
  setValidatorAddressesLongList,
  setValidators,
  setValidatorsMonitoring,
  setValidatorStats,
  setWithdrawalInfo
} from './reducer';

import { getState, getUserAddress, useAppSelector } from 'store';
import { useConstitution } from 'store/constitution/hooks';

import {
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';
import { getAliasMap } from 'contracts/helpers/aliases-helper';
import { getMonitoringValidators, getValidatorMetrics, getValidatorStats } from 'contracts/helpers/validators-helper';

import { fromWei } from 'utils/web3';

export function useValidators () {
  const dispatch = useDispatch();
  const { getConstitutionParameters } = useConstitution();

  const validators = useAppSelector(({ validators }) => validators.validators);
  const validatorsLoading = useAppSelector(({ validators }) => validators.validatorsLoading);

  const validatorAddressesLongList = useAppSelector(({ validators }) => validators.validatorAddressesLongList);

  const validatorStats = useAppSelector(({ validators }) => validators.validatorStats);
  const validatorStatsLoading = useAppSelector(({ validators }) => validators.validatorStatsLoading);

  const validatorsMonitoring = useAppSelector(({ validators }) => validators.validatorsMonitoring);
  const validatorsMonitoringLoading = useAppSelector(({ validators }) => validators.validatorsMonitoringLoading);

  const inactiveValidatorsCount = useAppSelector(({ validators }) => validators.inactiveCount);
  const inactiveValidatorsCountLoading = useAppSelector(({ validators }) => validators.inactiveCountLoading);

  const isValidator = useAppSelector(({ validators }) => validators.isValidator);
  const isValidatorInLongList = useAppSelector(({ validators }) => validators.isValidatorInLongList);
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
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadValidatorDelegatedStake () {
    try {
      const contract = await getValidatorsInstance();
      const validatorDelegatedStake = await contract.instance
        .getValidatorDelegatedStake(getUserAddress());
      dispatch(setDelegatedStake(fromWei(validatorDelegatedStake)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadValidatorAccountableTotalStake () {
    try {
      const contract = await getValidatorsInstance();
      const accountableTotalStake = await contract.getAccountableTotalStake(getUserAddress());
      dispatch(setAccountableTotalStake(fromWei(accountableTotalStake)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadValidatorAccountableSelfStake (address?: string) {
    try {
      const contract = await getValidatorsInstance();
      const accountableSelfStake = await contract.getAccountableSelfStake(address ?? getUserAddress());
      dispatch(setAccountableSelfStake(fromWei(accountableSelfStake)));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadValidatorWithdrawalInfo () {
    try {
      const contract = await getValidatorsInstance();
      const withdrawalInfo = await contract.getWithdrawalInfo(getUserAddress());
      dispatch(setWithdrawalInfo(withdrawalInfo));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadValidatorsShortList () {
    try {
      const { chainId } = getState().user;
      const validatorsInstance = await getValidatorsInstance();
      const shortList = await validatorsInstance.getShortList();
      const aliasesMap = await getAliasMap(
        shortList.map((item) => item.address),
        chainId,
        AliasPurpose.BLOCK_SEALING
      );

      const validatorsWithAlias = shortList.map((member) => ({
        ...member,
        alias: aliasesMap[member.address],
      }));

      dispatch(setValidators(validatorsWithAlias));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadValidatorStats () {
    try {
      await loadValidatorsShortList();
      const { validators: shortList } = getState().validators;
      const metric = await getValidatorMetrics();
      const stats = await Promise.all(
        shortList.map(async (validator, index) => {
          const poolInfo = await getValidatorStats(
            validator.address
          );
          return {
            poolInfo,
            metric: metric[index],
            address: validator.address,
            rank: index + 1,
            alias: validator.alias,
            payoutPerDelegatedQ: fromWei(toBigNumber(metric[index].payoutPerDelegatedQ || 0).toFixed(0)),
          };
        })
      );
      dispatch(setValidatorStats(stats));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
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
      ErrorHandler.process(error);
    }
  }

  async function loadInactiveValidatorsCount (indexerUrl: string) {
    try {
      await Promise.all([
        getConstitutionParameters(),
        loadValidatorsShortList(),
      ]);
      const { validators: shortList } = getState().validators;
      const { constitutionParams } = getState().constitution;

      const maxNValidatorsType = constitutionParams?.find(({ key }) => key === 'constitution.maxNValidators');
      const maxNValidators = Number(maxNValidatorsType?.value || 0);

      if (!maxNValidators) {
        dispatch(setInactiveCount(0));
        return;
      }

      const indexer = getIndexerInstance(indexerUrl);
      const validatorAddresses = shortList
        .slice(0, maxNValidators)
        .map(user => user.address);
      const inactiveValidators = await indexer.getInactiveValidators(validatorAddresses);
      dispatch(setInactiveCount(inactiveValidators));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function checkIsValidator () {
    try {
      const { address } = getState().user;
      const contract = await getValidatorsInstance();
      const [isInShortList, isInLongList] = await Promise.all([
        contract.isInShortList(address),
        contract.isInLongList(address)
      ]);
      dispatch(setIsValidator(isInShortList && isInLongList));
      dispatch(setIsValidatorInLongList(isInLongList));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      dispatch(setIsValidator(false));
      dispatch(setIsValidatorInLongList(false));
    }
  }

  async function loadCompoundRateKeeperExists () {
    try {
      const contract = await getValidationRewardPoolsInstance();
      const compoundRateKeeperExists = await contract.compoundRateKeeperExists(getUserAddress());
      dispatch(setCompoundRateKeeperExists(compoundRateKeeperExists));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function loadValidatorAddressesLongList () {
    try {
      const validatorsInstance = await getValidatorsInstance();
      const longList = await validatorsInstance.getLongList();

      dispatch(setValidatorAddressesLongList(longList));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    validators,
    validatorsLoading,

    validatorAddressesLongList,

    validatorStats,
    validatorStatsLoading,

    validatorsMonitoring,
    validatorsMonitoringLoading,

    inactiveValidatorsCount,
    inactiveValidatorsCountLoading,

    isValidator,
    isValidatorInLongList,
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
    loadValidatorAddressesLongList: useCallback(loadValidatorAddressesLongList, [])
  };
}
