import AuctionService from './AuctionService';

import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import { StableCoinQUSD } from '../../StableCoin';
import { contractsToAddresses } from '../../mapping/contract-to-address';
import { bn, maxApproveAmount } from '../../handler/AuctionHandler';

export default class SystemSurplusAuction extends AuctionService {

  /**
   * create auction
   * @param data
   * @param userAddress
   * @return string
   */
  async createAuction(data, userAddress) {
    const StableCoin = new StableCoinQUSD();
    let allowance = await StableCoin.allowance(userAddress, contractsToAddresses.SystemSurplusAuction);
    console.log('allowance', allowance);
    if (allowance !== '115792089237316195423570985008687907853269984665640564039457.584007913129639935') {
      let approve = await StableCoin.approve(contractsToAddresses.SystemSurplusAuction, maxApproveAmount, userAddress);
      console.log('approve', approve);
    }
    return await this.contract.methods.startAuction()
      .send({
        from: userAddress,
        value: bn(drizzleRegistry.web3.utils.toWei(data?.bid, 'ether'))
      });
  }

  /**
   * get proposal data
   * @param promiseRes
   * @param inf
   * @return array
   */
  async getAuctionData(promiseRes, inf) {
    let objRes = {};
    objRes.bidder = promiseRes.bidder;
    // objRes.user = inf?.bidder;
    objRes.user = inf?.bidder || inf?.user;
    objRes.id = inf.id;
    objRes.bid = drizzleRegistry.web3.utils.fromWei(inf.bid, 'ether');
    objRes.endTime = promiseRes.endTime;
    objRes.isExecuted = promiseRes.isExecuted;
    objRes.lot = promiseRes.lot;
    const highestBid = promiseRes.highestBid;
    objRes.highestBid = drizzleRegistry.web3.utils.fromWei(highestBid, 'ether');
    objRes.title = `System Surplus Auction`;
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
      // return {}
      return {
        id: evt.returnValues._auctionId,
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
    console.log('auctions', auctions);
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
      if (inf.id) {
        let objRes = null;
        let promiseRes = await this.getAuction(inf.id, null);
        if (promiseRes) {
          objRes = await this.getAuctionData(promiseRes, inf);
        }
        return [objRes];
      }
    } catch (e) {
      console.log(e);
    }

  }

  /**
   * bid for auction
   * @param auctionId
   * @param userAddress
   * @return array
   */
  async bid(auctionId, bid, userAddress) {
    console.log('auctionId', auctionId);
    console.log('userAddress', userAddress);
    const result = await this.contract.methods.bid(auctionId)
      .send(
        {
          from: userAddress,
          value: bn(drizzleRegistry.web3.utils.toWei(bid, 'ether'))
        });
    console.log('bid', result);
    return result;
  }

  /**
   * execute for auction
   * @param auctionId
   * @param userAddress
   * @return array
   */
  async execute(auctionId, userAddress) {
    console.log('execute');
    const result = await this.contract.methods.execute(auctionId)
      .send(
        { from: userAddress });
    return result;
  }
}
