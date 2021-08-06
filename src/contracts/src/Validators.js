import { contracts } from '../config/config'
import { errorHanlder } from 'func/useful.js'

import ValidationRewardPools from './ValidationRewardPools'
import QVault from './QVault'

import {
  transformToPercentage
} from '../handler/VotingHandler'
import { fromWei } from 'func/balance'
import { uintPerSecondToPerYearNumber } from '../../func/useful'
import { contractsToAddresses } from '../mapping/contract-to-address'
import { validatorsInstance, validationRewardPoolsInstance } from 'contracts/contracts'

const contractName = 'Validators'

const array = [
  {
    id: 1,
    amount: '10',
    startDate: '13.07.21 21:30:33',
    endDate: '16.07.21 21:30:33'
  },
  {
    id: 2,
    amount: '103',
    startDate: '13.07.21 21:30:33',
    endDate: '16.07.21 21:30:33'
  }
]

export default class Validators {
  constructor () {
    this.methods = contracts[contractName].methods
    this.ValidationRewardPoolsContract = new ValidationRewardPools()
    this.QVault = new QVault(contractsToAddresses.QVault)
  }

  async getValidatorsList () {
    return await this.methods.getValidatorsList()
      .call()
  }

  async getValidatorTotalStake (address) {
    return await this.methods.getValidatorTotalStake(address)
      .call()
  }

  async getValidatorDelegatedStake (address) {
    return await this.methods.getValidatorDelegatedStake(address)
      .call()
  }

  async getAccountableTotalStake (address) {
    return await this.methods.getAccountableTotalStake(address)
      .call()
  }

  async enterShortList (address) {
    return await errorHanlder(this.methods.enterShortList()
      .send({ from: address }))
  }

  async announceWithdrawal (amount, address) {
    return await errorHanlder(this.methods.announceWithdrawal(amount)
      .send({ from: address }))
  }

  async withdraw (amount, address) {
    return await errorHanlder(this.methods.withdraw(amount, address)
      .send({ from: address }))
  }

  async getTimeLockedAmounts (address) {
    return array // `function getTimeLocks(address _account)`
  }

  async getMinimumLockedAmount (address) {
    const res = {
      amount: '91000000000000000000',
      releaseStart: '1626872970',
      releaseEnd: '1627000000'
    }
    return await res
  }

  async getValidator (validator, index) {
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

  async getMembersList () {
    const validatorsArr = await validatorsInstance.instance.methods.getValidatorShortList()
      .call()

    if (validatorsArr?.length === 0) {
      return []
    } else {
      return await Promise.all(validatorsArr.map((i, index) => this.getValidator(i, index)))
    }
  }
}
