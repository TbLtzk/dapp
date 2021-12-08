import AuctionService from './auction-service-helper'
import { CONTRACT_TYPES } from 'constants/contracts'

import { getStatusTransformation } from './auction-helper'
import { toWei, fromWei } from 'func/balance'
import { getSystemDebtAuctionInstance } from 'contracts/contract-instance'

export default class SystemDebtAuction extends AuctionService {
  constructor () {
    super()
    this.contractName = CONTRACT_TYPES.systemDebtAuction
  }

  async getAuctionData (promiseRes, inf) {
    const objRes = {}
    objRes.status = getStatusTransformation(promiseRes.status)
    objRes.bidder = promiseRes.bidder
    objRes.bid = inf.bid
    objRes.id = inf.id
    objRes.endTime = promiseRes.endTime
    const highestBid = promiseRes.highestBid
    const reserveLot = promiseRes.reserveLot
    objRes.highestBid = fromWei(highestBid)
    objRes.reserveLot = fromWei(reserveLot)
    objRes.title = 'System Debt Auction'
    objRes.contract = CONTRACT_TYPES.systemDebtAuction
    return { ...objRes }
  }

  async getAuctions (activeAuction) {
    const auctionEvents = await this.getAuctionsEvent()
    const auctionInf = auctionEvents?.map((evt) => ({
      bidder: evt.returnValues._bidder,
      bid: evt.returnValues._bid,
      id: evt.returnValues._auctionId
    }))

    if (auctionInf.length > 0) {
      const auction = await Promise.all(auctionInf.map((inf) => this.getAuction(inf)))

      if (activeAuction) {
        const active = auction.filter((auction) => auction.data.status === '1')
        return await Promise.all(active.map((active) => this.getAuctionData(active.data, active.inf)))
      } else {
        const ended = auction.filter((auction) => auction.data.status === '2' || auction.data.status === '0')
        return await Promise.all(ended.map((auction) => this.getAuctionData(auction.data, auction.inf)))
      }
    }
    return []
  }

  async getOneAuction (inf, active) {
    if (inf.id) {
      const promiseRes = await this.getOneAuctionData(inf.id, null)
      const result = await this.getAuctionData(promiseRes, inf)
      return [result]
    }
  }

  async createAuction (data, userAddress) {
    const contract = await getSystemDebtAuctionInstance()
    await this.getAllowance(userAddress, contract.address, data?.bid)
    return await contract.startAuction(toWei(data?.bid), { from: userAddress })
  }

  async bid (bid, userAddress) {
    const contract = await getSystemDebtAuctionInstance()
    await this.getAllowance(userAddress, contract.address, bid)
    const result = await contract.bid(toWei(bid), { from: userAddress })
    return result
  }

  async execute (userAddress) {
    const contract = await getSystemDebtAuctionInstance()
    const result = await contract.execute({ from: userAddress })
    return result
  }
}
