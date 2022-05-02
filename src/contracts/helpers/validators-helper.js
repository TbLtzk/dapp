import { getValidatorMetricsInstance, contractRegistryInstance } from 'contracts/contract-instance'
import { transformToPercentage } from './voting-helpers/base-voting-helper'
import { fromWei } from 'func/balance'
import { uintPerSecondToPerYearNumber } from 'func/useful'
import { dateToTimestamp } from 'func/convertDate'

export const getValidators = async (validatorsInstance) => {
  const util = await getValidatorMetricsInstance()
  await util.takeSnapshotFromNetwork(contractRegistryInstance)
  const efficiency = await util.getDelegationEfficiency()
  const saturation = await util.getDelegationSaturation()
  const validatorShortList = await validatorsInstance.instance.methods.getValidatorShortList().call()
  const validators = efficiency.map((item, idx) => ({
    ...item,
    delegationSaturation: saturation[idx],
    ...validatorShortList[idx]
  }))
  return validators
}

export const getValidator = async (validator, index, validatorsInstance, validationRewardPoolsInstance) => {
  const validatorInfo = await validatorsInstance.getValidatorInfo(validator.validator)
  const poolInfo = await validationRewardPoolsInstance.getPoolInfo(validator.validator)
  const selfStake = validatorInfo.selfStake
  const delegatedStake = validatorInfo.delegatedStake
  const delegatorShare = transformToPercentage(poolInfo.delegatorsShare)
  const validatorShare = delegatorShare ? 100 - delegatorShare : 100
  const validatorPoolBalance = fromWei(poolInfo.poolBalance)
  const poolinterestRate = uintPerSecondToPerYearNumber(poolInfo.interestRate)

  return {
    ...validator,
    rank: index + 1,
    selfStake,
    delegatedStake,
    delegatorShare,
    validatorShare,
    validatorPoolBalance,
    poolinterestRate
  }
}

export const prepareValidatorsMonitoringData = async (indexer, member) => {
  const [validatorStats] = await indexer.getValidatorStats([member.address])

  const timeStamp = !Number(validatorStats.lastBlockValidated)
    ? 'n/a'
    : dateToTimestamp(validatorStats.lastBlockValidatedTime)

  return { validator: member.address, amount: member.balance, ...validatorStats, timeStamp }
}
