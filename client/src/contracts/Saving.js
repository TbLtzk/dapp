/* eslint-disable max-classes-per-file */
import { drizzle, web3 } from './config/drizzle-config';

class Saving {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
  }

  async usersSavings(address) {
    return await this.methods.usersSavings(address).call();
  }

  async deposit(address, amount) {
    const amountConv = web3.utils.toWei(new web3.utils.BN(amount));
    return await this.methods.deposit(web3.utils.toWei(new web3.utils.BN(amountConv))).send({ from: address });
  }

  async withdraw(address, amount) {
    const amountConv = web3.utils.toWei(new web3.utils.BN(amount));
    return await this.methods.withdraw(amountConv).send({ from: address });
  }

  async claim(address) {
    return await this.methods.claim().send({ from: address });
  }
}

export class SavingQUSD extends Saving {
}
