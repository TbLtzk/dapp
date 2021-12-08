import AuctionService from './auction-service-helper'
import { CONTRACT_TYPES } from 'constants/contracts'

import { fromWei } from 'func/balance'
import { getSystemSurplusAuctionInstance } from 'contracts/contract-instance'

export default class SystemSurplusAuction extends AuctionService {
  constructor () {
    super()
    this.contractName = CONTRACT_TYPES.systemSurplusAuction
  }

  async createAuction (data, userAddress) {
    const contract = await getSystemSurplusAuctionInstance()
    await this.getAllowance(userAddress, contract.address, data?.bid)
    return await contract.startAuction({ qAmount: data?.bid })
  }

  async getAuctionData (promiseRes, inf) {
    const objRes = {}
    objRes.bidder = promiseRes.bidder
    objRes.user = inf?.bidder || inf?.user
    objRes.id = inf.id
    objRes.endTime = promiseRes.endTime
    objRes.isExecuted = promiseRes.isExecuted
    objRes.lot = fromWei(promiseRes.lot)
    const highestBid = promiseRes.highestBid
    objRes.highestBid = fromWei(highestBid)
    objRes.title = 'System Surplus Auction'
    objRes.contract = this.contractName
    return { ...objRes }
  }

  async getAuctions (activeAuction) {
    this.getAuctionsCount()
    const auctionEvents = await this.getAuctionsEvent()
    const auctionInf = auctionEvents?.map((evt) => ({
      id: evt.returnValues._auctionId,
      bidder: evt.returnValues._bidder,
      bid: evt.returnValues._bid
    }))

    if (auctionEvents.length > 0) {
      const auctions = await Promise.all(auctionInf.map((inf) => this.getAuction(inf)))
      if (activeAuction) {
        const active = auctions.filter((auction) => !auction.data.isExecuted)
        return await Promise.all(active.map((item) => this.getAuctionData(item.data, item.inf)))
      } else {
        const ended = auctions.filter((auctin) => auctin.data.isExecuted)
        return await Promise.all(ended.map((item) => this.getAuctionData(item.data, item.inf)))
      }
    }
    return []
  }

  async getAuctionsEvents () {
    const contract = await this.getContractInstance(this.contractName)
    const pastEvents = await contract.instance.getPastEvents('AuctionStarted', { fromBlock: 0, toBlock: 'latest' })

    if (!pastEvents.length) {
      return []
    } else {
      const auctionInfo = pastEvents.map((event) => ({
        id: event.returnValues._auctionId,
        bidder: event.returnValues._bidder,
        bid: event.returnValues._bid,
        blockNumber: event.blockNumber
      }))
      return auctionInfo
    }
  }

  async getAuctionsCount () {
    const auctionsInfo = await this.getAuctionsEvents()
    if (!auctionsInfo.length) {
      return []
    } else {
      const allAuctions = await Promise.all(auctionsInfo.map((evt) => this.getAuction(evt)))

      const activeAuctions = allAuctions.filter((auction) => !auction.data.isExecuted)
      const endedAuctions = allAuctions.filter((auction) => auction.data.isExecuted)

      return {
        contract: this.contractName,
        activeAuctions,
        endedAuctions
      }
    }
  }

  async getOneAuction (inf, active) {
    if (inf.id) {
      const promiseRes = await this.getOneAuctionData(inf.id, null)
      const result = await this.getAuctionData(promiseRes, inf)
      return [result]
    }
  }

  async bid (auctionId, bid, userAddress) {
    const contract = await getSystemSurplusAuctionInstance()
    await this.getAllowance(userAddress, contract.address, bid)
    const result = await contract.bid(auctionId, {
      from: userAddress,
      qAmount: bid
    })

    return result
  }

  async execute (auctionId, userAddress) {
    const contract = await getSystemSurplusAuctionInstance()
    const result = await contract.execute(auctionId, { from: userAddress })
    return result
  }
}
