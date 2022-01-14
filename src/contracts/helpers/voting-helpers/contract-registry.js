import VotingService from './voting-service-helper'

export default class ContractRegistry extends VotingService {
  async getProposal (id, type) {
    const contract = await this.getContractInstance()
    let additionalInfo = {}
    let headerInfo = {}
    const userVotedVetoed = {}
    const proposal = await contract.getProposal(id)
    const status = await contract.getStatus(id)
    headerInfo = this.getProposalData(proposal, id, status)
    if (type === 'full') {
      additionalInfo = await this.getProposalAdditionalData(proposal, id)
    }
    return { ...headerInfo, ...additionalInfo, ...userVotedVetoed, error: false }
  }

  getProposalData (proposal, id, status) {
    const objRes = {}
    objRes.contract = this.contractName

    objRes.status = status // ??
    objRes.id = id
    objRes.votingStartTime = proposal.votingStartTime
    objRes.votingExpiredTime = proposal.votingExpiredTime
    objRes.title = this.contractName
    if (this.contractName) {
      objRes.implementation = proposal.implementation
    } else {
      objRes.key = proposal.key
    }
    objRes.proxy = proposal.proxy

    return objRes
  }

  async getProposalAdditionalData (proposal, id) {
    return {}
  }
}
