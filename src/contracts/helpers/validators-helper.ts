import { AliasPurpose } from '@q-dev/q-js-sdk';
import { toBigNumber, transformToPercentage } from '@q-dev/utils';
import { Validator, ValidatorMetricStats, ValidatorMonitoring, ValidatorPoolInfo, ValidatorStatsInfo } from 'typings/validator';

import { getAliasMap } from './aliases-helper';

import {
  getContractRegistryInstance,
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorMetricsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';

import { chainIdToNetworkMap, networkConfigsMap } from 'constants/config';
import { fromWei, isAddress } from 'utils/web3';

export async function getValidatorMetrics (): Promise<ValidatorMetricStats[]> {
  const metrics = getValidatorMetricsInstance();
  await metrics.takeSnapshotFromNetwork(getContractRegistryInstance());

  const efficiency = metrics.getDelegationEfficiency();
  const saturation = metrics.getDelegationSaturation();
  const validators = metrics.getValidatorsShortList();

  return efficiency.map((efficiency, idx) => ({
    ...efficiency,
    address: validators[idx].address,
    delegationSaturation: saturation[idx],
  }));
}

export async function getValidator (
  address: string,
  chainId: number
): Promise<Validator> {
  if (!isAddress(address)) throw new Error('Invalid Address');
  const network = chainIdToNetworkMap[chainId];
  const indexerUrl = networkConfigsMap[network].indexerUrl;
  const indexer = getIndexerInstance(indexerUrl);
  const validatorsInstance = await getValidatorsInstance();
  const shortList = await validatorsInstance.getShortList();
  const validatorRank = shortList.findIndex((val) => val.address === address);

  const [
    inactiveValidators,
    validatorMetrics,
    aliasesMap
  ] = await Promise.all([
    indexer.getInactiveValidators([address]),
    getValidatorMetrics(),
    getAliasMap([address], chainId, AliasPurpose.BLOCK_SEALING),
  ]);

  const isActiveValidator = inactiveValidators === 0;
  const metric = validatorMetrics.find((v) => v.address === address);

  const [poolInfo, [monitoring]] = await Promise.all([
    getPoolInfo(address),
    getMonitoringValidators([address], indexerUrl)
  ]);

  return {
    metric,
    poolInfo,
    monitoring,
    address,
    isActiveValidator,
    alias: aliasesMap[address],
    rank: validatorRank + 1,
    payoutPerDelegatedQ: fromWei(toBigNumber(metric?.payoutPerDelegatedQ || 0).toFixed(0)),
  };
}
export async function getPoolInfo (address: string): Promise<ValidatorPoolInfo> {
  const [
    validatorsInstance,
    validationRewardPoolsInstance
  ] = await Promise.all([
    getValidatorsInstance(),
    getValidationRewardPoolsInstance(),
  ]);

  const [
    validatorInfo,
    lastUpdateOfCompoundRate,
    poolInfo,
  ] = await Promise.all([
    validatorsInstance.getValidatorInfo(address),
    validationRewardPoolsInstance.getLastUpdateOfCompoundRate(address),
    validationRewardPoolsInstance.getPoolInfo(address),
  ]);
  const delegatorsShare = transformToPercentage(poolInfo.delegatorsShare);
  const reservedForClaims = Number(fromWei(poolInfo?.reservedForClaims ?? '0'));

  return {
    selfStake: validatorInfo.selfStake,
    delegatedStake: validatorInfo.delegatedStake,
    totalStake: validatorInfo.totalStake,
    validatorShare: toBigNumber(100).minus(delegatorsShare).toString(),
    validatorPoolBalance: fromWei(poolInfo.poolBalance),
    distributableDelegatorsRewards: Number(fromWei(poolInfo.poolBalance)) - reservedForClaims ?? 0,
    delegatorsShare,
    lastUpdateOfCompoundRate,
    reservedForClaims,
  };
}

export async function getMonitoringValidators (
  addresses: string[],
  indexerUrl: string
): Promise<ValidatorMonitoring[]> {
  const indexer = getIndexerInstance(indexerUrl);
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

export async function getDelegatorShare (address: string): Promise<number> {
  const validationRewardPoolsInstance = await getValidationRewardPoolsInstance();
  const poolInfo = await validationRewardPoolsInstance.getPoolInfo(address);
  return Number(transformToPercentage(poolInfo.delegatorsShare)) || 0;
}

export async function getValidatorStats (address: string): Promise<ValidatorStatsInfo> {
  const validatorsInstance = await getValidatorsInstance();
  const validationRewardPoolsInstance = await getValidationRewardPoolsInstance();

  const [validatorInfo, poolInfo] = await Promise.all([
    validatorsInstance.getValidatorInfo(address),
    validationRewardPoolsInstance.getPoolInfo(address),
  ]);
  const delegatorsShare = transformToPercentage(poolInfo.delegatorsShare);
  const reservedForClaims = Number(fromWei(poolInfo?.reservedForClaims ?? '0'));

  return {
    ...validatorInfo,
    reservedForClaims,
    delegatorsShare,
    validatorShare: toBigNumber(100).minus(delegatorsShare).toString(),
    validatorPoolBalance: fromWei(poolInfo.poolBalance),
    distributableDelegatorsRewards: Number(fromWei(poolInfo.poolBalance)) - reservedForClaims ?? 0,
  };
}
