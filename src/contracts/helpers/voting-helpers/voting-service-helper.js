import { transformToPercentage } from './base-voting-helper'
import { ParameterType } from '@q-dev/q-js-sdk'
import { getRootNodesInstance, cache } from 'contracts/contract-instance'

export default class VotingService {
  constructor (contractName) {
    this.contractName = contractName
    this.contract = cache[contractName]
  }

  async getProposalStatus (id) {
    const result = await this.contract.getStatus(id)
    return result
  }

  async getProposalStats (id) {
    const result = await this.contract.getProposalStats(id)
    return result
  }

  async getVetoesNumber (id) {
    try {
      if (this.contract.instance.methods.getVetosNumber) {
        const result = await this.contract.instance.methods.getVetosNumber(id).call()
        return result
      } else {
        return 0
      }
    } catch (err) {
      return 0
    }
  }

  async getVetoesPercentage (id) {
    const result = await this.contract.getVetosPercentage(id)
    return result
  }

  async voteAgainst (id, userAddress) {
    const result = await this.contract.voteAgainst(id, { from: userAddress })
    return result
  }

  async voteFor (id, userAddress) {
    const result = await this.contract.voteFor(id, { from: userAddress })
    return result
  }

  async veto (id, userAddress) {
    const result = await this.contract.veto(id, { from: userAddress })
    return result
  }

  async execute (id, userAddress) {
    const promiseStatus = await this.getProposalStatus(id)

    let result = null
    if (promiseStatus === '4') {
      result = await this.contract.execute(id, { from: userAddress })
    }
    return result
  }

  async getProposal (id, type) {
    let additionalInfo = {}
    let headerInfo = {}
    const proposal = await this.contract.getProposalWithStatus(id)
    if (type === 'additional') {
      additionalInfo = await this.getProposalAdditionalData(proposal, id)
    }
    if (type === 'header') {
      headerInfo = this.getProposalData(proposal, proposal.id, proposal.status)
    }
    if (type === 'full') {
      additionalInfo = await this.getProposalAdditionalData(proposal, id)
      headerInfo = this.getProposalData(proposal, proposal.id, proposal.status)
    }
    return { ...headerInfo, ...additionalInfo, error: false }
  }

  async getProposals (range, latestBlockNumber) {
    const latestProposalsIds = await this.contract.getProposalIds(latestBlockNumber - 200000, 'latest')
    const rangeProposalsIds = [...latestProposalsIds].reverse().slice(...range)
    if (!latestProposalsIds.length) {
      return []
    } else {
      const allProposals = await this.contract.getProposals(...rangeProposalsIds)
      const activeProposals = allProposals.filter(
        (obj) => obj.status === '1' || obj.status === '3' || obj.status === '4'
      )
      return activeProposals.map((prop) => this.getProposalData(prop, prop.id, prop.status))
    }
  }

  async getEndedProposals (range) {
    const proposalIds = await this.contract.getProposalIds(0, 'latest')
    const sliceProposals = [...proposalIds].slice(...range)
    if (!sliceProposals.length) {
      return []
    } else {
      const allProposals = await this.contract.getProposals(...sliceProposals)
      const endedProposals = allProposals.filter(
        (obj) => obj.status !== '1' && obj.status !== '3' && obj.status !== '4'
      )
      return endedProposals.map((prop) => this.getProposalData(prop, prop.id, prop.status))
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

  async getProposalsCount (latestBlockNumber) {
    const latestProposalsIds = await this.contract.getProposalIds(latestBlockNumber - 200000, 'latest')
    const allProposals = await this.contract.getProposalIds(0, 'latest')
    if (!latestProposalsIds.length) {
      return { contract: this.contractName, ended: allProposals.length, active: 0 }
    } else {
      const proposals = []
      for (const id of latestProposalsIds) {
        const promiseStatus = await this.contract.getStatus(id)
        proposals.push(promiseStatus)
      }
      const activeProposals = proposals.filter(
        (promiseStatus) => promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4'
      )

      return {
        contract: this.contractName,
        ended: allProposals.length - activeProposals.length,
        active: activeProposals.length
      }
    }
  }

  transformParameterType (id) {
    const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean']
    return type[Number(id)]
  }

  async getParametersArr (id) {
    const result = await this.contract.getParametersArr(id)
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
