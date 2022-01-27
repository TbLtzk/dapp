import VotingService from './voting-service-helper'

import { getStatusTransformation } from './base-voting-helper'
import { fromWei } from 'func/balance'
import { BN } from 'func/useful'
import { ParameterType } from '@q-dev/q-js-sdk'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { getConstitutionVotingInstance } from 'contracts/contract-instance'

export default class ConstitutionVoting extends VotingService {
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

  async getProposalAdditionalData (promiseRes, id) {
    const objRes = {}
    let objStats = {}
    let parameters = []
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

    objStats = await this.getProposalStatsData(id)

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

  getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}
    objRes.contract = CONTRACTS_NAMES.constitutionVoting
    const proposalType = this.getProposalStringType(promiseRes.classification)
    objRes.status = getStatusTransformation(promiseStatus)
    objRes.title = `${proposalType} constitution proposal`
    objRes.id = id
    objRes.votingEndTime = promiseRes.base.params.votingEndTime
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime
    return objRes
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
    const contract = await this.getContractInstance()
    const classification = this.getProposalNumberType(data?.classification)
    const hash = data.hash
    const link = data['external-link']
    const changeParams = data['change-constitution-parameter'] === 'no'
    const paramInputs = changeParams
      ? []
      : data['parameter-type'].reduce((types, item, index) => {
        let inputValue = data['parameter-value'][index]
        switch (Number(item)) {
          case ParameterType.BOOL:
            inputValue = inputValue.toLowerCase() === 'true'
            break
          case ParameterType.UINT:
            inputValue = BN(inputValue).toFixed()
            break
        }
        types.push({
          paramType: item,
          paramKey: data['parameter-key'][index],
          paramValue: inputValue
        })
        return types
      }, [])
    return await contract.createProposal(link, classification, hash, paramInputs, {
      from: userAddress
    })
  }

  async getConstitutionHash () {
    const contract = await getConstitutionVotingInstance()
    const result = await contract.constitutionHash()
    return result
  }
}
