import { web3, contracts } from './config/drizzle-config';

const contractName = 'Validators';

export default class Validators {
  constructor() {
    this.methods = contracts['Validators'].methods;
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
    const valueL = new web3.utils.BN(web3.utils.toWei(value));
    return await this.methods.commitCollateral().send({ from: address, value: valueL });
  }

  async enterShortList(address) {
    return await this.methods.enterShortList().send({ from: address });
  }
}
