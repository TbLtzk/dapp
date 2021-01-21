import AuctionService from './AuctionService';

import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import { getStatusTransformation, maxApproveAmount, bn } from '../../handler/AuctionHandler';
import { StableCoinQUSD } from '../../StableCoin';
import { contractsToAddresses } from '../../mapping/contract-to-address';

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
    const StableCoin = new StableCoinQUSD();
    let allowance = await StableCoin.allowance(userAddress, contractsToAddresses.LiquidationAuction);
    console.log('allowance', allowance);
    if (allowance !== '115792089237316195423570985008687907853269984665640564039457.584007913129639935') {
      let approve = await StableCoin.approve(contractsToAddresses.LiquidationAuction, maxApproveAmount, userAddress);
      console.log('approve', approve);
    }
    // await StableCoin.approve('0xFef40e2286F2240843E55fE66F06c34e7d6Ae317', bid, userAddress);
    return await this.contract.methods.startAuction(
      data?.address, data['vault-id'], bn(drizzleRegistry.web3.utils.toWei(data?.bid)))
      .send({ from: userAddress });
  }
}
