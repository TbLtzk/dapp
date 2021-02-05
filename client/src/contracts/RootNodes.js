import { contracts, web3 } from './config/drizzle-config';
import { toWei } from 'func/balance';

export default class RootNodes {
  constructor() {
    this.methods = contracts['RootNodes'].methods;
  }

  async getMembers() {
    return await this.methods.getMembers()
      .call();
  }

  async addMember(address) {
    return await this.methods.addMember(address)
      .send({ from: address });
  }

  async announceWithdrawal(address, amount) {
    const amountConv = toWei(amount);
    return await this.methods.announceWithdrawal(amountConv)
      .send({ from: address });
  }
}
