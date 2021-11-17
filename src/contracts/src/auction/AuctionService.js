import { contracts } from '../../config/config'
import { MAX_APPROVE_AMOUNT } from 'constants/numbers'

import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore'
import { StableCoinQUSD } from 'contracts/src/StableCoin'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'

export default class AuctionService {
  constructor (contractName) {
    this.contract = contracts[contractName]
    this.contractName = contractName
    this.borrowingContract = new BorrowingCoreQUSD(contractsToAddresses.BorrowingCoreQUSD)
    this.stableCoinUSD = new StableCoinQUSD()
  }

  async getAuctionsEvent () {
    const eventOptions = {
      fromBlock: 0,
      toBlock: 'latest'
    }
    const result = await this.contract.getPastEvents('AuctionStarted', eventOptions)
    return result
  }

  async getAuction (user, vaultId) {
    let result = null
    if (vaultId) {
      result = await this.contract.methods.auctions(user, vaultId).call()
    } else {
      result = await this.contract.methods.auctions(user).call()
    }
    return result
  }

  async getAuctionData (promiseRes, inf) {}

  async getAllowance (userAddress, contractAddress, value) {
    const allowance = await this.stableCoinUSD.allowance(userAddress, contractAddress)
    if (value) {
      if (Number(allowance) < Number(value)) {
        await this.stableCoinUSD.approve(contractAddress, MAX_APPROVE_AMOUNT, userAddress)
      }
    }
  }
}
