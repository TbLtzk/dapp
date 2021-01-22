import { contracts } from './config/drizzle-config';

const contractName = 'Validators';

export default class Validators {
  constructor() {
    this.methods = contracts[contractName].methods;
  }

  async withdrawals(address) {
    return await this.methods.withdrawals(address).call();
  }

  async validatorExist(address) {
    return await this.methods.validatorExist(address).call();
  }

  async getValidatorTotalStake(address) {
    return await this.methods.getValidatorTotalStake(address).call();
  }

  async getValidatorsOwnStake(address) {
    return await this.methods.getValidatorsOwnStake(address).call();
  }

  async getValidatorDelegatedStake(address) {
    return await this.methods.getValidatorDelegatedStake(address).call();
  }

  async getAccountableTotalStake(address) {
    return await this.methods.getAccountableTotalStake(address).call();
  }

  async getDelegatorsShare(address) {
    return await this.methods.getDelegatorsShare(address).call();
  }

  async getInterestRate(address) {
    return await this.methods.getInterestRate(address).call();
  }

  async setDelegatorsShare(address, uintPercent) {
    return await this.methods.setDelegatorsShare(uintPercent).send({ from: address });
  }

  async setInterestRate(address, uintPercent) {
    return await this.methods.setInterestRate(uintPercent).send({ from: address });
  }

  async commitCollateral(address, value) {
    return await this.methods.commitCollateral().send({ from: address, value });
  }

  async enterShortList(address) {
    return await this.methods.enterShortList().send({ from: address });
  }

  async getPositiveValidatorStake() {
    return await this.methods.getPositiveValidatorStake().call();
  }

  async announceWithdrawal(amount, address) {
    return await this.methods.announceWithdrawal(amount).send({ from: address });
  }

  async withdraw(amount, address) {
    return await this.methods.withdraw(amount, address).send({ from: address });
  }
}
