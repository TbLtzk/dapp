import { contracts } from '../../config/drizzle-config';
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

  async getAuctionsEvent() {
    return await getPastEvents(this.contract, 'AuctionStarted');
  }

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

  async getAuctionData(promiseRes, inf) {
  }

  async getAllowance(userAddress, contractAddress, value) {
    let allowance = await this.stableCoinUSD.allowance(userAddress, contractAddress);
    if (value) {
      if (Number(allowance) < Number(value)) {
        let approve = await this.stableCoinUSD.approve(contractAddress, maxApproveAmount, userAddress);
      }
    }
  }
}
