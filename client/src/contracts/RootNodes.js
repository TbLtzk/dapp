import { drizzle, web3 } from './config/drizzle-config';

export default class RootNodes {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
  }

  async getMembers() {
    return await this.methods.getMembers().call();
  }

  async addMember(address) {
    return await this.methods.addMember(address).send({ from: address });
  }

  async announceWithdrawal(address, amount) {
    const amountConv = web3.utils.toWei(new web3.utils.BN(amount));
    return await this.methods.announceWithdrawal(amountConv).send({ from: address });
  }
}
