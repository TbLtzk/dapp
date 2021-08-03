import AuctionService from './AuctionService'

import { getPastAuctionsIds, getStatusTransformation } from '../../handler/AuctionHandler'
import { contractsToAddresses } from '../../mapping/contract-to-address'
import { fromBtcBlockchain, toWei, fromWei } from 'func/balance'

import { contracts } from '../../config/config'

export default class LiquidationAuction extends AuctionService {
  constructor () {
    super()
    this.contract = contracts.LiquidationAuction
    this.contractName = 'LiquidationAuction'
  }

  async getAuctionData (promiseRes, inf) {
    const result = await this.borrowingContract.userVaults(inf.user, inf.vaultId)
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
    objRes.contract = this.contractName
    return { ...objRes }
  }

  async createAuction (data, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.LiquidationAuction, data?.bid)
    return await this.contract.methods.startAuction(
      data?.address, data['vault-id'], toWei(data?.bid))
      .send({ from: userAddress })
  }

  async bid (user, vaultId, bid, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.LiquidationAuction, bid)
    const result = await this.contract.methods.bid(user, vaultId,
      toWei(bid))
      .send(
        { from: userAddress })
    return result
  }

  async execute (user, vaultId, userAddress) {
    const result = await this.contract.methods.execute(user, vaultId)
      .send(
        { from: userAddress })
    return result
  }

  async getAuctions (activeAuction) {
    const auctionEvents = await this.getAuctionsEvent()
    const auctionInf = getPastAuctionsIds(auctionEvents)
    const auctions = []
    if (auctionInf?.length > 0) {
      for (const inf of auctionInf) {
        let objRes = {}
        const promiseRes = await this.getAuction(inf?.user, inf?.vaultId)
        if (activeAuction) {
          if (promiseRes && promiseRes.status === '1') {
            objRes = await this.getAuctionData(promiseRes, inf)
            auctions.push(objRes)
          }
        } else {
          if (promiseRes && promiseRes.status !== '1') {
            objRes = await this.getAuctionData(promiseRes, inf)
            auctions.push(objRes)
          }
        }
      }
    }
    return auctions
  }

  async getOneAuction (inf, active) {
    if (inf.user && inf.vaultId) {
      let objRes = null
      const promiseRes = await this.getAuction(inf.user, inf.vaultId)
      if (promiseRes) {
        objRes = await this.getAuctionData(promiseRes, inf)
      }
      return [objRes]
    }
  }
}
