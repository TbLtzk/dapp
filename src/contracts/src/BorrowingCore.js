/* eslint-disable max-classes-per-file */
import { contractsToAbi } from '../mapping/contract-to-abi'

export class BorrowingCoreQUSD {
  constructor (address) {
    this.contractName = 'BorrowingCoreQUSD'
    this.address = address
    this.contract = new window.web3.eth.Contract(contractsToAbi[this.contractName], address)
    this.methods = this.contract.methods
  }

  async userVaultsCount (address) {
    return await this.methods.userVaultsCount(address)
      .call()
  }

  async userVaults (address, vaultNum) {
    return await this.methods.userVaults(address, vaultNum)
      .call()
  }

  async createVault (address, collateral) {
    return await this.methods.createVault(collateral)
      .send({ from: address })
  }

  async depositCol (address, vaultId, amount) {
    return await this.methods.depositCol(vaultId, amount)
      .send({ from: address })
  }

  async generateStc (address, vaultId, amountL) {
    return await this.methods.generateStc(vaultId, amountL)
      .send({ from: address })
  }

  async payBackStc (address, vaultId, amountL) {
    return await this.methods.payBackStc(vaultId, amountL)
      .send({ from: address })
  }

  async withdrawCol (address, vaultId, amount) {
    return await this.methods.withdrawCol(vaultId, amount)
      .send({ from: address })
  }

  async balanceOf (address) {
    return await this.methods.balanceOf(address)
      .call()
  }

  async compoundRateKeeper (colKey) {
    return await this.methods.compoundRateKeeper(colKey)
      .call()
  }

  async getVaultStats (userAddress, vaultId) {
    return await this.methods.getVaultStats(userAddress, vaultId)
      .call()
  }

  async totalStcBackedByCol (userAddress) {
    return await this.methods.totalStcBackedByCol(userAddress)
      .call()
  }

  async updateCompoundRate (address, colKey) {
    return await this.methods.updateCompoundRate(colKey)
      .send({ from: address })
  }
}
