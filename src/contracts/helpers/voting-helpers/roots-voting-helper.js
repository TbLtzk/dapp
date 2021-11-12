import { getStatusTransformation } from './base-voting-helper'
import VotingService from './voting-service-helper'
import { fromWei } from 'func/balance'
import { CONTRACT_TYPES } from 'constants/contracts'

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000'

export default class RootsVoting extends VotingService {
  checkProposalTitle (candidateAddress, replaceDestAddress) {
    if (candidateAddress !== EMPTY_ADDR && replaceDestAddress !== EMPTY_ADDR) {
      return 'Rode Node Swapping Proposal'
    } else if (candidateAddress && replaceDestAddress === EMPTY_ADDR) {
      return 'Root Node Adding Proposal'
    } else if (candidateAddress === EMPTY_ADDR && replaceDestAddress) {
      return 'Root Node Removing proposal'
    }
  }

  async getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}
    let objStats = {}
    objRes.id = id
    objRes.remark = promiseRes.base.remark
    const candidateAddress = promiseRes.candidate
    objRes.candidate = candidateAddress
    const replaceDestAddress = promiseRes.replaceDest
    objRes.replaceDest = replaceDestAddress
    objRes.votesCount = promiseRes.votesCount

    const weightAgainst = promiseRes.base.counters.weightAgainst
    objRes.votesAgainst = fromWei(weightAgainst)

    const weightFor = promiseRes.base.counters.weightFor
    objRes.votesFor = fromWei(weightFor)
    objRes.requiredMajority = promiseRes.base.params.requiredMajority
    objRes.requiredQuorum = promiseRes.base.params.requiredQuorum

    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime
    objRes.vetoThreshold = promiseRes.base.params.vetoThreshold

    objRes.votingEndTime = promiseRes.base.params.votingEndTime
    objRes.title = this.checkProposalTitle(candidateAddress, replaceDestAddress)

    objStats = await this.getProposalStatsData(id)
    objRes.status = getStatusTransformation(promiseStatus)
    objRes.contract = this.contractName

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      }
    }
    return { ...objRes, ...objStats }
  }

  async isUserVote (id, address) {
    const contract = await this.switchContract()

    try {
      const result = await contract.votes(id, address)
      return result
    } catch (e) {
      console.error(e)
    }
  }

  async createProposal (data, userAddress) {
    const contract = await this.witchContract()

    let result = null
    const hash = data.hash ?? '0x00'
    const link = data['external-link']
    const addressToRemove = data.address
    if (data.first === CONTRACT_TYPES.addAnewRootNode) {
      const removeCurrent = data['remove-current']
      if (removeCurrent === 'no') {
        result = await contract.createProposal(link, hash, userAddress, EMPTY_ADDR, { from: userAddress })
      } else {
        result = await contract.createProposal(link, hash, userAddress, addressToRemove, { from: userAddress })
      }
    } else if (data.first === CONTRACT_TYPES.removeACurrentRootNode) {
      result = await contract.createProposal(link, hash, EMPTY_ADDR, addressToRemove, { from: userAddress })
    }
    return result
  }
}
