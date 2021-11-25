import VotingService from './voting-service-helper'
import { CONTRACTS_NAMES } from 'constants/contracts'

import { getStatusTransformation } from './base-voting-helper'
import { getEmergencyUpdateVotingInstance } from 'contracts/contract-instance'

export default class EmergencyUpdateVoting extends VotingService {
  async getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}
    let objStats = {}
    objRes.id = id
    objRes.remark = promiseRes.remark
    // number of voting people against
    const weightAgainst = promiseRes.counters.weightAgainst
    objRes.votesAgainst = weightAgainst
    // number of voting people for
    const weightFor = promiseRes.counters.weightFor
    objRes.votesFor = weightFor
    objRes.vetosCount = promiseRes.counters.vetosCount
    objRes.votingEndTime = promiseRes.params.votingEndTime
    objRes.vetoEndTime = promiseRes.params.vetoEndTime
    objRes.proposalExecutionP = promiseRes.params.proposalExecutionP
    objRes.status = getStatusTransformation(promiseStatus)
    objRes.title = 'Emergency update proposal'
    objRes.contract = CONTRACTS_NAMES.emergencyUpdateVoting
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
    const contract = await getEmergencyUpdateVotingInstance()
    const result = await contract.createProposal(link, { from: userAddress })
    return result
  }
}
