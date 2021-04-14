import { contracts } from '../../config/config';

export default class MembershipService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  async isMember(address) {
    return await this.contract.methods.isMember(address)
      .call();
  }

  async getMembers() {
    return await this.contract.methods.getMembers()
      .call();
  }
}
