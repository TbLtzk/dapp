import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import {
  getPastEvents,
} from '../../handler/VotingHandler';
import { bn, getPastAuctionsIds } from '../../handler/AuctionHandler';

export default class AuctionService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;

  }

  /**
   * get auctions event
   * @return array
   */
  async getAuctionsEvent() {
    return await getPastEvents(drizzleRegistry, this.contract, 'AuctionStarted');

  }

  /**
   * get auction
   * @param user
   * @param vaultId
   * @return array
   */
  async getAuction(user, vaultId) {
    let result = null;
    if (vaultId) {
      result = await this.contract.methods.auctions(user, vaultId)
        .call();
    } else {
      result = await this.contract.methods.auctions(user)
        .call();
    }

    return result;

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
    const result = await this.contract.methods.bid(user, vaultId,
      bn(drizzleRegistry.web3.utils.toWei(bid, 'ether')))
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
    console.log('auctionEvents', auctionEvents);
    console.log('auctionInf', auctionInf);
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
   * get auction data
   * @param promiseRes
   * @param inf
   * @return array
   */
  async getAuctionData(promiseRes, inf) {
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
