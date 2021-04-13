import { contracts } from '../config/drizzle-config';

import ValidationRewardPools from './ValidationRewardPools';
import QPiggyBank from './QPiggyBank';

import {
  transformToPercentage,
} from '../handler/VotingHandler';
import { fromWei } from 'func/balance';
import { uintPerSecondToPerYearNumber } from '../../func/useful';
import { contractsToAddresses } from '../mapping/contract-to-address';
import { validatorsInstance, validationRewardPoolsInstance } from 'contracts/contracts';

const contractName = 'Validators';

export default class Validators {
  constructor() {
    this.methods = contracts[contractName].methods;
    this.ValidationRewardPoolsContract = new ValidationRewardPools();
    this.QPiggyBank = new QPiggyBank(contractsToAddresses['QVault']);
  }

  async getValidatorsList() {
    return await this.methods.getValidatorsList()
      .call();
  }

  async getValidatorTotalStake(address) {
    return await this.methods.getValidatorTotalStake(address)
      .call();
  }

  async getValidatorDelegatedStake(address) {
    return await this.methods.getValidatorDelegatedStake(address)
      .call();
  }

  async getAccountableTotalStake(address) {
    return await this.methods.getAccountableTotalStake(address)
      .call();
  }

  async enterShortList(address) {
    return await this.methods.enterShortList()
      .send({ from: address });
  }

  async announceWithdrawal(amount, address) {
    return await this.methods.announceWithdrawal(amount)
      .send({ from: address });
  }

  async withdraw(amount, address) {
    return await this.methods.withdraw(amount, address)
      .send({ from: address });
  }

  async getValidator (validator, index) {

    const additionalData = await Promise.all([
      validatorsInstance.getValidatorTotalStake(validator.validator),
      validationRewardPoolsInstance.getInterestRate(validator.validator),
      this.getValidatorDelegatedStake(validator.validator),
      validationRewardPoolsInstance.getDelegatorsShare(validator.validator),
      this.ValidationRewardPoolsContract.getBalance(validator.validator)
    ])

    const selfStake = fromWei(additionalData[0]);
    const poolPayoutRatio = uintPerSecondToPerYearNumber(additionalData[1]);
    const delegatedStake = fromWei(additionalData[2]);
    const delegatorShare = transformToPercentage(additionalData[3]);
    const validatorShare = delegatorShare ? 100 - delegatorShare : 0;
    const validatorPoolBalance = fromWei(additionalData[4]);
    return {
      ...validator,
      delegatedStake,
      delegatorShare,
      validatorShare,
      selfStake,
      validatorPoolBalance,
      poolPayoutRatio,
      rank: index + 1
    }
  }

  async getMembersList() {
    const validatorsArr = await validatorsInstance.instance.methods.getValidatorShortList()
      .call();

    if (validatorsArr?.length === 0) {
      return [];
    } else {
      return await Promise.all(validatorsArr.map((i, index) => this.getValidator(i, index)));
    }

  }
}
