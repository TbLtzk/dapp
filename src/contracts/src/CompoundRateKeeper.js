/* eslint-disable max-classes-per-file */
import { contracts } from '../config/config';

export default class CompoundRateKeeper {
  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  async getLastUpdate() {
    return await this.contract.methods.getLastUpdate()
      .call();
  }

  async getCurrentRate() {
    return await this.contract.methods.getCurrentRate()
      .call();
  }

  async update(address, interestRate) {
    return await this.contract.methods.update(interestRate)
      .send({ from: address });
  }
}
