import { drizzleRegistry, contracts } from '../config/drizzle-config';

export default class DefaultAllocationProxy {

  constructor() {
    this.contract = contracts['DefaultAllocationProxy'];
    this.contractName = 'DefaultAllocationProxy';
  }

  async allocate() {
    return await this.contract.methods.allocate()
      .call();
  }

}
