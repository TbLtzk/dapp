import { AddressWithBalance, Indexer } from '@q-dev/q-js-sdk';
import { ValidatorsInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsInstance';
import { ValidationRewardPoolsInstance } from '@q-dev/q-js-sdk/lib/contracts/tokeneconomics/ValidationRewardPoolsInstance';
import { Validator, ValidatorMonitoring } from 'typings/validator';
import { fromWei } from 'web3-utils';

import {
  getContractRegistryInstance,
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorMetricsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';
import { getBlockSealingAliasMap } from 'contracts/helpers/aliases-helper';

import { dateToUnix, formatDate, unixToDate } from 'utils/date';
import { captureError } from 'utils/errors';
import { calculateInterestRate, toBigNumber, transformToPercentage } from 'utils/numbers';
import { isAddress } from 'utils/strings';

export async function getValidators (shortList: AddressWithBalance[]) {
  const util = await getValidatorMetricsInstance();
  await util.takeSnapshotFromNetwork(getContractRegistryInstance());

  const efficiency = await util.getDelegationEfficiency();
  const saturation = await util.getDelegationSaturation();

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
  const validatorInfo = await validatorsInstance.getValidatorInfo(validator.address);
  const poolInfo = await validationRewardPoolsInstance.getPoolInfo(validator.address);
  const delegatorsShare = Number(transformToPercentage(poolInfo.delegatorsShare)) || 0;

  return {
    ...validator,
    rank: index + 1,
    totalStake: validator.balance,
    selfStake: validatorInfo.selfStake,
    delegatedStake: validatorInfo.delegatedStake,
    delegatorsShare,
    validatorShare: 100 - delegatorsShare,
    validatorPoolBalance: fromWei(poolInfo.poolBalance),
    poolinterestRate: calculateInterestRate(Number(poolInfo.interestRate)),
    payoutToDelegators: fromWei(toBigNumber(validator.payoutToDelegators).toFixed()),
    payoutPerDelegatedQ: fromWei(toBigNumber(validator.payoutPerDelegatedQ).toFixed()),
  };
}

export async function prepareValidatorsMonitoringData (
  indexer: Indexer,
  member: { address: string; balance: string | number }
): Promise<ValidatorMonitoring> {
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

  const validators = await getValidators(shortList);
  const aliasesMap = await getBlockSealingAliasMap([address], network);
  const ourValidator = validators.find((validator) => validator.address === address);

  const validatorData = await getValidator(
    ourValidator as Validator,
    validatorRank,
    validatorsInstance,
    validationRewardPoolsInstance
  );

  const preparedValidatorsMonitoringData = await prepareValidatorsMonitoringData(indexer, { address, balance: '0' });

  const monotoringDataForValidator = [preparedValidatorsMonitoringData].map((member) => ({
    ...member,
    alias: aliasesMap[member.address],
  }))[0];

  return { ...validatorData, ...monotoringDataForValidator, isActiveValidator };
}
