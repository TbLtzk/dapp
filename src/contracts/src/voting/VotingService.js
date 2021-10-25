import { contracts } from '../../config/config'
import { getPastEvents, getPastProposalsIds, transformToPercentage } from '../../handler/VotingHandler'
import { ParameterType } from '@q-dev/q-js-sdk'
import {
  getRootNodesInstance,
  getConstitutionVotingInstance,
  getGeneralUpdateVotingInstance,
  getEmergencyUpdateVotingInstance,
  getValidatorsSlashingVotingInstance,
  getRootNodesSlashingVotingInstance,
  getEpqfiParametersVotingInstance,
  getEpdrParametersVotingInstance
} from 'contracts/contract-instance'

export default class VotingService {
  constructor (contractName) {
    this.contract = contracts[contractName]
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
        return getRootNodesSlashingVotingInstance()
      }
      case 'RootsVoting': {
        return contracts.RootsVoting.methods
      }
      case 'EPQFIParametersVoting': {
        return getEpqfiParametersVotingInstance()
      }
      case 'EPDRParametersVoting': {
        return getEpdrParametersVotingInstance()
      }
    }
  }

  async getProposalsEvent () {
    return await getPastEvents(this.contract, 'ProposalCreated')
  }

  async getProposal (id) {
    const result = await this.contract.methods.proposals(id).call()
    return result
  }

  async getProposalStatus (id) {
    const result = await this.contract.methods.getStatus(id).call()
    return result
  }

  async getProposalStats (id) {
    const result = await this.contract.methods.getProposalStats(id).call()
    return result
  }

  async getVetoesNumber (id) {
    try {
      if (this.contract.methods.getVetosNumber) {
        const result = await this.contract.methods.getVetosNumber(id).call()
        return result
      } else {
        return 0
      }
    } catch (err) {
      console.error(id, 'error' + err)
      return 0
    }
  }

  async getVetoesPercentage (id) {
    const result = await this.contract.methods.getVetosPercentage(id).call()
    return result
  }

  async voteAgainst (id, userAddress) {
    const result = await this.contract.methods.voteAgainst(id).send({ from: userAddress })
    return result
  }

  async voteFor (id, userAddress) {
    const result = await this.contract.methods.voteFor(id).send({ from: userAddress })
    return result
  }

  async veto (id, userAddress) {
    const result = await this.contract.methods.veto(id).send({ from: userAddress })
    return result
  }

  async execute (id, userAddress) {
    const promiseStatus = await this.getProposalStatus(id)
    let result = null
    if (promiseStatus === '4') {
      result = await this.contract.methods.execute(id).send({ from: userAddress })
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
    // console.log(this.contractName)
    const proposalEvents = await this.getProposalsEvent()
    const proposalIds = proposalEvents.map((event) => event.returnValues._id)
    const allProposals = await contract.getProposals(...proposalIds)
    const endedProposals = allProposals.filter((obj) => obj.status === '1' || obj.status === '3' || obj.status === '4')
    return await Promise.all(endedProposals.map((prop) => this.getProposalData(prop, prop.id, prop.status)))
  }

  async getEndedProposals () {
    const contract = await this.switchContract()
    const proposalEvents = await this.getProposalsEvent()
    const proposalIds = proposalEvents.map((event) => event.returnValues._id)
    const allProposals = await contract.getProposals(...proposalIds)
    const endedProposals = allProposals.filter((obj) => obj.status !== '1' && obj.status !== '3' && obj.status !== '4')
    return await Promise.all(endedProposals.map((prop) => this.getProposalData(prop, prop.id, prop.status)))
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

    let ended = 0
    let active = 0

    await Promise.all(
      proposalIds.map(async (id) => {
        const promiseStatus = await this.getProposalStatus(id)
        if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4') {
          active++
        } else {
          ended++
        }
      })
    )

    return { ended, active }
  }

  transformParameterType (id) {
    const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean']
    return type[Number(id)]
  }

  async getParametersArr (id) {
    const result = await this.contract.methods.getParametersArr(id).call()
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
