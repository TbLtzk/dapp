import { drizzle } from './config/drizzle-config';

export default class ValidationRewardPools {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
  }

  async getBalance(address) {
    return await this.methods.getBalance(address).call();
  }
}
