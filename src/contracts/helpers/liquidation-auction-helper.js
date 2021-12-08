import AuctionService from './auction-service-helper'
import { CONTRACT_TYPES } from 'constants/contracts'

import { getPastAuctionsIds, getStatusTransformation } from './auction-helper'
import { fromBtcBlockchain, toWei, fromWei } from 'func/balance'

import { getBorrowingCoreInstance, getLiquidationAuctionInstance } from 'contracts/contract-instance'

export default class LiquidationAuction extends AuctionService {
  constructor () {
    super()
    this.contractName = CONTRACT_TYPES.liquidationAuction
  }

  async getAuctionData (promiseRes, inf) {
    const contract = await getBorrowingCoreInstance()
    const result = await contract.userVaults(inf.user, inf.vaultId)

    const objRes = {}
    objRes.status = getStatusTransformation(promiseRes.status)
    objRes.bidder = promiseRes.bidder
    objRes.user = inf.user
    objRes.userVaultId = inf.vaultId
    objRes.colAsset = fromBtcBlockchain(result.colAsset)
    objRes.colKey = result.colKey
    objRes.endTime = promiseRes.endTime
    const highestBid = promiseRes.highestBid
    objRes.highestBid = fromWei(highestBid)
    objRes.title = 'Liquidation Auction'
    objRes.contract = CONTRACT_TYPES.liquidationAuction
    return { ...objRes }
  }

  async createAuction (data, userAddress) {
    const contract = await getLiquidationAuctionInstance()
    await this.getAllowance(userAddress, contract.address, data?.bid)
    return await contract.startAuction(data?.address, data['vault-id'], toWei(data?.bid), { from: userAddress })
  }

  async bid (user, vaultId, bid, userAddress) {
    const contract = await getLiquidationAuctionInstance()
    await this.getAllowance(userAddress, contract.address, bid)
    const result = await contract.bid(user, vaultId, toWei(bid), { from: userAddress })
    return result
  }

  async execute (user, vaultId, userAddress) {
    const contract = await getLiquidationAuctionInstance()
    const result = await contract.execute(user, vaultId, { from: userAddress })
    return result
  }

  async getAuctions (activeAuction) {
    const auctionEvents = await this.getAuctionsEvent()
    const auctionInf = getPastAuctionsIds(auctionEvents)

    if (auctionInf?.length > 0) {
      const auctions = await Promise.all(auctionInf.map((inf) => this.getAuction(inf, inf?.vaultId)))

      if (activeAuction) {
        const active = auctions.filter((proposal) => proposal.data.status === '1')
        return await Promise.all(active.map((auction) => this.getAuctionData(auction.data, auction.inf)))
      } else {
        const ended = auctions.filter((auction) => auction.data.status !== '1')
        return await Promise.all(ended.map((auction) => this.getAuctionData(auction.data, auction.inf)))
      }
    }
    return []
  }

  async getOneAuction (inf, active) {
    if (inf.user && inf.vaultId) {
      const promiseRes = await this.getOneAuctionData(inf.user, inf.vaultId)
      const result = await this.getAuctionData(promiseRes, inf)
      return [result]
    }
  }
}
