import { contracts } from '../../config/config';

export default class ProxyService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  async allocate(userAddress) {
    return await this.contract.methods.allocate()
      .send({ from: userAddress });
  }
}
