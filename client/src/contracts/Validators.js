import { drizzle, web3 } from './config/drizzle-config';

export default class Validators {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
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
    console.log(uintPercent);
    return await this.methods.setDelegatorsShare(new web3.utils.BN(uintPercent)).send({ from: address });
  }

  async setInterestRate(address, uintPercent) {
    return await this.methods.setInterestRate(new web3.utils.BN(uintPercent)).send({ from: address });
  }
}
