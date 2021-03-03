import AuctionService from './AuctionService';

import { contractsToAddresses } from '../../mapping/contract-to-address';
import { getStatusTransformation } from '../../handler/AuctionHandler';
import { toWei, fromWei } from 'func/balance';

export default class SystemDebtAuction extends AuctionService {

  async getAuctionData(promiseRes, inf) {
    let objRes = {};
    console.log('promiseRes', promiseRes);
    objRes.status = getStatusTransformation(promiseRes.status);
    objRes.bidder = promiseRes.bidder;
    objRes.bid = inf.bid;
    objRes.endTime = promiseRes.endTime;
    const highestBid = promiseRes.highestBid;
    const reserveLot = promiseRes.reserveLot;
    objRes.highestBid = fromWei(highestBid);
    objRes.reserveLot = fromWei(reserveLot);
    objRes.title = `System Debt Auction`;
    objRes.contract = this.contractName;
    return { ...objRes };
  }

  async getAuctions(activeAuction) {
    const auctionEvents = await this.getAuctionsEvent();
    const auctionInf = auctionEvents?.map(evt => {
      return {
        bidder: evt.returnValues._bidder,
        bid: evt.returnValues._bid,
        id: evt.returnValues._auctionId,
      };
    });
    console.log('auctionEvents', auctionEvents);
    console.log('auctionInf', auctionInf);
    let auctions = [];
    if (auctionInf) {
      for (let inf of auctionInf) {
        let objRes = {};
        let promiseRes = await this.getAuction(inf.id, null);
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
      let promiseRes = await this.getAuction(2, null);
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
    await this.getAllowance(userAddress, contractsToAddresses.SystemDebtAuction, data?.bid);
    return await this.contract.methods.startAuction(toWei(data?.bid))
      .send({ from: userAddress });
  }

  /**
   * bid for auction
   * @param bid
   * @param userAddress
   * @return array
   */
  async bid(bid, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.SystemDebtAuction, bid);
    const result = await this.contract.methods.bid(
      toWei(bid))
      .send(
        { from: userAddress });
    return result;
  }

  /**
   * execute for auction
   * @param userAddress
   * @return array
   */
  async execute(userAddress) {
    const result = await this.contract.methods.execute()
      .send(
        { from: userAddress });
    return result;
  }
}
