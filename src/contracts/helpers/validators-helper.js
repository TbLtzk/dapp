import { transformToPercentage } from './voting-helpers/base-voting-helper';

import { contractRegistryInstance, getValidatorMetricsInstance } from 'contracts/contract-instance';

import { fromWei } from 'func/balance';
import { convertToMonthDayYear, dateToTimestamp } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';
import { uintPerSecondToPerYearNumber } from 'func/useful';

export const getValidators = async (validatorsInstance) => {
  const util = await getValidatorMetricsInstance();
  await util.takeSnapshotFromNetwork(contractRegistryInstance);
  const efficiency = await util.getDelegationEfficiency();
  const saturation = await util.getDelegationSaturation();
  const validatorShortList = await validatorsInstance.instance.methods.getValidatorShortList().call();
  const validators = efficiency.map((item, idx) => ({
    ...item,
    delegationSaturation: saturation[idx],
    ...validatorShortList[idx]
  }));
  return validators;
};

export const getValidator = async (validator, index, validatorsInstance, validationRewardPoolsInstance) => {
  const validatorInfo = await validatorsInstance.getValidatorInfo(validator.validator);
  const poolInfo = await validationRewardPoolsInstance.getPoolInfo(validator.validator);
  const selfStake = validatorInfo.selfStake;
  const delegatedStake = validatorInfo.delegatedStake;
  const delegatorShare = transformToPercentage(poolInfo.delegatorsShare);
  const validatorShare = delegatorShare ? 100 - delegatorShare : 100;
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
    poolinterestRate
  };
};

export async function prepareValidatorsMonitoringData (indexer, member) {
  const monitoringData = {
    lastBlock: 'n/a',
    timestamp: 0,
    average: 'n/a',
    monthDayYear: 'n/a',
    lastBlockValidated: 'n/a'
  };

  try {
    const [validatorStats] = await indexer.getValidatorStats([member.address]);

    if (Number(validatorStats.lastBlockValidated) > 0) {
      monitoringData.average = validatorStats.lastAvailability + ' %';
      monitoringData.lastBlock = validatorStats.lastBlockValidated;
      monitoringData.timestamp = dateToTimestamp(validatorStats.lastBlockValidatedTime);
      monitoringData.monthDayYear = convertToMonthDayYear(monitoringData.timestamp);
    }

    return {
      ...monitoringData,
      validator: member.address,
      amount: member.balance
    };
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return { ...monitoringData, validator: member.address, amount: member.balance };
  }
}
