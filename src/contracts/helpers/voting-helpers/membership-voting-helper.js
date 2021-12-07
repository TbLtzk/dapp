import VotingService from './voting-service-helper'

import { getStatusTransformation } from './base-voting-helper'

import { fromWei } from 'func/balance'
import { CONTRACTS_NAMES, CONTRACT_TYPES } from 'constants/contracts'

export default class MembershipVoting extends VotingService {
  // proposal.contract proposal.status proposal.title proposal.id proposal.votingEndTime proposal.vetoEndTime
  async getProposalAdditionalData (promiseRes, id) {
    const objRes = {}
    let objStats = {}
    objRes.remark = promiseRes.base.remark
    objRes.addressToAdd = promiseRes.proposalDetails.addressToAdd
    objRes.addressToRemove = promiseRes.proposalDetails.addressToRemove
    objRes.vetosCount = promiseRes.base.counters.vetosCount
    const weightAgainst = promiseRes.base.counters.weightAgainst
    objRes.votesAgainst = fromWei(weightAgainst)
    const weightFor = promiseRes.base.counters.weightFor
    objRes.votesFor = fromWei(weightFor)

    objRes.type =
      this.contractName === CONTRACTS_NAMES.ePDRMembershipVoting
        ? 'DeFi Risk Expert membership'
        : 'Fees & Incentives Experts membership'
    objRes.kindVoting = 'membership'
    objStats = await this.getProposalStatsData(id)

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      }
    }
    return { ...objRes, ...objStats }
  }

  getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}

    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime
    objRes.votingEndTime = promiseRes.base.params.votingEndTime
    objRes.title =
      this.contractName === CONTRACTS_NAMES.ePDRMembershipVoting
        ? 'DeFi Risk Expert membership proposals'
        : 'Fees & Incentives Experts membership proposals'
    objRes.status = getStatusTransformation(promiseStatus)
    objRes.contract = this.contractName
    objRes.id = id

    return objRes
  }

  async createProposal (data, userAddress) {
    let result = null
    const link = data['external-link']
    const candidate = data.address
    if (data?.first === CONTRACT_TYPES.addNewExpert) {
      result = await this.contract.createAddExpertProposal(link, candidate, { from: userAddress })
    } else if (data?.first === CONTRACT_TYPES.removeCurrentExpert) {
      result = await this.contract.createRemoveExpertProposal(link, candidate, { from: userAddress })
    }
    return result
  }
}
