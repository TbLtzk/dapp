import { transformToPercentage } from './base-voting-helper'
import { ParameterType } from '@q-dev/q-js-sdk'
import { getRootNodesInstance, cache } from 'contracts/contract-instance'
import { getLatestBlockNumber } from 'func/useful'

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

  async getLatestProposalsIds () {
    const latestBlockNumber = await getLatestBlockNumber()
    return await this.contract.getProposalIds(latestBlockNumber - 150000, 'latest')
  }

  async getProposal (id) {
    const proposal = await this.contract.getProposalWithStatus(id)
    const result = await this.getProposalAdditionalData(proposal, id)
    return result
  }

  async getProposals (range) {
    const latestProposalsIds = await this.getLatestProposalsIds()
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
    const sliceProposals = [...proposalIds].reverse().slice(...range)
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

  async getProposalsCount () {
    const latestProposalsIds = await this.getLatestProposalsIds()
    const allProposalsId = await this.contract.getProposalIds(0, 'latest')
    const proposals = await Promise.all(latestProposalsIds.map((id) => this.contract.getStatus(id)))
    const activeProposals = proposals.filter(
      (promiseStatus) => promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4'
    )
    return { ended: allProposalsId.length - activeProposals.length, active: activeProposals.length }
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
