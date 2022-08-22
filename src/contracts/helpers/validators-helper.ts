import { AddressWithBalance, Indexer } from '@q-dev/q-js-sdk';
import { ValidatorsInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsInstance';
import { ValidationRewardPoolsInstance } from '@q-dev/q-js-sdk/lib/contracts/tokeneconomics/ValidationRewardPoolsInstance';
import { Validator } from 'typings/validator';
import { fromWei, isAddress } from 'web3-utils';

import {
  getContractRegistryInstance,
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorMetricsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';
import { getBlockSealingAliasMap } from 'contracts/helpers/account-aliases-helper';

import { dateToUnix, formatDate, unixToDate } from 'utils/date';
import { captureError } from 'utils/errors';
import { calculateInterestRate, toBigNumber, transformToPercentage } from 'utils/numbers';

export async function getValidators (shortList: AddressWithBalance[]) {
  const util = await getValidatorMetricsInstance();
  await util.takeSnapshotFromNetwork(getContractRegistryInstance());

  const efficiency = await util.getDelegationEfficiency();
  const saturation = await util.getDelegationSaturation();

  return efficiency.map((validator, idx) => ({
    ...validator,
    ...shortList[idx],
    delegationSaturation: saturation[idx],
  } as Partial<Validator>));
}

export async function getValidator (
  validator: Validator,
  index: number,
  validatorsInstance: ValidatorsInstance,
  validationRewardPoolsInstance: ValidationRewardPoolsInstance
): Promise<Partial<Validator>> {
  const validatorInfo = await validatorsInstance.getValidatorInfo(validator.address);
  const poolInfo = await validationRewardPoolsInstance.getPoolInfo(validator.address);
  const selfStake = validatorInfo.selfStake;
  const delegatedStake = validatorInfo.delegatedStake;

  const delegatorShare = Number(transformToPercentage(poolInfo.delegatorsShare));
  const validatorShare = delegatorShare ? 100 - delegatorShare : 100;
  const validatorPoolBalance = fromWei(poolInfo.poolBalance);
  const poolinterestRate = calculateInterestRate(Number(poolInfo.interestRate));
  const totalStake = validator.balance;
  const payoutToDelegators = fromWei(toBigNumber(validator.payoutToDelegators).toFixed());
  const payoutPerDelegatedQ = fromWei(toBigNumber(validator.payoutPerDelegatedQ).toFixed());

  return {
    ...validator,
    payoutToDelegators,
    payoutPerDelegatedQ,
    rank: index + 1,
    totalStake,
    selfStake,
    delegatedStake,
    delegatorShare,
    validatorShare,
    validatorPoolBalance,
    poolinterestRate,
  };
}

export async function prepareValidatorsMonitoringData (
  indexer: Indexer,
  member: { address: string; balance: string | number }
) {
  const monitoringData = {
    lastBlock: 'n/a' as string | number,
    timestamp: '0',
    average: 'n/a',
    monthDayYear: 'n/a',
    lastBlockValidated: 'n/a',
  };

  try {
    // @ts-ignore FIXME: Fix SDK types
    const [validatorStats] = await indexer.getValidatorStats([member.address]);
    // @ts-ignore FIXME: Fix SDK types
    if (Number(validatorStats.lastBlockValidated) > 0) {
      // @ts-ignore FIXME: Fix SDK types
      monitoringData.average = validatorStats.lastAvailability + ' %';
      // @ts-ignore FIXME: Fix SDK types
      monitoringData.lastBlock = validatorStats.lastBlockValidated;
      // @ts-ignore FIXME: Fix SDK types
      monitoringData.timestamp = dateToUnix(validatorStats.lastBlockValidatedTime);
      monitoringData.monthDayYear = formatDate(unixToDate(monitoringData.timestamp));
    }

    return {
      ...monitoringData,
      address: member.address,
      amount: member.balance,
    };
  } catch (error) {
    captureError(error);
    return { ...monitoringData, address: member.address, amount: member.balance };
  }
}

export async function getAndCombineValidatorInfo (
  address: string,
  network: number,
  indexerUrl: string
): Promise<Partial<Validator>> {
  if (!isAddress(address)) return {};
  const indexer = await getIndexerInstance(indexerUrl);
  const validatorsInstance = await getValidatorsInstance();
  const validationRewardPoolsInstance = await getValidationRewardPoolsInstance();

  const shortList = await validatorsInstance.getShortList();
  const validatorRank = shortList.findIndex((val) => val.address === address);
  if (validatorRank === -1) return {};

  // @ts-ignore FIXME: Fix SDK types
  const inactiveValidators = await indexer.getInactiveValidators([address]);
  const isActiveValidator = inactiveValidators === 0;

  const validators = (await getValidators(shortList)) as Validator[];

  const aliasesMap = await getBlockSealingAliasMap([address] as never[], network) as { [address: string]: string };

  const ourValidator = validators.find((validator) => validator.address === address) as any;

  const validatorData = await getValidator(
    ourValidator,
    validatorRank,
    validatorsInstance,
    validationRewardPoolsInstance
  );

  const preparedValidatorsMonitoringData = await prepareValidatorsMonitoringData(indexer, { address, balance: '0' });

  const monotoringDataForValidator = [preparedValidatorsMonitoringData].map((member) => ({
    ...member,
    alias: aliasesMap[member.address],
  }))[0];

  return { isActiveValidator, ...validatorData, ...monotoringDataForValidator };
}
