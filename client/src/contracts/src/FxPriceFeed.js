/* eslint-disable max-classes-per-file */
import { contracts } from '../config/drizzle-config';

class FxPriceFeed {
  constructor() {
    this.methods = '';
  }

  async exchangeRate() {
    return await this.methods.exchangeRate().call();
  }
}

export class GovernedEpdrQethQusdOracle extends FxPriceFeed {
  constructor() {
    super();
    this.methods = contracts['GovernedEpdrQethQusdOracle'].methods;
  }
}

export class GovernedEpdrQbtcQusdOracle extends FxPriceFeed {
  constructor() {
    super();
    this.methods = contracts['GovernedEpdrQbtcQusdOracle'].methods;
  }
}
