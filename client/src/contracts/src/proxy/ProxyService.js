import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';

export default class ProxyService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  async allocate() {
    return await this.contract.methods.allocate().call();
  }
}
