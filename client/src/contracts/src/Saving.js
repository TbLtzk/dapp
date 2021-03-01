/* eslint-disable max-classes-per-file */
import { contracts, web3 } from '../config/drizzle-config';
import { contractsToAddresses } from '../mapping/contract-to-address';
import { toWei } from '../../func/balance';

class Saving {
  constructor() {
    this.methods = {};
    this.address = '';
  }

  async usersSavings(address) {
    return await this.methods.usersSavings(address)
      .call();
  }

  async deposit(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.deposit(amountL)
      .send({ from: address });
  }

  async withdraw(address, amount) {
    const amountL = toWei(amount);
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

export class SavingQUSD extends Saving {
  constructor() {
    super();
    this.methods = contracts['SavingQUSD'].methods;
    this.address = contractsToAddresses['SavingQUSD'];
  }
}
