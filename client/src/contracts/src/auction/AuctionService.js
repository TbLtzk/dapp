import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import {
  getPastEvents,
} from '../../handler/VotingHandler';
import { maxApproveAmount } from '../../handler/AuctionHandler';
import { BorrowingCoreQUSD } from '../../BorrowingCore';
import { StableCoinQUSD } from '../../StableCoin';

export default class AuctionService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
    this.borrowingContract = new BorrowingCoreQUSD();
    this.stableCoinUSD = new StableCoinQUSD();
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
   * get auction data
   * @param promiseRes
   * @param inf
   * @return array
   */
  async getAuctionData(promiseRes, inf) {
  }

  /**
   * get allowance
   * @param userAddress
   * @param contractAddress
   * @param value
   * @return string
   */
  async getAllowance(userAddress, contractAddress, value) {
    let allowance = await this.stableCoinUSD.allowance(userAddress, contractAddress);
    console.log('allowance', allowance);
    // console.log('value', value);
    if (value) {
      if (Number(allowance) < Number(value)) {
        // if (allowance !== max_allowance) {
        let approve = await this.stableCoinUSD.approve(contractAddress, maxApproveAmount, userAddress);
        console.log('approve', approve);
      }
    }
  }
}
