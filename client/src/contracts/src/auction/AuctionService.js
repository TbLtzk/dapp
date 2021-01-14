import { web3, contracts } from '../../config/drizzle-config';
import {
  getPastEvents,
} from '../../handler/AuctionHandler';

export default class AuctionService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  /**
   * get auction event
   * @return array
   */
  async getAuctionsEvent() {
    try {
      return await getPastEvents(web3, this.contract, 'AuctionStarted');
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get auction
   * @param id
   * @return array
   */
  async getAuction(id) {
    try {
      const result = await this.contract.methods.proposals(id)
        .call();
      return result;
    } catch (e) {
      console.log(e);
    }
  }

}
