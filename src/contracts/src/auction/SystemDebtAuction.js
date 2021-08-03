import AuctionService from './AuctionService'

import { contractsToAddresses } from '../../mapping/contract-to-address'
import { getStatusTransformation } from '../../handler/AuctionHandler'
import { toWei, fromWei } from 'func/balance'
import { contracts } from '../../config/config'

export default class SystemDebtAuction extends AuctionService {
  constructor () {
    super()
    this.contract = contracts.SystemDebtAuction
    this.contractName = 'SystemDebtAuction'
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
    objRes.contract = this.contractName
    return { ...objRes }
  }

  async getAuctions (activeAuction) {
    const auctionEvents = await this.getAuctionsEvent()
    const auctionInf = auctionEvents?.map(evt => {
      return {
        bidder: evt.returnValues._bidder,
        bid: evt.returnValues._bid,
        id: evt.returnValues._auctionId
      }
    })
    const auctions = []
    if (auctionInf) {
      for (const inf of auctionInf) {
        let objRes = {}
        const promiseRes = await this.getAuction(inf.id, null)
        // let promiseRes = await this.getAuction(inf.bidder, null);
        if (activeAuction) {
          if (promiseRes.status === '1') {
            objRes = await this.getAuctionData(promiseRes, inf)
            auctions.push(objRes)
          }
        } else {
          if (promiseRes.status === '2' || promiseRes.status === '0') {
            objRes = await this.getAuctionData(promiseRes, inf)
            auctions.push(objRes)
          }
        }
      }
    }
    return auctions
  }

  async getOneAuction (inf, active) {
    try {
      if (inf.id) {
        let objRes = null
        const promiseRes = await this.getAuction(inf.id, null)
        if (promiseRes) {
          objRes = await this.getAuctionData(promiseRes, inf)
        }
        return [objRes]
      }
    } catch (e) {
      console.error(e)
    }
  }

  async createAuction (data, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.SystemDebtAuction, data?.bid)
    return await this.contract.methods.startAuction(toWei(data?.bid))
      .send({ from: userAddress })
  }

  async bid (bid, userAddress) {
    await this.getAllowance(userAddress, contractsToAddresses.SystemDebtAuction, bid)
    const result = await this.contract.methods.bid(
      toWei(bid))
      .send(
        { from: userAddress })
    return result
  }

  async execute (userAddress) {
    const result = await this.contract.methods.execute()
      .send(
        { from: userAddress })
    return result
  }
}
