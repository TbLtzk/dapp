import { transformToPercentage } from './base-voting-helper'
import { ParameterType } from '@q-dev/q-js-sdk'
import {
  getRootNodesInstance,
  getConstitutionVotingInstance,
  getGeneralUpdateVotingInstance,
  getEmergencyUpdateVotingInstance,
  getValidatorsSlashingVotingInstance,
  getRootNodesSlashingVotingInstance,
  getEpqfiParametersVotingInstance,
  getEpdrParametersVotingInstance,
  getRootNodesMembershipVotingInstance,
  getEpqfiMembershipVotingInstance,
  getEpdrMembershipVotingInstance
} from 'contracts/contract-instance'

export default class VotingService {
  constructor (contractName) {
    this.contractName = contractName
    // this.contract = governenceContract[contractName]
  }

  // можно убрать с помощью архивации всех контрактов
  async switchContract () {
    switch (this.contractName) {
      case 'GeneralUpdateVoting': {
        return await getGeneralUpdateVotingInstance()
      }
      case 'ConstitutionVoting': {
        return await getConstitutionVotingInstance()
      }
      case 'EmergencyUpdateVoting': {
        return await getEmergencyUpdateVotingInstance()
      }
      case 'ValidatorsSlashingVoting': {
        return await getValidatorsSlashingVotingInstance()
      }
      case 'RootNodesSlashingVoting': {
        return await getRootNodesSlashingVotingInstance()
      }
      case 'RootsVoting': {
        return await getRootNodesMembershipVotingInstance()
      }
      case 'EPQFIParametersVoting': {
        return await getEpqfiParametersVotingInstance()
      }
      case 'EPDRParametersVoting': {
        return await getEpdrParametersVotingInstance()
      }
      case 'EPQFIMembershipVoting': {
        return await getEpqfiMembershipVotingInstance()
      }
      case 'EPDRMembershipVoting': {
        return await getEpdrMembershipVotingInstance()
      }
    }
  }

  async getProposal (id) {
    const contract = await this.switchContract()
    const result = await contract.instance.methods.proposals(id).call()
    return result
  }

  async getProposalStatus (id) {
    const contract = await this.switchContract()
    const result = await contract.getStatus(id)
    return result
  }

  async getProposalStats (id) {
    const contract = await this.switchContract()
    const result = await contract.getProposalStats(id)
    return result
  }

  async getVetoesNumber (id) {
    const contract = await this.switchContract()
    try {
      if (contract.instance.methods.getVetosNumber) {
        const result = await contract.instance.methods.getVetosNumber(id).call()
        return result
      } else {
        return 0
      }
    } catch (err) {
      return 0
    }
  }

  async getLatestBlockNumber () {
    const block = await window.web3.eth.getBlock('latest')
    return block.number
  }

  async getLatestProposalsIds () {
    const contract = await this.switchContract()
    const latestBlockNumber = await this.getLatestBlockNumber()
    return await contract.getProposalIds(latestBlockNumber - 50000, 'latest')
  }

  async getVetoesPercentage (id) {
    const contract = await this.switchContract()
    const result = await contract.getVetosPercentage(id)
    return result
  }

  async voteAgainst (id, userAddress) {
    const contract = await this.switchContract()
    const result = await contract.voteAgainst(id, { from: userAddress })
    return result
  }

  async voteFor (id, userAddress) {
    const contract = await this.switchContract()
    const result = await contract.voteFor(id, { from: userAddress })
    return result
  }

  async veto (id, userAddress) {
    const contract = await this.switchContract()
    const result = await contract.veto(id, { from: userAddress })
    return result
  }

  async execute (id, userAddress) {
    const promiseStatus = await this.getProposalStatus(id)
    const contract = await this.switchContract()

    let result = null
    if (promiseStatus === '4') {
      result = await contract.execute(id, { from: userAddress })
    }
    return result
  }

  async getOneProposal (id) {
    if (id) {
      let objRes = null
      const promiseStatus = await this.getProposalStatus(id)
      if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4' || promiseStatus === '5') {
        const promiseRes = await this.getProposal(id)
        if (promiseRes) {
          objRes = await this.getProposalData(promiseRes, id, promiseStatus)
        }
      } else {
        return objRes
      }
      return [objRes]
    }
  }

  async getProposalWithoutStatusChecked (id) {
    if (id) {
      let objRes = null
      const promiseStatus = await this.getProposalStatus(id)
      const promiseRes = await this.getProposal(id)
      if (promiseRes) {
        objRes = await this.getProposalData(promiseRes, id, promiseStatus)
      }
      return [objRes]
    }
  }

  async getProposals (blocksRange) {
    const contract = await this.switchContract()
    const proposalIds = await contract.getProposalIds(...blocksRange)
    const allProposals = await contract.getProposals(...proposalIds)
    const activeProposals = allProposals.filter(
      (obj) => obj.status === '1' || obj.status === '3' || obj.status === '4'
    )
    const proposals = []
    for (const prop of activeProposals) {
      const result = await this.getProposalData(prop, prop.id, prop.status)
      proposals.push(result)
    }
    return [...proposals].reverse()
  }

  async getEndedProposals (blocksRange) {
    const contract = await this.switchContract()
    const proposalIds = await contract.getProposalIds(...blocksRange)

    if (!proposalIds.length) {
      return []
    } else {
      const allProposals = await contract.getProposals(...proposalIds)
      const endedProposals = allProposals.filter(
        (obj) => obj.status !== '1' && obj.status !== '3' && obj.status !== '4'
      )
      const proposals = []
      for (const prop of endedProposals) {
        const result = await this.getProposalData(prop, prop.id, prop.status)
        proposals.push(result)
      }
      return [...proposals].reverse()
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
    const contract = await this.switchContract()
    const latestProposalsIds = await this.getLatestProposalsIds()
    const allProposalsId = await contract.getProposalIds('0', 'latest')

    const activeProposalsArray = []

    for (const id of latestProposalsIds) {
      const result = await contract.getStatus(id)
      activeProposalsArray.push(result)
    }

    const activeProposals = activeProposalsArray.filter(
      (promiseStatus) => promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4'
    )
    return { ended: allProposalsId.length - activeProposals.length, active: activeProposals.length }
  }

  transformParameterType (id) {
    const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean']
    return type[Number(id)]
  }

  async getParametersArr (id) {
    const contract = await this.switchContract()
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
