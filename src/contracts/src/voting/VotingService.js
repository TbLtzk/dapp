import { getPastProposalsIds, transformToPercentage } from '../../handler/VotingHandler'
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
  }

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

  async getProposalsEvent () {
    const contract = await this.switchContract()
    const eventOptions = {
      fromBlock: 0,
      toBlock: 'latest'
    }
    return await contract.instance.getPastEvents('ProposalCreated', eventOptions)
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

  async getProposals () {
    const contract = await this.switchContract()
    const proposalEvents = await this.getProposalsEvent()
    const proposalIds = proposalEvents.map((event) => event.returnValues._id)
    const allProposals = await contract.getProposals(...proposalIds)
    const proposals = allProposals.filter((obj) => obj.status === '1' || obj.status === '3' || obj.status === '4')
    return await Promise.all(proposals.map((prop) => this.getProposalData(prop, prop.id, prop.status)))
  }

  async getEndedProposals () {
    const contract = await this.switchContract()
    const proposalEvents = await this.getProposalsEvent()
    const proposalIds = proposalEvents.map((event) => event.returnValues._id).slice(-3)
    const allProposals = await contract.getProposals(...proposalIds)
    const endedProposals = allProposals.filter((obj) => obj.status !== '1' && obj.status !== '3' && obj.status !== '4')

    const result = await Promise.all(endedProposals.map((prop) => this.getProposalData(prop, prop.id, prop.status)))
    return result
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
    const proposalEvents = await this.getProposalsEvent()
    const proposalIds = getPastProposalsIds(proposalEvents)

    const proposals = await Promise.all(proposalIds.map((id) => this.getProposalStatus(id)))
    const activeProposals = proposals.filter(
      (promiseStatus) => promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4'
    )

    return { ended: proposals.length - activeProposals.length, active: activeProposals.length }
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
