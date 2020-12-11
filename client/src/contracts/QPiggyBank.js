import { QToWei } from 'func/balance';
import { drizzle } from './config/drizzle-config';

export default class QPiggyBank {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
  }

  async getUserBalance(address) {
    return await this.methods.getUserBalance(address).call();
  }

  async getLockedAssets(address) {
    return await this.methods.getLockedAssets(address).call();
  }

  async deposit(address, amountQ, abandonClaims = true) {
    return await this.methods.deposit(abandonClaims).send({
      from: address,
      value: String(QToWei(amountQ)),
    });
  }

  async withdraw(address, amountQ, abandonClaims = true) {
    return await this.methods.withdraw(String(QToWei(amountQ)), abandonClaims).send({
      from: address,
    });
  }

  async lock(address, amountQ, expiration) {
    return await this.methods.lock(String(QToWei(amountQ)), expiration).send({
      from: address,
    });
  }

  async unlock(address, amountQ) {
     return await this.methods.unlock(String(QToWei(amountQ))).send({
      from: address,
    });
  }

  async extendExpiration(address, expiration) {
     return await this.methods.extendExpiration(expiration).send({
      from: address,
    });
  }

  async claimQHolderReward(address, abandonClaims = true) {
     return await this.methods.claimQHolderReward(abandonClaims).send({
      from: address,
    });
  }
}
