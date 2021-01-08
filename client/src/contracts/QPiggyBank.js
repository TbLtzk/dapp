import { contracts, web3 } from './config/drizzle-config';

export default class QPiggyBank {
  constructor() {
    this.methods = contracts['QPiggyBank'].methods;
  }

  async getUserBalance(address) {
    return await this.methods.getUserBalance(address).call();
  }

  async getLockedAssets(address) {
    return await this.methods.getLockedAssets(address).call();
  }

  async deposit(address, amount, abandonClaims = true) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.deposit(abandonClaims).send({
      from: address,
      value: amountL,
    });
  }

  async withdraw(address, amount, abandonClaims = true) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.withdraw(amountL, abandonClaims).send({
      from: address,
    });
  }

  async lock(address, amount, expiration) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.lock(amountL, expiration).send({
      from: address,
    });
  }

  async unlock(address, amount) {
    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    return await this.methods.unlock(amountL).send({
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
