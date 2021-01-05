import { drizzle } from './config/drizzle-config';

export default class ValidationRewardProxy {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
  }

  async allocate(address) {
    return await this.methods.allocate().send({ from: address });
  }
}
