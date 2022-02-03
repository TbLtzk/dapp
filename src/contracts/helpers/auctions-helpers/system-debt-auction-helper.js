import AuctionService, { ERROR_TYPES, getStatusTransformation } from './auction-service-helper'
import { CONTRACT_TYPES } from 'constants/contracts'

import { toWei, fromWei } from 'func/balance'
import { getSystemDebtAuctionInstance } from 'contracts/contract-instance'
import { remainDate } from 'func/convertDate'
import { groupArrayByBlockNumber } from 'func/useful'

export function creationSystemDebtContractObj () {
  return new SystemDebtAuction()
}

export default class SystemDebtAuction extends AuctionService {
  constructor () {
    super()
    this.contractName = CONTRACT_TYPES.systemDebtAuction
  }

  prepareAuctionData (data, info, raisingBid) {
    const completedInfo = {}
    completedInfo.status = getStatusTransformation(data.status)
    completedInfo.statusNumber = data.status
    completedInfo.bidder = data.bidder
    completedInfo.bid = data.highestBid
    completedInfo.id = info.id
    completedInfo.endTime = data.endTime
    completedInfo.highestBid = fromWei(data.highestBid)
    completedInfo.raisingBid = fromWei(raisingBid)

    completedInfo.reserveLot = fromWei(data.reserveLot)
    completedInfo.title = 'System Debt Auction'
    completedInfo.contract = CONTRACT_TYPES.systemDebtAuction
    completedInfo.blockNumber = info.blockNumber
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
      this.prepareAuctionData(auction.data, auction.info, auction.raisingBid)
    )

    const groupedAuctionsByBlockNumber = groupArrayByBlockNumber(preparedAuctionsData)

    const activeAuctions = groupedAuctionsByBlockNumber.filter((auction) => auction.statusNumber === '1')
    const endedAuctions = groupedAuctionsByBlockNumber.filter(
      (auction) => auction.statusNumber === '2' || auction.statusNumber === '0'
    )

    return {
      contract: this.contractName,
      activeAuctions,
      endedAuctions
    }
  }

  async getOneAuction (id) {
    try {
      const contract = await this.getContractInstance()
      const info = await contract.instance.methods.auctions(id).call()
      if (!Number(info.endTime)) {
        return { error: ERROR_TYPES.notExist }
      } else {
        const raisingBid = await contract.getRaisingBid(id)
        return this.prepareAuctionData(info, { id }, raisingBid)
      }
    } catch (error) {
      return { error: ERROR_TYPES.wrongLink }
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
    console.log(bid)
    const result = await contract.bid(toWei(bid), { from: userAddress })
    return result
  }

  async execute (userAddress) {
    const contract = await getSystemDebtAuctionInstance()
    const result = await contract.execute({ from: userAddress })
    return result
  }
}
