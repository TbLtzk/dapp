import VotingService from './voting-service-helper'
import { CONTRACTS_NAMES } from 'constants/contracts'

import { getStatusTransformation } from './base-voting-helper'
import { fromWei } from 'func/balance'
import { getGeneralUpdateVotingInstance } from 'contracts/contract-instance'

export default class GeneralUpdateVoting extends VotingService {
  async getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}
    let objStats = {}
    objRes.id = id
    objRes.remark = promiseRes.remark
    const weightAgainst = promiseRes.counters.weightAgainst
    objRes.votesAgainst = fromWei(weightAgainst)
    const weightFor = promiseRes.counters.weightFor
    objRes.votesFor = fromWei(weightFor)

    objRes.vetosCount = promiseRes.counters.vetosCount
    objRes.votingEndTime = promiseRes.params.votingEndTime
    objRes.vetoEndTime = promiseRes.params.vetoEndTime
    objRes.proposalExecutionP = promiseRes.params.proposalExecutionP
    objRes.status = getStatusTransformation(promiseStatus)
    objRes.title = 'General update proposal'
    objRes.contract = CONTRACTS_NAMES.generalUpdateVoting
    objStats = await this.getProposalStatsData(id)

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      }
    }

    return { ...objRes, ...objStats }
  }

  async createProposal (data, userAddress) {
    const link = data['external-link']
    const contract = await getGeneralUpdateVotingInstance()
    const result = await contract.createProposal(link, { from: userAddress })
    return result
  }
}
