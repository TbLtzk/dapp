import { contracts } from '../../config/config'
import VotingService from './VotingService'
import { constitutionVotingInstance } from '../../contracts'

import { getPastProposalsIds, getStatusTransformation } from '../../handler/VotingHandler'
import { fromWei } from 'func/balance'
import { BN } from 'func/useful'
import { ParameterType } from '@q-dev/q-js-sdk'

export default class ConstitutionVoting extends VotingService {
  constructor () {
    super()
    this.contract = contracts.ConstitutionVoting
    this.contractName = 'ConstitutionVoting'
  }

  /**
   * get proposal sting type
   * @param type
   * @return string
   */
  getProposalStringType (type) {
    switch (Number(type)) {
      case 0:
        return 'Basic'
      case 1:
        return 'Fundamental'
      case 2:
        return 'Detailed'
      default:
        return 'None'
    }
  }

  async getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}
    let objStats = {}
    let parameters = []
    objRes.id = id
    objRes.remark = promiseRes.base.remark
    const proposalType = this.getProposalStringType(promiseRes.classification)
    objRes.type = proposalType
    objRes.newConstitutionHash = promiseRes.newConstitutionHash
    objRes.currentConstitutionHash = promiseRes.currentConstitutionHash
    const parametersSize = promiseRes.parametersSize
    if (parametersSize >= '1') {
      parameters = await this.getProposalParametersData(id)
    }
    const weightAgainst = promiseRes.base.counters.weightAgainst
    objRes.votesAgainst = fromWei(weightAgainst)
    const weightFor = promiseRes.base.counters.weightFor
    objRes.votesFor = fromWei(weightFor)
    objRes.vetosCount = promiseRes.base.counters.vetosCount
    objRes.votingEndTime = promiseRes.base.params.votingEndTime
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime

    objRes.status = getStatusTransformation(promiseStatus)
    objRes.title = `${proposalType} constitution proposal`
    objStats = await this.getProposalStatsData(id)
    objRes.contract = this.contractName

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      }
    }

    return {
      ...objRes,
      ...objStats,
      parameters: parameters
    }
  }

  /**
   * get proposal number type
   * @param type
   * @return number
   */
  getProposalNumberType (type) {
    switch (type) {
      case 'basic-part':
        return 0
      case 'fundamental-part':
        return 1
      case 'detailed-part':
        return 2
      default:
        return 0
    }
  }

  async createProposal (data, userAddress) {
    let result = null
    const classification = this.getProposalNumberType(data?.classification)
    const hash = data.hash
    const link = data['external-link']
    const paramInputs = data['type-proposal'] === undefined
      ? []
      : data['type-proposal'].reduce((types, item, index) => {
        let inputValue = data['parameter-value'][index]
        switch (+item) {
          case ParameterType.BOOL:
            inputValue = (inputValue.toLowerCase() === 'true')
            break
          case ParameterType.UINT:
            inputValue = BN(inputValue)
              .toFixed()
            break
        }
        types.push({
          paramType: item,
          paramKey: data['parameter-key'][index],
          paramValue: inputValue
        })
        return types
      }, [])
    if (paramInputs.length !== 0) {
      try {
        result = await constitutionVotingInstance.createProposal(link, classification, hash, paramInputs, {
          from: userAddress
        })
      } catch (e) {
        console.error(e)
        console.error('Please provide a valid input')
      }
    } else {
      try {
        result = await constitutionVotingInstance.createProposal(link, classification, hash, [], { from: userAddress })
      } catch (e) {
        console.error('Please provide a valid hash')
      }
    }
    return result
  }

  async getConstitutionHash () {
    const result = await this.contract.methods.constitutionHash().call()
    return result
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
}
