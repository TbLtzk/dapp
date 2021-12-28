import { MAX_APPROVE_AMOUNT } from 'constants/numbers'
import { CONTRACTS_NAMES } from 'constants/contracts'
import {
  getInstance,
  getLiquidationAuctionInstance,
  getStableCoinInstance,
  getSystemDebtAuctionInstance,
  getSystemSurplusAuctionInstance
} from 'contracts/contract-instance'
import { AUCTIONS_TYPES } from 'constants/statuses'

const getPastEvents = async (contract, event) => {
  const eventOptions = {
    fromBlock: 0,
    toBlock: 'latest'
  }
  const result = await contract.getPastEvents(event, eventOptions)
  return result
}

export async function switchContract (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.liquidationAuction: {
      return await getLiquidationAuctionInstance()
    }
    case CONTRACTS_NAMES.systemDebtAuction: {
      return await getSystemDebtAuctionInstance()
    }
    case CONTRACTS_NAMES.systemSurplusAuction: {
      return await getSystemSurplusAuctionInstance()
    }
  }
}

export function transformAuctionTypeToContractName (type) {
  switch (type) {
    case AUCTIONS_TYPES.liquidation:
      return CONTRACTS_NAMES.liquidationAuction
    case AUCTIONS_TYPES.systemDebt:
      return CONTRACTS_NAMES.systemDebtAuction
    case AUCTIONS_TYPES.systemSurplus:
      return CONTRACTS_NAMES.systemSurplusAuction
  }
}

export function transformAuctionNameToAuctionType (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.liquidationAuction:
      return AUCTIONS_TYPES.liquidation
    case CONTRACTS_NAMES.systemDebtAuction:
      return AUCTIONS_TYPES.systemDebt
    case CONTRACTS_NAMES.systemSurplusAuction:
      return AUCTIONS_TYPES.systemSurplus
  }
}

export default class AuctionService {
  constructor (contractName) {
    this.contractName = contractName
  }

  async getContractInstance () {
    const initInstance = getInstance(this.contractName, true)
    return initInstance()
  }

  async getAuctionsEvent () {
    const contract = await switchContract(this.contractName)
    return await getPastEvents(contract.instance, 'AuctionStarted')
  }

  async getOneAuctionData (userAddress, vaultId) {
    const contract = await switchContract(this.contractName)
    if (vaultId) {
      return await contract.instance.methods.auctions(userAddress, vaultId).call()
    } else {
      return await contract.instance.methods.auctions(userAddress).call()
    }
  }

  async getAuction (info, vaultId) {
    const { id, user } = info
    const contract = await this.getContractInstance()
    if (vaultId) {
      const data = await contract.instance.methods.auctions(user, vaultId).call()
      return { data, info }
    } else {
      const data = await contract.instance.methods.auctions(id).call()
      return { data, info }
    }
  }

  async getAllowance (userAddress, contractAddress, value) {
    const stableCoin = await getStableCoinInstance()
    const allowance = await stableCoin.allowance(userAddress, contractAddress)
    if (value && Number(allowance) < Number(value)) {
      await stableCoin.approve(contractAddress, MAX_APPROVE_AMOUNT, { from: userAddress })
    }
  }
}

export const getStatusTransformation = (statusId) => {
  const status = ['None', 'Active', 'Closed']
  return status[Number(statusId)]
}
