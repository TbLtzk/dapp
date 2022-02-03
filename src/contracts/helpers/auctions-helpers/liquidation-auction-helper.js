import AuctionService, { ERROR_TYPES, getStatusTransformation } from './auction-service-helper'
import { CONTRACT_TYPES } from 'constants/contracts'

import { fromBtcBlockchain, toWei, fromWei } from 'func/balance'

import { getBorrowingCoreInstance, getLiquidationAuctionInstance } from 'contracts/contract-instance'
import { remainDate } from 'func/convertDate'
import { groupArrayByBlockNumber } from 'func/useful'

export function creationLiquidationContractObj () {
  return new LiquidationAuction()
}

export default class LiquidationAuction extends AuctionService {
  constructor () {
    super()
    this.contractName = CONTRACT_TYPES.liquidationAuction
  }

  async prepareAuctionData (data, info, contract, raisingBid) {
    const vault = await contract.userVaults(info.user, info.vaultId)

    const completedInfo = {}
    completedInfo.bidder = data.bidder
    completedInfo.user = info.user
    completedInfo.userVaultId = info.vaultId
    completedInfo.id = info.vaultId
    completedInfo.colKey = vault.colKey
    completedInfo.endTime = data.endTime
    completedInfo.statusNumber = data.status
    completedInfo.title = 'Liquidation Auction'
    completedInfo.contract = CONTRACT_TYPES.liquidationAuction
    completedInfo.raisingBid = fromWei(raisingBid)
    completedInfo.highestBid = fromWei(data.highestBid)
    completedInfo.blockNumber = info.blockNumber
    completedInfo.status = getStatusTransformation(data.status)
    completedInfo.colAsset = fromBtcBlockchain(vault.colAsset)
    completedInfo.disableBidButton = !remainDate(data.endTime)
    completedInfo.disableExecuteButton = !!remainDate(data.endTime)

    return completedInfo
  }

  async getAuctionsEvents () {
    const contract = await this.getContractInstance(this.contractName)
    const pastEvents = await contract.instance.getPastEvents('AuctionStarted', { fromBlock: 0, toBlock: 'latest' })

    if (!pastEvents.length) {
      return []
    } else {
      const auctionInfo = pastEvents.map((event) => ({
        user: event?.returnValues?._user,
        vaultId: event.returnValues._vaultId,
        blockNumber: event.blockNumber
      }))
      return auctionInfo
    }
  }

  async getAuctions () {
    const auctionsInfo = await this.getAuctionsEvents()
    const borrowingCoreInstance = await getBorrowingCoreInstance()
    const allAuctionsData = await Promise.all(auctionsInfo.map((evt) => this.getAuction(evt, evt?.vaultId)))
    const preparedAuctionsData = await Promise.all(
      allAuctionsData.map((auction) =>
        this.prepareAuctionData(auction.data, auction.info, borrowingCoreInstance, auction.raisingBid)
      )
    )

    const groupedAuctionsByBlockNumber = groupArrayByBlockNumber(preparedAuctionsData)

    const activeAuctions = groupedAuctionsByBlockNumber.filter((auction) => auction.statusNumber === '1')
    const endedAuctions = groupedAuctionsByBlockNumber.filter((auction) => auction.statusNumber !== '1')

    return {
      contract: this.contractName,
      activeAuctions,
      endedAuctions
    }
  }

  async getOneAuction (vaultId, address) {
    try {
      const contract = await this.getContractInstance()
      const info = await contract.getAuctionInfo(address, vaultId)
      if (!Number(info.endTime)) {
        return { error: ERROR_TYPES.notExist }
      } else {
        const pastEvents = await this.getAuctionsEvents()
        const event = pastEvents.find((event) => event.vaultId === vaultId && event.user === address)
        const raisingBid = await contract.getRaisingBid(address, vaultId)
        const borrowingCoreInstance = await getBorrowingCoreInstance()
        return this.prepareAuctionData(info, event, borrowingCoreInstance, raisingBid)
      }
    } catch (error) {
      return { error: ERROR_TYPES.wrongLink }
    }
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

  async createAuction (data, userAddress) {
    const contract = await getLiquidationAuctionInstance()
    await this.getAllowance(userAddress, contract.address, data?.bid)
    return await contract.startAuction(data?.address, data['vault-id'], toWei(data?.bid), { from: userAddress })
  }
}
