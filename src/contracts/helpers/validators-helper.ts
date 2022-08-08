import { Indexer } from '@q-dev/q-js-sdk';
import { ValidatorsInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsInstance';
import { ValidationRewardPoolsInstance } from '@q-dev/q-js-sdk/lib/contracts/tokeneconomics/ValidationRewardPoolsInstance';

import { getContractRegistryInstance, getValidatorMetricsInstance } from 'contracts/contract-instance';

import { fromWei } from 'utils/balance';
import { convertToMonthDayYear, dateToTimestamp } from 'utils/convertDate';
import { captureError } from 'utils/errors';
import { transformToPercentage } from 'utils/formatters';
import { uintPerSecondToPerYearNumber } from 'utils/useful';

export const getValidators = async (validatorsInstance: ValidatorsInstance) => {
  const util = await getValidatorMetricsInstance();
  await util.takeSnapshotFromNetwork(getContractRegistryInstance());

  const efficiency = await util.getDelegationEfficiency();
  const saturation = await util.getDelegationSaturation();
  const validatorShortList = await validatorsInstance.instance.methods.getValidatorShortList().call();

  return efficiency.map((item, idx) => ({
    ...item,
    delegationSaturation: saturation[idx],
    ...validatorShortList[idx],
  }));
};

export const getValidator = async (
  validator: { validator: string },
  index: number,
  validatorsInstance: ValidatorsInstance,
  validationRewardPoolsInstance: ValidationRewardPoolsInstance
) => {
  const validatorInfo = await validatorsInstance.getValidatorInfo(validator.validator);
  const poolInfo = await validationRewardPoolsInstance.getPoolInfo(validator.validator);
  const selfStake = validatorInfo.selfStake;
  const delegatedStake = validatorInfo.delegatedStake;
  const delegatorShare = transformToPercentage(poolInfo.delegatorsShare);
  const validatorShare = delegatorShare ? 100 - Number(delegatorShare) : 100;
  const validatorPoolBalance = fromWei(poolInfo.poolBalance);
  const poolinterestRate = uintPerSecondToPerYearNumber(poolInfo.interestRate);

  return {
    ...validator,
    rank: index + 1,
    selfStake,
    delegatedStake,
    delegatorShare,
    validatorShare,
    validatorPoolBalance,
    poolinterestRate,
  };
};

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
      monitoringData.timestamp = dateToTimestamp(validatorStats.lastBlockValidatedTime);
      monitoringData.monthDayYear = convertToMonthDayYear(monitoringData.timestamp);
    }

    return {
      ...monitoringData,
      validator: member.address,
      amount: member.balance,
    };
  } catch (error) {
    captureError(error);
    return { ...monitoringData, validator: member.address, amount: member.balance };
  }
}
