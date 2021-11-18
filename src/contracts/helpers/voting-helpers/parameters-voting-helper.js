import VotingService from './voting-service-helper'

import { getStatusTransformation } from './base-voting-helper'
import { BN } from 'func/useful'
import { ParameterType } from '@q-dev/q-js-sdk'
import { parameterVote } from 'pages/UserPages/Proposals/components/CreateQProposalBtn/ModalCreateProposal/CreateStep2/QExpertS2/constants'
import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts'
import { getEpdrParametersVotingInstance, getEpqfiParametersVotingInstance } from 'contracts/contract-instance'

export default class ParametersVoting extends VotingService {
  async getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}
    let objStats = {}
    let parameters = []
    objRes.id = id
    objRes.remark = promiseRes.base.remark
    objRes.vetosCount = promiseRes.base.counters.vetosCount
    const weightAgainst = promiseRes.base.counters.weightAgainst
    objRes.votesAgainst = weightAgainst

    const weightFor = promiseRes.base.counters.weightFor
    objRes.votesFor = weightFor

    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime

    objRes.votingEndTime = promiseRes.base.params.votingEndTime

    objRes.status = getStatusTransformation(promiseStatus)
    objRes.title =
      this.contractName === CONTRACTS_NAMES.ePDRParametersVoting
        ? 'DeFi Risk Expert parameter voting proposals'
        : 'Fees & Incentives Experts parameter voting proposals'
    objRes.type =
      this.contractName === CONTRACTS_NAMES.ePDRParametersVoting
        ? 'DeFi Risk Expert Parameters Proposals'
        : 'Fees & Incentives Experts Parameters Proposals'
    objRes.kindVoting = CONTRACT_TYPES.parameters
    objStats = await this.getProposalStatsData(id)
    objRes.contract = this.contractName
    const parametersSize = promiseRes.parametersSize
    if (parametersSize >= '1') {
      parameters = await this.getProposalParametersData(id)
    }
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

  async createProposal (data) {
    let result = {}
    const link = data['external-link']
    const paramInputs = data[parameterVote.parameterType].reduce((types, item, index) => {
      let inputValue = data[parameterVote.parameterValue][index]
      switch (+item) {
        case ParameterType.BOOL:
          inputValue = inputValue.toLowerCase() === 'true'
          break
        case ParameterType.UINT:
          inputValue = BN(inputValue).toFixed()
          break
      }
      types.push({
        paramType: item,
        paramKey: data[parameterVote.parameterKey][index],
        paramValue: inputValue
      })
      return types
    }, [])
    switch (data[parameterVote.radioBtnName]) {
      case CONTRACT_TYPES.qFee: {
        const contract = await getEpqfiParametersVotingInstance()
        result = contract.createProposal(link, paramInputs)
        break
      }
      case CONTRACT_TYPES.qDefi: {
        const contract = await getEpdrParametersVotingInstance()
        result = contract.createProposal(link, paramInputs)
        break
      }
    }
    return result
  }
}
