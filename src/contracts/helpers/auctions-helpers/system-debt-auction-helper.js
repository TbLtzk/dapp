import AuctionService, { getStatusTransformation } from './auction-service-helper'
import { CONTRACT_TYPES } from 'constants/contracts'

import { toWei, fromWei } from 'func/balance'
import { getSystemDebtAuctionInstance } from 'contracts/contract-instance'
import { remainDate } from 'func/convertDate'

export function creationSystemDebtContractObj () {
  return new SystemDebtAuction()
}

export default class SystemDebtAuction extends AuctionService {
  constructor () {
    super()
    this.contractName = CONTRACT_TYPES.systemDebtAuction
  }

  prepareAuctionData (data, id) {
    const completedInfo = {}
    completedInfo.status = getStatusTransformation(data.status)
    completedInfo.statusNumber = data.status
    completedInfo.bidder = data.bidder
    completedInfo.bid = data.highestBid
    completedInfo.id = id
    completedInfo.endTime = data.endTime
    completedInfo.highestBid = fromWei(data.highestBid)
    completedInfo.reserveLot = fromWei(data.reserveLot)
    completedInfo.title = 'System Debt Auction'
    completedInfo.contract = CONTRACT_TYPES.systemDebtAuction

    completedInfo.disableBidButton = !remainDate(data.endTime)
    completedInfo.disableExecuteButton = !!remainDate(data.endTime)

    return completedInfo
  }

  async getAuctionsEvents (contract) {
    const pastEvents = await contract.instance.getPastEvents('AuctionStarted', { fromBlock: 0, toBlock: 'latest' })
    if (!pastEvents.length) {
      return []
    } else {
      const auctionInfo = pastEvents.map((event) => ({
        bidder: event.returnValues._bidder,
        bid: event.returnValues._bid,
        id: event.returnValues._auctionId,
        blockNumber: event.blockNumber
      }))
      return auctionInfo
    }
  }

  async getAuctions () {
    const contract = await this.getContractInstance()

    const auctionsInfo = await this.getAuctionsEvents(contract)
    const allAuctionsData = await Promise.all(auctionsInfo.map((event) => this.getAuction(event)))

    const preparedAuctionsData = allAuctionsData.map((auction) =>
      this.prepareAuctionData(auction.data, auction.info.id)
    )

    const activeAuctions = preparedAuctionsData.filter((auction) => auction.statusNumber === '1')
    const endedAuctions = preparedAuctionsData.filter(
      (auction) => auction.statusNumber === '2' || auction.statusNumber === '0'
    )

    return {
      contract: this.contractName,
      activeAuctions,
      endedAuctions
    }
  }

  async getOneAuction (id) {
    const contract = await this.getContractInstance()
    const info = await contract.instance.methods.auctions(id).call()
    return this.prepareAuctionData(info, id)
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
