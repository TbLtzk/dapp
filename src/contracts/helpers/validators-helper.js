import {
  getValidatorsInstance,
  getValidationRewardPoolsInstance,
  getValidatorsContract,
  getValidatorMetricsInstance,
} from "contracts/contract-instance";
import { transformToPercentage } from "../handler/VotingHandler";
import { fromWei } from "func/balance";
import { uintPerSecondToPerYearNumber } from "func/useful";
import { contractRegistryInstance } from "contracts/contracts";

export const getAccountableTotalStakeFunction = async (address) => {
  const contract = await getValidatorsContract();
  return await contract.methods.getAccountableTotalStake(address).call();
};

export const getValidatorDelegatedStake = async (address) => {
  const contract = await getValidatorsContract();
  return await contract.methods.getValidatorDelegatedStake(address).call();
};

export const getMembersList = async () => {
  const validatorsInstance = await getValidatorsInstance();
  const validatorsArr = await validatorsInstance.instance.methods.getValidatorShortList().call();
  const delegationSaturationAndEfficiency = await getDelegationEfficiencyAndEfficiency()

  const validators = await mergeArrays(validatorsArr, delegationSaturationAndEfficiency);
  if (validatorsArr?.length === 0) {
    return [];
  } else {
    return await Promise.all(validators.map((i, index) => getValidator(i, index)));
  }
};

const mergeArrays = async (arr1, arr2) => {
  return arr1.map((obj, idx) => ({
    ...obj,
    ...arr2[idx],
  }));
};

const getDelegationEfficiencyAndEfficiency = async () => {
  const util = await getValidatorMetricsInstance();
  await util.takeSnapshotFromNetwork(contractRegistryInstance);
  const efficiency = await util.getDelegationEfficiency();
  const saturation = await util.getDelegationSaturation();
  return await efficiency.map((item, idx) => ({ ...item, delegationSaturation: saturation[idx] }));
};

const getValidator = async (validator, index) => {
  const validatorsInstance = await getValidatorsInstance();
  const validationRewardPoolsInstance = await getValidationRewardPoolsInstance();

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
    poolinterestRate,
  };
};
