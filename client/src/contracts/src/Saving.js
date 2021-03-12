/* eslint-disable max-classes-per-file */
import Web3 from 'web3';
import { contractsToAbi } from '../mapping/contract-to-abi';

const web3 = new Web3(Web3.givenProvider);
web3.eth.handleRevert = true;

export class SavingQUSD {
  constructor(address) {
    this.contractName = 'SavingQUSD';
    this.address = address;
    this.contract = new web3.eth.Contract(contractsToAbi[this.contractName], address);
    this.methods = this.contract.methods;
  }

  async usersSavings(address) {
    return await this.methods.usersSavings(address)
      .call();
  }

  async deposit(address, amount) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.deposit(amountL)
      .send({ from: address });
  }

  async withdraw(address, amount) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.withdraw(amountL)
      .send({ from: address });
  }

  async claim(address) {
    return await this.methods.claim()
      .send({ from: address });
  }

  async compoundRateKeeper() {
    return await this.methods.compoundRateKeeper()
      .call();
  }

  async getBalanceDetails() {
    return await this.methods.getBalanceDetails()
      .call();
  }

  async getBalance() {
    return await this.methods.getBalance()
      .call();
  }

  async updateCompoundRate(address) {
    return await this.methods.updateCompoundRate()
      .send({ from: address });
  }
}
