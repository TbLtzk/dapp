import { contracts } from '../config/config';

const contractName = 'ValidationRewardPools';

export default class ValidationRewardPools {
  constructor() {
    this.methods = contracts['ValidationRewardPools'].methods;
  }

  async getBalance(address) {
    return await this.methods.getBalance(address).call();
  }

  async getLastUpdateOfCompoundRate(validatorAddress) {
    return await this.methods.getLastUpdateOfCompoundRate(validatorAddress).call()
  }
}
