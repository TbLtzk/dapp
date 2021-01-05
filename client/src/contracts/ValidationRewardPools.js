import { contracts } from './config/drizzle-config';

export default class ValidationRewardPools {
  constructor() {
    this.methods = contracts[this.constructor.name].methods;
  }

  async getBalance(address) {
    return await this.methods.getBalance(address).call();
  }
}
