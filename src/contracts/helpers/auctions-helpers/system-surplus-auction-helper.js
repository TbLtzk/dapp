import AuctionService, { ERROR_TYPES } from './auction-service-helper'
import { CONTRACT_TYPES } from 'constants/contracts'

import { fromWei } from 'func/balance'
import { getSystemSurplusAuctionInstance } from 'contracts/contract-instance'
import { remainDate } from 'func/convertDate'
import { groupArrayByBlockNumber } from 'func/useful'

export function creationSystemSurplusContractObj () {
  return new SystemSurplusAuction()
}

export default class SystemSurplusAuction extends AuctionService {
  constructor () {
    super()
    this.contractName = CONTRACT_TYPES.systemSurplusAuction
  }

  checkSystemSurplusStatus (endTime, isExecuted) {
    if (endTime === 0 || remainDate(endTime) !== 0) {
      return 'Pending'
    }
    if (isExecuted) {
      return 'Executed'
    }
    if (!isExecuted && remainDate(endTime) === 0) {
      return 'Accepted'
    }
  }

  prepareAuctionData (data, info, raisingBid) {
    const status = this.checkSystemSurplusStatus(data.endTime, data.isExecuted)
    const completedInfo = {}
    completedInfo.bidder = data.bidder
    completedInfo.user = info?.bidder || info?.user
    completedInfo.id = info.id
    completedInfo.raisingBid = fromWei(raisingBid)
    completedInfo.endTime = data.endTime
    completedInfo.isExecuted = data.isExecuted
    completedInfo.highestBid = fromWei(data.highestBid)
    completedInfo.lot = fromWei(data.lot)
    completedInfo.title = 'System Surplus Auction'
    completedInfo.status = status
    completedInfo.blockNumber = info.blockNumber
    completedInfo.disableBidButton = status === 'Accepted'
    completedInfo.disableExecuteButton = status === 'Pending'

    completedInfo.contract = this.contractName
    return completedInfo
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

  async getAuctions () {
    const auctionsInfo = await this.getAuctionsEvents()

    const allAuctionsData = await Promise.all(auctionsInfo.map((event) => this.getAuction(event)))
    const preparedAuctionsData = allAuctionsData.map((auction) =>
      this.prepareAuctionData(auction.data, auction.info, auction.raisingBid)
    )
    const groupedAuctionsByBlockNumber = groupArrayByBlockNumber(preparedAuctionsData)

    const activeAuctions = groupedAuctionsByBlockNumber.filter((auction) => !auction.isExecuted)
    const endedAuctions = groupedAuctionsByBlockNumber.filter((auction) => auction.isExecuted)

    return {
      contract: this.contractName,
      activeAuctions,
      endedAuctions
    }
  }

  async getOneAuction (id) {
    try {
      const contract = await this.getContractInstance()
      const raisingBid = await contract.getRaisingBid(id)
      const info = await contract.instance.methods.auctions(id).call()
      if (!Number(info.endTime)) {
        return { error: ERROR_TYPES.notExist }
      } else {
        const pastEvents = await this.getAuctionsEvents()
        const event = pastEvents.find((event) => event.id === id)
        return this.prepareAuctionData(info, event, raisingBid)
      }
    } catch (error) {
      return { error: ERROR_TYPES.wrongLink }
    }
  }

  async createAuction (data) {
    const contract = await getSystemSurplusAuctionInstance()
    return await contract.startAuction({ qAmount: data?.bid })
  }

  async bid (auctionId, bid, userAddress) {
    const contract = await getSystemSurplusAuctionInstance()
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
