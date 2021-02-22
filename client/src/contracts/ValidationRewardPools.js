import { contracts } from './config/drizzle-config';

const contractName = 'ValidationRewardPools';

export default class ValidationRewardPools {
  constructor() {
    this.methods = contracts['ValidationRewardPools'].methods;
  }

  async getBalance(address) {
    console.log("getBalance", address);
    return await this.methods.getBalance(address).call();
  }
}
