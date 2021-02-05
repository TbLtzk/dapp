import AuctionService from './AuctionService';

import { getStatusTransformation, maxApproveAmount, bn } from '../../handler/AuctionHandler';
import { StableCoinQUSD } from '../../StableCoin';
import { contractsToAddresses } from '../../mapping/contract-to-address';
import { fromBtcBlockchain, toWei, fromWei } from 'func/balance';
import { max_allowance } from '../../../func/numbers';

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
   * get allowance
   * @param userAddress
   * @return string
   */
  async getAllowance(userAddress) {
    const StableCoin = new StableCoinQUSD();
    let allowance = await StableCoin.allowance(userAddress, contractsToAddresses.LiquidationAuction);
    console.log('allowance', allowance);
    if (allowance !== max_allowance) {
      let approve = await StableCoin.approve(contractsToAddresses.LiquidationAuction, maxApproveAmount, userAddress);
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
    // const StableCoin = new StableCoinQUSD();
    // let allowance = await StableCoin.allowance(userAddress, contractsToAddresses.LiquidationAuction);
    // console.log('allowance', allowance);
    // if (allowance !== '115792089237316195423570985008687907853269984665640564039457.584007913129639935') {
    //   let approve = await StableCoin.approve(contractsToAddresses.LiquidationAuction, maxApproveAmount, userAddress);
    //   console.log('approve', approve);
    // }
    await this.getAllowance(userAddress);
    // await StableCoin.approve('0xFef40e2286F2240843E55fE66F06c34e7d6Ae317', bid, userAddress);
    return await this.contract.methods.startAuction(
      data?.address, data['vault-id'], toWei(data?.bid))
      .send({ from: userAddress });
  }
}
