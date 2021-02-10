import { contracts } from '../config/drizzle-config';
import { fromWei } from 'func/balance';

export default class SystemReserve {

  constructor() {
    this.contract = contracts['SystemReserve'];
  }

  async availableAmount() {
    let value = await this.contract.methods.availableAmount()
      .call();
    value = fromWei(value);
    return value;
  }

}
