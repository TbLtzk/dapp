import AuctionService from './AuctionService';

import { contractsToAddresses } from '../../mapping/contract-to-address';
import { toWei, fromWei } from 'func/balance';
import { contracts } from '../../config/drizzle-config';

export default class SystemSurplusAuction extends AuctionService {

  constructor() {
    super();
    this.contract = contracts['SystemSurplusAuction'];
    this.contractName = 'SystemSurplusAuction';
  }

  async createAuction(data, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.SystemSurplusAuction, data?.bid);
    return await this.contract.methods.startAuction()
      .send({
        from: userAddress,
        value: toWei(data?.bid)
      });
  }

  async getAuctionData(promiseRes, inf) {
    let objRes = {};
    objRes.bidder = promiseRes.bidder;
    // objRes.user = inf?.bidder;
    objRes.user = inf?.bidder || inf?.user;
    objRes.id = inf.id;
    objRes.endTime = promiseRes.endTime;
    objRes.isExecuted = promiseRes.isExecuted;
    objRes.lot = fromWei(promiseRes.lot);
    const highestBid = promiseRes.highestBid;
    objRes.highestBid = fromWei(highestBid);
    objRes.title = `System Surplus Auction`;
    objRes.contract = this.contractName;
    return { ...objRes };

  }

  async getAuctions(activeAuction) {
    const auctionEvents = await this.getAuctionsEvent();
    const auctionInf = auctionEvents?.map(evt => {
      return {
        id: evt.returnValues._auctionId,
        bidder: evt.returnValues._bidder,
        bid: evt.returnValues._bid,
      };
    });

    let auctions = [];
    if (auctionInf) {
      for (let inf of auctionInf) {
        let objRes = {};
        let promiseRes = await this.getAuction(inf.id, null);
        if (activeAuction) {
          if (promiseRes && !promiseRes.isExecuted) {
            objRes = await this.getAuctionData(promiseRes, inf);
            auctions.push(objRes);
          }
        } else {
          if (promiseRes && promiseRes.isExecuted) {
            objRes = await this.getAuctionData(promiseRes, inf);
            auctions.push(objRes);
          }
        }
      }
    }
    return auctions;
  }

  async getOneAuction(inf, active) {
    if (inf.id) {
      let objRes = null;
      let promiseRes = await this.getAuction(inf.id, null);
      if (promiseRes) {
        objRes = await this.getAuctionData(promiseRes, inf);
      }
      return [objRes];
    }
  }

  async bid(auctionId, bid, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.SystemSurplusAuction, bid);
    const result = await this.contract.methods.bid(auctionId)
      .send(
        {
          from: userAddress,
          value: toWei(bid)
        });
    return result;
  }

  async execute(auctionId, userAddress) {
    const result = await this.contract.methods.execute(auctionId)
      .send(
        { from: userAddress });
    return result;
  }
}
