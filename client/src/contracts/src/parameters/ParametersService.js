import { contracts } from '../../config/drizzle-config';

export default class ParametersService {
  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  async getAddrKeys() {
    return await this.contract.methods.getAddrKeys().call();
  }

  async getUintKeys() {
    return await this.contract.methods.getUintKeys().call();
  }

  //getAddress
  async getAddr(key) {
    return await this.contract.methods.getAddr(key).call();
  }

  //getBoolean
  async getBool(key) {
    return await this.contract.methods.getBool(key).call();
  }

  async getString(key) {
    return await this.contract.methods.getString(key).call();
  }

  async getBytes(key) {
    return await this.contract.methods.getBytes32(key).call();
  }

  async getUint(key) {
    return await this.contract.methods.getUint(key).call();
  }
}
