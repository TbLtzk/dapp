import { drizzleRegistry, contracts, web3 } from '../config/drizzle-config';
import { bn } from '../handler/AuctionHandler';

export default class SystemReserve {

  constructor() {
    this.contract = contracts['SystemReserve'];
    this.contractName = 'SystemReserve';
  }

  async availableAmount() {
    let value = await this.contract.methods.availableAmount()
      .call();
    value = bn(drizzleRegistry.web3.utils.fromWei(value, 'ether'));
    return value;
  }

}
