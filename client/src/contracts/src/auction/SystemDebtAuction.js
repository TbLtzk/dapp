import AuctionService from './AuctionService';

import { StableCoinQUSD } from '../../StableCoin';
import { contractsToAddresses } from '../../mapping/contract-to-address';
import { bn, getStatusTransformation, maxApproveAmount } from '../../handler/AuctionHandler';
import { toWei, fromWei } from 'func/balance';

export const max_allowance_auction = '115792089237316195423570985008687907853269984665640564039447.584007913129639935';

export default class SystemDebtAuction extends AuctionService {

  /**
   * get auction data
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
    objRes.highestBid = fromWei(highestBid);
    objRes.reserveLot = fromWei(reserveLot);
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
        let promiseRes = await this.getAuction(2, null);
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
   * get allowance
   * @param userAddress
   * @return string
   */
  async getAllowance(userAddress) {
    const StableCoin = new StableCoinQUSD();
    let allowance = await StableCoin.allowance(userAddress, contractsToAddresses.SystemDebtAuction);
    console.log('allowance', allowance);
    if (allowance !== max_allowance_auction) {
      let approve = await StableCoin.approve(contractsToAddresses.SystemDebtAuction, maxApproveAmount, userAddress);
      console.log('approve', approve);
    }
  }

  /**
   * create auction
   * @param data
   * @param userAddress
   * @return string
   */
  async createAuction(data, userAddress) {
    await this.getAllowance(userAddress);
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
    await this.getAllowance(userAddress);
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
