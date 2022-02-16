import VotingService from './voting-service-helper'

import { getStatusTransformation } from './base-voting-helper'

import { fromWei } from 'func/balance'
import { CONTRACTS_NAMES, CONTRACT_TYPES } from 'constants/contracts'

const proposalTitle = {
  [CONTRACTS_NAMES.ePRSMembershipVoting]: 'Q Root Node Selection Expert Panel',
  [CONTRACTS_NAMES.ePDRMembershipVoting]: 'DeFi Risk Expert membership',
  [CONTRACTS_NAMES.ePQFIMembershipVoting]: 'Fees & Incentives Experts membership'
}

export default class MembershipVoting extends VotingService {
  getProposalData (promiseRes, id, promiseStatus) {
    const info = {}
    info.vetoEndTime = promiseRes.base.params.vetoEndTime
    info.votingEndTime = promiseRes.base.params.votingEndTime
    info.title = proposalTitle[this.contractName]
    info.status = getStatusTransformation(promiseStatus)
    info.contract = this.contractName
    info.id = id
    return info
  }

  async getProposalAdditionalData (promiseRes, id) {
    const info = {}
    const statsInfo = await this.getProposalStatsData(id)
    const weightFor = promiseRes.base.counters.weightFor
    const weightAgainst = promiseRes.base.counters.weightAgainst

    info.remark = promiseRes.base.remark
    info.addressToAdd = promiseRes.proposalDetails.addressToAdd
    info.addressToRemove = promiseRes.proposalDetails.addressToRemove
    info.vetosCount = promiseRes.base.counters.vetosCount
    info.votesFor = fromWei(weightFor)
    info.votesAgainst = fromWei(weightAgainst)
    info.type = proposalTitle[this.contractName]
    info.kindVoting = 'membership'

    if (weightFor > 0 || weightAgainst > 0) {
      info.numberProposalVotes = {
        votesFor: Number(info.votesFor),
        votesAgainst: Number(info.votesAgainst)
      }
    }
    return { ...info, ...statsInfo }
  }

  async createProposal (data, userAddress) {
    const contract = await this.getContractInstance()
    const link = data['external-link']
    const candidate = data.address
    if (data?.first === CONTRACT_TYPES.addNewExpert) {
      console.log(link, candidate, { from: userAddress })
      return await contract.createAddExpertProposal(link, candidate, { from: userAddress })
    } else if (data?.first === CONTRACT_TYPES.removeCurrentExpert) {
      return await contract.createRemoveExpertProposal(link, candidate, { from: userAddress })
    }
  }
}
