import { AddressWithBalance } from '@q-dev/q-js-sdk';
import { ValidatorsInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsInstance';
import { ValidationRewardPoolsInstance } from '@q-dev/q-js-sdk/lib/contracts/tokeneconomics/ValidationRewardPoolsInstance';
import { Validator, ValidatorMonitoring } from 'typings/validator';
import { fromWei } from 'web3-utils';

import { getBlockSealingAliasMap } from './aliases-helper';

import {
  getContractRegistryInstance,
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorMetricsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';

import { calculateInterestRate, toBigNumber, transformToPercentage } from 'utils/numbers';
import { isAddress } from 'utils/strings';

export async function getValidators (shortList: AddressWithBalance[]) {
  const metrics = await getValidatorMetricsInstance();
  await metrics.takeSnapshotFromNetwork(getContractRegistryInstance());

  const efficiency = await metrics.getDelegationEfficiency();
  const saturation = await metrics.getDelegationSaturation();

  return efficiency.map((validator, idx) => ({
    ...validator,
    ...shortList[idx],
    delegationSaturation: saturation[idx],
  } as Validator));
}

export async function getValidator (
  validator: Validator,
  index: number,
  validatorsInstance: ValidatorsInstance,
  validationRewardPoolsInstance: ValidationRewardPoolsInstance
): Promise<Validator> {
  const [
    validatorInfo,
    lastUpdateOfCompoundRate,
    poolInfo,
  ] = await Promise.all([
    validatorsInstance.getValidatorInfo(validator.address),
    validationRewardPoolsInstance.getLastUpdateOfCompoundRate(validator.address),
    validationRewardPoolsInstance.getPoolInfo(validator.address),
  ]);
  const delegatorsShare = Number(transformToPercentage(poolInfo.delegatorsShare)) || 0;
  const reservedForClaims = Number(fromWei(poolInfo?.reservedForClaims ?? '0'));

  return {
    ...validator,
    rank: index + 1,
    totalStake: validator.balance,
    selfStake: validatorInfo.selfStake,
    delegatedStake: validatorInfo.delegatedStake,
    validatorShare: 100 - delegatorsShare,
    validatorPoolBalance: fromWei(poolInfo.poolBalance),
    distributableDelegatorsRewards: Number(fromWei(poolInfo.poolBalance)) - reservedForClaims ?? 0,
    poolinterestRate: calculateInterestRate(Number(poolInfo.interestRate)),
    payoutToDelegators: fromWei(toBigNumber(validator.payoutToDelegators).toFixed()),
    payoutPerDelegatedQ: fromWei(toBigNumber(validator.payoutPerDelegatedQ).toFixed()),
    delegatorsShare,
    lastUpdateOfCompoundRate,
    reservedForClaims,
  };
}

export async function getAndCombineValidatorInfo (
  address: string,
  network: number,
  indexerUrl: string
): Promise<Partial<Validator>> {
  if (!isAddress(address)) return {};
  const [
    indexer,
    validatorsInstance,
    validationRewardPoolsInstance
  ] = await Promise.all([
    getIndexerInstance(indexerUrl),
    getValidatorsInstance(),
    getValidationRewardPoolsInstance(),
  ]);

  const shortList = await validatorsInstance.getShortList();
  const validatorRank = shortList.findIndex((val) => val.address === address);
  if (validatorRank === -1) return {};

  const [
    inactiveValidators,
    validators,
    aliasesMap
  ] = await Promise.all([
    indexer.getInactiveValidators([address]),
    getValidators(shortList),
    getBlockSealingAliasMap([address], network),
  ]);

  const isActiveValidator = inactiveValidators === 0;
  const ourValidator = validators.find((validator) => validator.address === address);

  const validatorData = await getValidator(
    ourValidator as Validator,
    validatorRank,
    validatorsInstance,
    validationRewardPoolsInstance,
  );
  const [monitoringValidator] = await getMonitoringValidators([address], indexerUrl);

  return {
    ...validatorData,
    ...monitoringValidator,
    alias: aliasesMap[address],
    isActiveValidator
  } as Partial<Validator>;
}

export async function getMonitoringValidators (
  addresses: string[],
  indexerUrl: string
): Promise<ValidatorMonitoring[]> {
  const indexer = await getIndexerInstance(indexerUrl);
  const validatorStats = await indexer.getValidatorStats(addresses);
  const [metrics20, metrics1000] = await Promise.all([
    indexer.getValidatorMetrics(20),
    indexer.getValidatorMetrics(1000),
  ]);

  return validatorStats.map((stat, i) => {
    const metric20 = metrics20.find((m) => m.address === addresses[i]);
    const metric1000 = metrics1000.find((m) => m.address === addresses[i]);

    return {
      address: addresses[i],
      lastBlock: stat.lastBlockValidated,
      timestamp: stat.lastBlockValidatedTime.getTime(),
      availability20Cycles: Math.min(metric20?.totalAvailability || 0, 1) * 100,
      availability1000Cycles: Math.min(metric1000?.totalAvailability || 0, 1) * 100,
      metric20,
      metric1000,
    };
  });
}
