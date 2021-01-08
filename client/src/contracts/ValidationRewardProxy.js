import { contracts, drizzle } from './config/drizzle-config';

export default class ValidationRewardProxy {
  constructor() {
    this.methods = contracts['ValidationRewardProxy'].methods;
  }

  async allocate(address) {
    return await this.methods.allocate().send({ from: address });
  }
}
