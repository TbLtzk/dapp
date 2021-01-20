import AuctionService from './AuctionService';

import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import { getStatusTransformation } from '../../handler/AuctionHandler';

export default class LiquidationAuction extends AuctionService {

  /**
   * get proposal data
   * @param promiseRes
   * @param inf
   * @return array
   */
  async getAuctionData(promiseRes, inf) {
    let objRes = {};
    objRes.status = getStatusTransformation(promiseRes.status);
    objRes.bidder = promiseRes.bidder;
    objRes.user = inf.user;
    objRes.userVaultId = inf.vaultId;
    objRes.endTime = promiseRes.endTime;
    const highestBid = promiseRes.highestBid;
    objRes.highestBid = drizzleRegistry.web3.utils.fromWei(highestBid, 'ether');
    objRes.title = `Liquidation Auction`;
    objRes.contract = this.contractName;
    return { ...objRes };

  }

  /**
   * create auction
   * @param data
   * @param userAddress
   * @return string
   */
  async createAuction(data, userAddress) {
    // await StableCoin.approve('0xFef40e2286F2240843E55fE66F06c34e7d6Ae317', bid, userAddress);
    // const result = await drizzle.contracts.LiquidationAuction.methods.startAuction(
    //   '0xd10a97806b8FdFC8E4CC83a49f35CCF513F0a1f3', vaultId, bid)
    //   .send({ from: userAddress });
  }
}
