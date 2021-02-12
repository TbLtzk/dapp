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

  async getLockedAssets(address) {
    return await this.methods.getLockedAssets(address)
      .call();
  }

  async deposit(address, amount, abandonClaims = true) {
    const amountL = toWei(amount);
    // return await this.methods.deposit(abandonClaims).send({
    return await this.methods.deposit()
      .send({
        from: address,
        value: amountL,
      });
  }

  async getLockInfo() {
    return await this.methods.getLockInfo().call();
  }

  async withdraw(address, amount, abandonClaims = true) {
    const amountL = toWei(amount);
    // return await this.methods.withdraw(amountL, abandonClaims)
    return await this.methods.withdraw(amountL)
      .send({ from: address });
  }

  async lock(address, amount, expiration) {
    const amountL = toWei(amount);
    return await this.methods.lock(amountL)
      .send({ from: address });
    // return await this.methods.lock(amountL, expiration).send({ from: address });
  }

  async unlock(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.unlock(amountL)
      .send({ from: address });
  }

  async extendExpiration(address, expiration) {
    return await this.methods.extendExpiration(expiration)
      .send({ from: address });
  }

  async claimQHolderReward(address, abandonClaims = true) {
    return await this.methods.claimQHolderReward(abandonClaims)
      .send({ from: address });
  }

  async delegateStake(address, delegateAddresses, stakes) {
    return await this.methods.delegateStake(delegateAddresses, stakes)
      .send({ from: address });
  }
}
