import { transformToPercentage } from './base-voting-helper'
import { ParameterType } from '@q-dev/q-js-sdk'
import { getRootNodesInstance, getInstance } from 'contracts/contract-instance'

export default class VotingService {
  constructor (contractName) {
    this.contractName = contractName
  }

  async getContractInstance () {
    const initInstance = getInstance(this.contractName)
    return initInstance()
  }

  async getProposalStatus (id) {
    const contract = await this.getContractInstance()
    const result = await contract.getStatus(id)
    return result
  }

  async getProposalStats (id) {
    const contract = await this.getContractInstance()
    const result = await contract.getProposalStats(id)
    return result
  }

  async getVetoesNumber (id) {
    try {
      const contract = await this.getContractInstance()
      if (this.contract.instance.methods.getVetosNumber) {
        const result = await contract.instance.methods.getVetosNumber(id).call()
        return result
      } else {
        return 0
      }
    } catch (err) {
      return 0
    }
  }

  async getVetoesPercentage (id) {
    const contract = await this.getContractInstance()
    const result = await contract.getVetosPercentage(id)
    return result
  }

  async voteAgainst (id, userAddress) {
    const contract = await this.getContractInstance()
    const result = await contract.voteAgainst(id, { from: userAddress })
    return result
  }

  async voteFor (id, userAddress) {
    const contract = await this.getContractInstance()
    const result = await contract.voteFor(id, { from: userAddress })
    return result
  }

  async veto (id, userAddress) {
    const contract = await this.getContractInstance()
    const result = await contract.veto(id, { from: userAddress })
    return result
  }

  async execute (id, userAddress) {
    const contract = await this.getContractInstance()
    const promiseStatus = await this.getProposalStatus(id)
    let result = null
    if (promiseStatus === '4') {
      result = await contract.execute(id, { from: userAddress })
    }
    return result
  }

  async getProposal (id, type) {
    const contract = await this.getContractInstance()
    const ids = await contract.getProposalIds(0, 'latest')
    const includeInIds = ids.includes(id)
    if (includeInIds) {
      let additionalInfo = {}
      let headerInfo = {}
      const proposal = await contract.getProposalWithStatus(id)
      if (type === 'header') {
        headerInfo = this.getProposalData(proposal, proposal.id, proposal.status)
      }
      if (type === 'full') {
        additionalInfo = await this.getProposalAdditionalData(proposal, id)
        headerInfo = this.getProposalData(proposal, proposal.id, proposal.status)
      }
      return { ...headerInfo, ...additionalInfo, error: false }
    } else {
      return { error: true }
    }
  }

  async getRootNodesNumber () {
    const contract = await getRootNodesInstance()
    return await contract.getSize()
  }

  async getProposalStatsData (id) {
    const objRes = {}
    const proposalStats = await this.getProposalStats(id)
    const getVetoesNumber = await this.getVetoesNumber(id)
    const rootNodesNumber = await this.getRootNodesNumber()
    objRes.vetoesNumber = getVetoesNumber
    objRes.noVote = rootNodesNumber - getVetoesNumber
    objRes.vetoesPercentage = (getVetoesNumber * 100) / rootNodesNumber
    objRes.currentMajority = transformToPercentage(proposalStats.currentMajority)
    objRes.currentQuorum = transformToPercentage(proposalStats.currentQuorum)
    objRes.requiredMajority = transformToPercentage(proposalStats.requiredMajority)
    objRes.requiredQuorum = transformToPercentage(proposalStats.requiredQuorum)
    objRes.vetoThreshold = '50'
    return objRes
  }

  async getProposalsCount (latestBlocks) {
    const contract = await this.getContractInstance()
    const pastEvents = await contract.instance.getPastEvents('ProposalCreated', { fromBlock: 0, toBlock: 'latest' })
    const latestPastEvents = pastEvents.filter((evt) => evt.blockNumber >= latestBlocks)

    const latestProposals = []

    for (const pastEvent of latestPastEvents) {
      const id = pastEvent.returnValues._id
      const { blockNumber } = pastEvent
      const status = await contract.getStatus(pastEvent.returnValues._id)
      latestProposals.push({ id, status, blockNumber })
    }

    const activeIds = latestProposals.filter(
      (prop) => prop.status === '1' || prop.status === '3' || prop.status === '4'
    )

    const endedIds = pastEvents
      .map((evt) => ({ blockNumber: evt.blockNumber, id: evt.returnValues._id }))
      .filter((id) => !activeIds.includes(id))

    return {
      contract: this.contractName,
      activeIds,
      endedIds
    }
  }

  transformParameterType (id) {
    const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean']
    return type[Number(id)]
  }

  async getParametersArr (id) {
    const contract = await this.getContractInstance()
    const result = await contract.getParametersArr(id)
    return result
  }

  async getProposalParametersData (id) {
    const parameters = await this.getParametersArr(id)
    return parameters.map((item) => {
      let value = null
      switch (item.paramType) {
        case ParameterType.ADDRESS:
          value = item.addrValue
          break
        case ParameterType.BOOL:
          value = item.boolValue
          break
        case ParameterType.STRING:
          value = item.strValue
          break
        case ParameterType.UINT:
          value = item.uintValue
          break
        case ParameterType.BYTE:
          value = item.bytes32Value
          break
      }
      return {
        parameterType: item.paramType,
        parameterValue: value,
        parameterKey: item.paramKey
      }
    })
  }
}
