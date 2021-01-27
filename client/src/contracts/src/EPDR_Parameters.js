import { drizzleRegistry, contracts, web3 } from '../config/drizzle-config';

export default class EPDR_Parameters {

  constructor() {
    this.contract = contracts['EPDR_Parameters'];
    this.contractName = 'EPDR_Parameters';
  }

  async getUint(key) {
    return await this.contract.methods.getUint(key)
      .call();
  }

}
