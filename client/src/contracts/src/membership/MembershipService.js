import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';

export default class MembershipService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  async isMember(address) {
    return await this.contract.methods.isMember(address)
      .call();
  }
}
