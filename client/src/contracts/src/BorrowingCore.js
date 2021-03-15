/* eslint-disable max-classes-per-file */
import Web3 from 'web3';

import { contractsToAbi } from '../mapping/contract-to-abi';

const web3 = new Web3(Web3.givenProvider);
web3.eth.handleRevert = true;

export class BorrowingCoreQUSD {
  constructor(address) {
    this.contractName = 'BorrowingCoreQUSD';
    this.address = address;
    this.contract = new web3.eth.Contract(contractsToAbi[this.contractName], address);
    this.methods = this.contract.methods;
  }

  async userVaultsCount(address) {
    return await this.methods.userVaultsCount(address)
        .call();
  }

  async userVaults(address, vaultNum) {
    return await this.methods.userVaults(address, vaultNum)
        .call();
  }

  async createVault(address, collateral) {
    return await this.methods.createVault(collateral)
        .send({from: address});
  }

  async depositCol(address, vaultId, amount) {
    return await this.methods.depositCol(vaultId, amount)
        .send({from: address});
  }

  async generateStc(address, vaultId, amount) {
    const amountL = new web3.utils.BN(amount);
    return await this.methods.generateStc(vaultId, amountL)
        .send({from: address});
  }

  async payBackSTC(address, vaultId, amount) {
    const amountL = new web3.utils.BN(amount);
    return await this.methods.payBackSTC(vaultId, amountL)
        .send({from: address});
  }

  async withdrawCol(address, vaultId, amount) {
    return await this.methods.withdrawCol(vaultId, amount)
        .send({from: address});
  }

  async balanceOf(address) {
    return await this.methods.balanceOf(address)
        .call();
  }

  async compoundRateKeeper(colKey) {
    return await this.methods.compoundRateKeeper(colKey)
        .call();
  }

  async getVaultStats(userAddress, vaultId) {
    return await this.methods.getVaultStats(userAddress, vaultId)
        .call();
  }

  async totalStcBackedByCol(userAddress) {
    return await this.methods.totalStcBackedByCol(userAddress)
        .call();
  }

  async updateCompoundRate(address, colKey) {
    return await this.methods.updateCompoundRate(colKey)
        .send({from: address});
  }
}
