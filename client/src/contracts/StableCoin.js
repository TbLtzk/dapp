/* eslint-disable max-classes-per-file */
import { drizzle, web3 } from './config/drizzle-config';

export class StableCoin {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
  }

  async balanceOf(address) {
    return await this.methods.balanceOf(address).call();
  }

  async approve(spender, amount) {
    return await this.methods.approve(spender, web3.utils.toWei(new web3.utils.BN(amount))).send({ from: spender });
  }
}
export class StableCoinQUSD extends StableCoin {
}

export class GovernedEpdrQethAddress extends StableCoin {
}

export class GovernedEpdrQbtcAddress extends StableCoin {
}
