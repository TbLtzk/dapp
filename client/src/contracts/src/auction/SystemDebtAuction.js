import AuctionService from './AuctionService';

import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import { StableCoinQUSD } from '../../StableCoin';
import { contractsToAddresses } from '../../mapping/contract-to-address';
import { bn, getStatusTransformation, maxApproveAmount } from '../../handler/AuctionHandler';

export default class SystemDebtAuction extends AuctionService {

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
    return await this.contract.methods.startAuction(bn(drizzleRegistry.web3.utils.toWei(data?.bid)))
      .send({ from: userAddress });
  }

}
