import VotingService from './voting-service-helper'

import { getStatusTransformation } from './base-voting-helper'
import { parameterVote } from 'pages/UserPages/Proposals/components/CreateQProposalBtn/ModalCreateProposal/CreateStep2/QExpertS2/constants'
import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts'
import {
  getEpdrParametersVotingInstance,
  getEpqfiParametersVotingInstance,
  getEprsParametersVotingInstance
} from 'contracts/contract-instance'
import { ParameterType } from '@q-dev/q-js-sdk'
import { BN } from 'func/useful'

const proposalTitle = {
  [CONTRACTS_NAMES.ePRSParametersVoting]: 'Q Root Node Selection Expert Panel Parameters',
  [CONTRACTS_NAMES.ePDRParametersVoting]: 'DeFi Risk Expert Parameters Proposals',
  [CONTRACTS_NAMES.ePQFIParametersVoting]: 'Fees & Incentives Experts Parameters Proposals'
}

export default class ParametersVoting extends VotingService {
  async getProposalAdditionalData (data, id) {
    const info = {}
    const statsInfo = await this.getProposalStatsData(id)
    const weightAgainst = data.base.counters.weightAgainst
    const weightFor = data.base.counters.weightFor
    const parameters = []

    info.remark = data.base.remark
    info.vetosCount = data.base.counters.vetosCount
    info.votesAgainst = weightAgainst
    info.votesFor = weightFor
    info.type = proposalTitle[this.contractName]
    info.kindVoting = CONTRACT_TYPES.parameters

    if (data.parametersSize >= '1') {
      const proposalParametersData = await this.getProposalParametersData(id)
      parameters.push(proposalParametersData)
    }

    if (weightFor > 0 || weightAgainst > 0) {
      info.numberProposalVotes = {
        votesFor: Number(info.votesFor),
        votesAgainst: Number(info.votesAgainst)
      }
    }
    return {
      ...info,
      ...statsInfo,
      parameters
    }
  }

  getProposalData (data, id, status) {
    const info = {}
    info.id = id
    info.vetoEndTime = data.base.params.vetoEndTime
    info.votingEndTime = data.base.params.votingEndTime
    info.status = getStatusTransformation(status)
    info.title = proposalTitle[this.contractName]
    info.contract = this.contractName
    return info
  }

  async createProposal (data, userAddress) {
    const link = data['external-link']

    const paramInputs = data[parameterVote.parameterType].reduce((types, item, index) => {
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
        paramKey: data[parameterVote.parameterKey][index],
        paramValue: inputValue
      })
      return types
    }, [])

    switch (data[parameterVote.radioBtnName]) {
      case CONTRACT_TYPES.qFee: {
        const contract = await getEpqfiParametersVotingInstance()
        return await contract.createProposal(link, paramInputs, { from: userAddress })
      }
      case CONTRACT_TYPES.qDefi: {
        const contract = await getEpdrParametersVotingInstance()
        return await contract.createProposal(link, paramInputs, { from: userAddress })
      }
      case CONTRACT_TYPES.qEprs: {
        const contract = await getEprsParametersVotingInstance()
        return await contract.createProposal(link, paramInputs, { from: userAddress })
      }
    }
  }
}
