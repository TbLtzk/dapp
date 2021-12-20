import { MAX_APPROVE_AMOUNT } from 'constants/numbers'
import { CONTRACT_TYPES } from 'constants/contracts'
import {
  getInstance,
  getLiquidationAuctionInstance,
  getStableCoinInstance,
  getSystemDebtAuctionInstance,
  getSystemSurplusAuctionInstance
} from 'contracts/contract-instance'

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
    case CONTRACT_TYPES.liquidationAuction: {
      return await getLiquidationAuctionInstance()
    }
    case CONTRACT_TYPES.systemDebtAuction: {
      return await getSystemDebtAuctionInstance()
    }
    case CONTRACT_TYPES.systemSurplusAuction: {
      return await getSystemSurplusAuctionInstance()
    }
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

  async getOneAuctionData (user, vaultId) {
    const contract = await switchContract(this.contractName)
    if (vaultId) {
      return await contract.instance.methods.auctions(user, vaultId).call()
    } else {
      return await contract.instance.methods.auctions(user).call()
    }
  }

  async getAuction (inf, vaultId) {
    const { id, user } = inf
    const contract = await switchContract(this.contractName)
    if (vaultId) {
      const data = await contract.instance.methods.auctions(user, vaultId).call()
      return { data, inf }
    } else {
      const data = await contract.instance.methods.auctions(id).call()
      return { data, inf }
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
