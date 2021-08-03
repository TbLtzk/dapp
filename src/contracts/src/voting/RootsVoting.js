import { contracts } from '../../config/config'
import {
  getStatusTransformation
} from '../../handler/VotingHandler'
import VotingService from './VotingService'
import { fromWei } from 'func/balance'

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000'

export default class RootsVoting extends VotingService {
  constructor () {
    super()
    this.contract = contracts.RootsVoting
    this.contractName = 'RootsVoting'
  }

  /**
   * check proposal type depends on candidate and replaceDest addresses
   * @param candidateAddress
   * @param replaceDestAddress
   * @return string
   */
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
    // objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
    // objRes.votesFor = promiseRes.base.counters.weightFor;
    const weightAgainst = promiseRes.base.counters.weightAgainst
    objRes.votesAgainst = fromWei(weightAgainst)

    const weightFor = promiseRes.base.counters.weightFor
    objRes.votesFor = fromWei(weightFor)
    objRes.requiredMajority = promiseRes.base.params.requiredMajority
    objRes.requiredQuorum = promiseRes.base.params.requiredQuorum
    // the ending is given by: vetoEndTime.
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime
    objRes.vetoThreshold = promiseRes.base.params.vetoThreshold
    // the time until when users can vote
    objRes.votingEndTime = promiseRes.base.params.votingEndTime
    objRes.title = this.checkProposalTitle(candidateAddress, replaceDestAddress)
    // let getVotesAddress = await this.isUserVote(id, "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7");
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
    try {
      const result = await this.RootsVoting.methods.votes(id, address)
        .call()
      return result
    } catch (e) {
      console.error(e)
    }
  }

  async createProposal (data, userAddress) {
    let result = null
    const hash = data.hash ?? '0x00'
    const link = data['external-link']
    const addressToRemove = data.address
    if (data.first === 'add-a-new-root-node') {
      const removeCurrent = data['remove-current']
      if (removeCurrent === 'no') {
        result = await this.contract.methods.createProposal(link, hash, userAddress, EMPTY_ADDR)
          .send({ from: userAddress })
      } else {
        result = await this.contract.methods.createProposal(link, hash, userAddress, addressToRemove)
          .send({ from: userAddress })
      }
    } else if (data.first === 'remove-a-current-root-node') {
      result = await this.contract.methods.createProposal(link, hash, EMPTY_ADDR, addressToRemove)
        .send(
          { from: userAddress })
    }
    return result
  }
}
