/* eslint-disable max-classes-per-file */
import { contractsToAbi } from '../mapping/contract-to-abi'
import { contractsToAddressesBase } from '../mapping/contract-to-address'

export class ContractRegistry {
  constructor () {
    this.contractName = 'ContractRegistry'
    this.contract = new window.web3.eth.Contract(contractsToAbi.ContractRegistry, contractsToAddressesBase.ContractRegistry)
  }

  async getAddress (key) {
    return await this.contract.methods.getAddress(key)
      .call()
  }

  async getContracts () {
    return await this.contract.methods.getContracts()
      .call()
  }
}
