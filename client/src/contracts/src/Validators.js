import { contracts } from '../config/drizzle-config';
import {
  transformToPercentage,
} from '../handler/VotingHandler';
import { fromWei } from 'func/balance';
import ValidationRewardPools from './ValidationRewardPools';

const contractName = 'Validators';

export default class Validators {
  constructor() {
    this.methods = contracts[contractName].methods;
    this.ValidationRewardPoolsContract = new ValidationRewardPools();
  }

  async withdrawals(address) {
    return await this.methods.withdrawals(address)
      .call();
  }

  async validatorExist(address) {
    return await this.methods.validatorExist(address)
      .call();
  }

  async getValidatorTotalStake(address) {
    return await this.methods.getValidatorTotalStake(address)
      .call();
  }

  async getValidatorsOwnStake(address) {
    return await this.methods.getValidatorsOwnStake(address)
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

  async getDelegatorsShare(address) {
    return await this.methods.getDelegatorsShare(address)
      .call();
  }

  async getInterestRate(address) {
    return await this.methods.getInterestRate(address)
      .call();
  }

  async setDelegatorsShare(address, uintPercent) {
    return await this.methods.setDelegatorsShare(uintPercent)
      .send({ from: address });
  }

  async setInterestRate(address, uintPercent) {
    return await this.methods.setInterestRate(uintPercent)
      .send({ from: address });
  }

  async commitCollateral(address, value) {
    return await this.methods.commitCollateral()
      .send({
        from: address,
        value
      });
  }

  async enterShortList(address) {
    return await this.methods.enterShortList()
      .send({ from: address });
  }

  async getPositiveValidatorStake() {
    return await this.methods.getPositiveValidatorStake()
      .call();
  }

  async announceWithdrawal(amount, address) {
    return await this.methods.announceWithdrawal(amount)
      .send({ from: address });
  }

  async withdraw(amount, address) {
    return await this.methods.withdraw(amount, address)
      .send({ from: address });
  }

  async getMembersList() {
    const validatorsArr = await this.methods.getPositiveValidatorStake()
      .call();

    if (validatorsArr?.length === 0) {
      return [];
    } else {
      let resultArr = [];
      let count = 1;
      for (let member of validatorsArr) {
        const selfStake = fromWei(await this.methods.getValidatorsOwnStake(member.validator)
          .call());
        const poolPayoutRatio = transformToPercentage(await this.methods.getInterestRate(member.validator)
          .call());
        const delegatedStake = fromWei(await this.methods.getValidatorDelegatedStake(member.validator)
          .call());
        const delegatorShare = transformToPercentage(await this.methods.getDelegatorsShare(member.validator)
          .call());
        const validatorShare = delegatorShare ? 100 - delegatorShare : 0;
        const validatorPoolBalance = fromWei(await this.ValidationRewardPoolsContract.getBalance(member.validator));

        resultArr.push({
          ...member,
          delegatedStake,
          delegatorShare,
          validatorShare,
          selfStake,
          validatorPoolBalance,
          poolPayoutRatio,
          rank: count
        });
        count ++;
      }
      return resultArr;
    }

  }

}
