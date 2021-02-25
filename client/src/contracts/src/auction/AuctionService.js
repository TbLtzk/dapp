import { web3, contracts, drizzleRegistry } from '../../config/drizzle-config';
import {
  getPastEvents,
} from '../../handler/VotingHandler';
import { maxApproveAmount } from '../../handler/AuctionHandler';
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { StableCoinQUSD } from 'contracts/src/StableCoin';

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
    return await getPastEvents(this.contract, 'AuctionStarted');
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
    if (value) {
      if (Number(allowance) < Number(value)) {
        let approve = await this.stableCoinUSD.approve(contractAddress, maxApproveAmount, userAddress);
      }
    }
  }
}
