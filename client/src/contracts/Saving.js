/* eslint-disable max-classes-per-file */
import { drizzle, web3 } from './config/drizzle-config';
import { contractsToAddresses } from './mapping/contract-to-address';

class Saving {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
    this.address = contractsToAddresses[this.constructor.name];
  }

  async usersSavings(address) {
    return await this.methods.usersSavings(address).call();
  }

  async deposit(address, amount) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.deposit(amountL).send({ from: address });
  }

  async withdraw(address, amount) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.withdraw(amountL).send({ from: address });
  }

  async claim(address) {
    return await this.methods.claim().send({ from: address });
  }
}

export class SavingQUSD extends Saving {
}
