import AuctionService from './AuctionService';

import { getPastAuctionsIds, getStatusTransformation } from '../../handler/AuctionHandler';
import { contractsToAddresses } from '../../mapping/contract-to-address';
import { fromBtcBlockchain, toWei, fromWei } from 'func/balance';

export default class LiquidationAuction extends AuctionService {

  /**
   * get proposal data
   * @param promiseRes
   * @param inf
   * @return array
   */
  async getAuctionData(promiseRes, inf) {
    console.log('user', inf.user);
    console.log('vaultId', inf.vaultId);
    const result = await this.borrowingContract.userVaults(inf.user, inf.vaultId);
    console.log('userVaults', result);
    let objRes = {};
    console.log('getAuctionData LiquidationAuction', promiseRes);
    objRes.status = getStatusTransformation(promiseRes.status);
    objRes.bidder = promiseRes.bidder;
    objRes.user = inf.user;
    objRes.userVaultId = inf.vaultId;
    objRes.colAsset = fromBtcBlockchain(result.colAsset);
    objRes.colKey = result.colKey;
    objRes.endTime = promiseRes.endTime;
    const highestBid = promiseRes.highestBid;
    objRes.highestBid = fromWei(highestBid);
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
    await this.getAllowance(userAddress, contractsToAddresses.LiquidationAuction, data?.bid);
    return await this.contract.methods.startAuction(
      data?.address, data['vault-id'], toWei(data?.bid))
      .send({ from: userAddress });
  }
  /**
   * bid for auction
   * @param user
   * @param vaultId
   * @param bid
   * @param userAddress
   * @return array
   */
  async bid(user, vaultId, bid, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.LiquidationAuction, bid);
    const result = await this.contract.methods.bid(user, vaultId,
      toWei(bid))
      .send(
        { from: userAddress });
    return result;
  }

  /**
   * execute for auction
   * @param user
   * @param vaultId
   * @param userAddress
   * @return array
   */
  async execute(user, vaultId, userAddress) {
    const result = await this.contract.methods.execute(user, vaultId)
      .send(
        { from: userAddress });
    return result;
  }

  /**
   * get active auctions
   * @param activeAuction
   * @return array
   */
  async getAuctions(activeAuction) {
    const auctionEvents = await this.getAuctionsEvent();
    const auctionInf = getPastAuctionsIds(auctionEvents);
    console.log('auctionEvents LiquidationAuction', auctionEvents);
    // console.log('auctionInf', auctionInf);
    let auctions = [];
    if (auctionInf?.length > 0) {
      for (let inf of auctionInf) {
        let objRes = {};
        let promiseRes = await this.getAuction(inf?.user, inf?.vaultId);
        // console.log('promiseRes', promiseRes);
        if (activeAuction) {
          if (promiseRes && promiseRes.status === '1') {
            objRes = await this.getAuctionData(promiseRes, inf);
            auctions.push(objRes);
          }
        } else {
          if (promiseRes && promiseRes.status !== '1') {
            objRes = await this.getAuctionData(promiseRes, inf);
            auctions.push(objRes);
          }
        }

      }
    }
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
      if (inf.user && inf.vaultId) {
        let objRes = null;
        let promiseRes = await this.getAuction(inf.user, inf.vaultId);
        if (promiseRes) {
          objRes = await this.getAuctionData(promiseRes, inf);
        }
        return [objRes];
      }
    } catch (e) {
      console.log(e);
    }

  }
}
