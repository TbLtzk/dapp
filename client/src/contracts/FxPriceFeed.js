/* eslint-disable max-classes-per-file */
import { drizzle } from './config/drizzle-config';

class FxPriceFeed {
  constructor() {
    this.methods = drizzle.contracts[this.constructor.name].methods;
  }

  async exchangeRate() {
    return await this.methods.exchangeRate().call();
  }
}

export class GovernedEpdrQethQusdOracle extends FxPriceFeed {
}

export class GovernedEpdrQbtcQusdOracle extends FxPriceFeed {
}
