import { contracts } from '../config/drizzle-config';
import { toWei } from '../../func/balance';

const contractName = 'QPiggyBank';

export default class QPiggyBank {
  constructor() {
    this.methods = contracts[contractName].methods;
  }

  async getUserBalance(address) {
    return await this.methods.getUserBalance(address)
      .call();
  }

  async deposit(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.deposit()
      .send({
        from: address,
        value: amountL,
      });
  }

  async getLockInfo(address) {
    return await this.methods.getLockInfo()
      .call({ from: address });
  }

  async getBalanceDetails() {
    return await this.methods.getBalanceDetails()
      .call();
  }

  async compoundRateKeeper() {
    return await this.methods.compoundRateKeeper()
      .call();
  }

  async updateCompoundRate(address) {
    return await this.methods.updateCompoundRate()
      .send({ from: address });
  }

  async withdraw(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.withdraw(amountL)
      .send({ from: address });
  }

  async lock(address, amount) {
    const amountL = toWei(amount);
    console.log(amount);
    return await this.methods.lock(amountL)
      .send({ from: address });
  }

  async unlock(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.unlock(amountL)
      .send({ from: address });
  }

  async delegateStake(address, delegateAddresses, stakes) {
    return await this.methods.delegateStake(delegateAddresses, stakes)
      .send({ from: address });
  }
}
