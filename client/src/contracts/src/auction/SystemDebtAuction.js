import AuctionService from './AuctionService';

import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import { StableCoinQUSD } from '../../StableCoin';
import { contractsToAddresses } from '../../mapping/contract-to-address';
import { bn, getStatusTransformation, maxApproveAmount } from '../../handler/AuctionHandler';

export default class SystemDebtAuction extends AuctionService {

  /**
   * get proposal data
   * @param promiseRes
   * @param inf
   * @return array
   */
  async getAuctionData(promiseRes, inf) {
    let objRes = {};
    console.log('promiseRes', promiseRes);
    objRes.status = getStatusTransformation(promiseRes.status);
    objRes.bidder = promiseRes.bidder;
    objRes.bid = inf.bid;
    objRes.endTime = promiseRes.endTime;
    const highestBid = promiseRes.highestBid;
    const reserveLot = promiseRes.reserveLot;
    objRes.highestBid = drizzleRegistry.web3.utils.fromWei(highestBid, 'ether');
    objRes.reserveLot = drizzleRegistry.web3.utils.fromWei(reserveLot, 'ether');
    objRes.title = `System Debt Auction`;
    objRes.contract = this.contractName;
    return { ...objRes };
  }

  /**
   * get active auctions
   * @param activeAuction
   * @return array
   */
  async getAuctions(activeAuction) {
    const auctionEvents = await this.getAuctionsEvent();
    const auctionInf = auctionEvents?.map(evt => {
      return {
        bidder: evt.returnValues._bidder,
        bid: evt.returnValues._bid,
      };
    });
    console.log('auctionEvents', auctionEvents);
    console.log('auctionInf', auctionInf);
    let auctions = [];
    if (auctionInf) {
      for (let inf of auctionInf) {
        let objRes = {};
        let promiseRes = await this.getAuction(1, null);
        // let promiseRes = await this.getAuction(inf.bidder, null);
        console.log('promiseRes', promiseRes);
        if (activeAuction) {
          objRes = await this.getAuctionData(promiseRes, inf);
          auctions.push(objRes);
        } else {
          objRes = await this.getAuctionData(promiseRes, inf);
          auctions.push(objRes);
        }
      }
    }
    console.log('AUCTIONS', auctions);
    return auctions;
  }

  /**
   * get one auction with data handling
   * @param inf
   * @param active
   * @return array
   */
  async getOneAuction(inf, active) {
    try {
      // if (inf.id) {
      let objRes = null;
      let promiseRes = await this.getAuction(1, null);
      // let promiseRes = await this.getAuction(inf.id, null);
      if (promiseRes) {
        objRes = await this.getAuctionData(promiseRes, inf);
      }
      return [objRes];
      // }
    } catch (e) {
      console.log(e);
    }

  }

  /**
   * create auction
   * @param data
   * @param userAddress
   * @return string
   */
  async createAuction(data, userAddress) {
    const StableCoin = new StableCoinQUSD();
    let allowance = await StableCoin.allowance(userAddress, contractsToAddresses.SystemDebtAuction);
    console.log('allowance', allowance);
    if (allowance !== '115792089237316195423570985008687907853269984665640564039457.584007913129639935') {
      let approve = await StableCoin.approve(contractsToAddresses.SystemDebtAuction, maxApproveAmount, userAddress);
      console.log('approve', approve);
    }
    return await this.contract.methods.startAuction(bn(drizzleRegistry.web3.utils.toWei(data?.bid, 'ether')))
      .send({ from: userAddress });
  }

  /**
   * bid for auction
   * @param bid
   * @param userAddress
   * @return array
   */
  async bid(bid, userAddress) {
    const result = await this.contract.methods.bid(
      bn(drizzleRegistry.web3.utils.toWei(bid, 'ether')))
      .send(
        { from: userAddress });
    return result;
  }

}
