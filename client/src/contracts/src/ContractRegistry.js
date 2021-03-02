/* eslint-disable max-classes-per-file */
import Web3 from 'web3';

import { contractsToAbi } from '../mapping/contract-to-abi';
import { contractsToAddressesBase } from '../mapping/contract-to-address';

const web3 = new Web3(Web3.givenProvider);
web3.eth.handleRevert = true;
web3.eth.handleRevert = true;

export class ContractRegistry {
  constructor() {
    this.contractName = 'ContractRegistry';
    this.contract = new web3.eth.Contract(contractsToAbi.ContractRegistry, contractsToAddressesBase.ContractRegistry)
  }

  async getAddress(key) {
    return await this.contract.methods.getAddress(key)
      .call();
  }
}
