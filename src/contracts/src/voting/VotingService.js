import { contracts } from '../../config/config'
import {
  getPastEvents,
  getPastProposalsIds, transformToPercentage
} from '../../handler/VotingHandler'
import RootService from '../Root'
import { ParameterType } from '@q-dev/q-js-sdk'

export default class VotingService {
  constructor (contractName) {
    this.contract = contracts[contractName]
    this.contractName = contractName
  }

  async getProposalsEvent () {
    return await getPastEvents(this.contract, 'ProposalCreated')
  }

  async getProposal (id) {
    const result = await this.contract.methods.proposals(id)
      .call()
    return result
  }

  async getProposalStatus (id) {
    const result = await this.contract.methods.getStatus(id)
      .call()
    return result
  }

  async getProposalStats (id) {
    const result = await this.contract.methods.getProposalStats(id)
      .call()
    return result
  }

  async getVetoesNumber (id) {
    try {
      const result = await this.contract.methods.getVetosNumber(id)
        .call()
      return result
    } catch (err) {
      console.log(id, 'error' + err)
      return 0
    }
  }

  async getVetoesPercentage (id) {
    const result = await this.contract.methods.getVetosPercentage(id)
      .call()
    return result
  }

  async voteAgainst (id, userAddress) {
    const result = await this.contract.methods.voteAgainst(id)
      .send(
        { from: userAddress })
    return result
  }

  async voteFor (id, userAddress) {
    const result = await this.contract.methods.voteFor(id)
      .send(
        { from: userAddress })
    return result
  }

  async veto (id, userAddress) {
    const result = await this.contract.methods.veto(id)
      .send(
        { from: userAddress })
    return result
  }

  async execute (id, userAddress) {
    const promiseStatus = await this.getProposalStatus(id)
    let result = null
    if (promiseStatus === '4') {
      result = await this.contract.methods.execute(id)
        .send(
          { from: userAddress })
    }
    return result
  }

  async getOneProposal (id) {
    if (id) {
      let objRes = null
      const promiseStatus = await this.getProposalStatus(id)
      if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4' ||
        promiseStatus === '5') {
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

  async getProposalData (promiseRes, id, promiseStatus) {
  }

  async getProposals () {
    const proposalEvents = await this.getProposalsEvent()
    const proposalIds = getPastProposalsIds(proposalEvents)
    const proposals = []
    if (proposalIds) {
      for (const id of proposalIds) {
        let objRes = {}
        const promiseStatus = await this.getProposalStatus(id)
        if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4') {
          const promiseRes = await this.getProposal(id)
          if (promiseRes) {
            objRes = await this.getProposalData(promiseRes, id, promiseStatus)
            proposals.push(objRes)
          }
        }
      }
    }
    return proposals
  }

  async getEndedProposals () {
    const proposalEvents = await this.getProposalsEvent()
    const proposalIds = getPastProposalsIds(proposalEvents)
    const proposals = []
    if (proposalIds) {
      for (const id of proposalIds) {
        let objRes = {}
        const promiseStatus = await this.getProposalStatus(id)
        if (promiseStatus !== '1' || promiseStatus !== '3' || promiseStatus !== '4') {
          const promiseRes = await this.getProposal(id)
          if (promiseRes) {
            objRes = await this.getProposalData(promiseRes, id, promiseStatus)
            proposals.push(objRes)
          }
        }
      }
    }
    return proposals
  }

  async getRootNodesNumber () {
    const root = new RootService()
    return await root.contract.methods.getSize().call()
  }

  async getProposalStatsData (id) {
    const objRes = {}
    const proposalStats = await this.getProposalStats(id)
    const getVetoesNumber = await this.getVetoesNumber(id)
    const rootNodesNumber = await this.getRootNodesNumber()
    objRes.vetoesNumber = getVetoesNumber
    objRes.noVote = rootNodesNumber - getVetoesNumber
    objRes.vetoesPercentage = getVetoesNumber * 100 / rootNodesNumber
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
    let proposalsActive = 0
    let proposalsEnded = 0
    if (proposalIds) {
      for (const id of proposalIds) {
        const promiseStatus = await this.getProposalStatus(id)
        if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4') {
          proposalsActive++
        } else {
          proposalsEnded++
        }
      }
    }
    return {
      ended: proposalsEnded,
      active: proposalsActive
    }
  }

  transformParameterType (id) {
    const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean']
    return type[Number(id)]
  }

  async getParametersArr (id) {
    const result = await this.contract.methods.getParametersArr(id)
      .call()
    return result
  }

  async getProposalParametersData (id) {
    const parameters = await this.getParametersArr(id)
    return parameters.map(item => {
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
