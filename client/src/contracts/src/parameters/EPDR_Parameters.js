import Web3 from 'web3';
import { contractsToAbi } from '../../mapping/contract-to-abi';

const web3 = new Web3(Web3.givenProvider);
web3.eth.handleRevert = true;

export default class EPDR_Parameters {

  constructor(address) {
    this.contractName = 'EPDR_Parameters';
    this.contract = new web3.eth.Contract(contractsToAbi[this.contractName], address)
  }

  async getAddrKeys() {
    return await this.contract.methods.getAddrKeys()
      .call();
  }

  async getUintKeys() {
    return await this.contract.methods.getUintKeys()
      .call();
  }

  //getAddress
  async getAddr(key) {
    return await this.contract.methods.getAddr(key)
      .call();
  }

  //getBoolean
  async getBool(key) {
    return await this.contract.methods.getBool(key)
      .call();
  }

  async getString(key) {
    return await this.contract.methods.getString(key)
      .call();
  }

  async getBytes(key) {
    return await this.contract.methods.getBytes32(key)
      .call();
  }

  async getUint(key) {
    return await this.contract.methods.getUint(key)
      .call();
  }

  async getStringKeys() {
    return await this.contract.methods.getStringKeys()
      .call();
  }

  async getBytes32Keys() {
    return await this.contract.methods.getBytes32Keys()
      .call();
  }

  async getBoolKeys() {
    return await this.contract.methods.getBoolKeys()
      .call();
  }
}
