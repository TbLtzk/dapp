import { contracts } from '../../config/config'
import { getPercentageFormat } from '../../handler/VotingHandler'
import { STATUSES } from 'constants/statuses'
/* contacts: RootNodesSlashingEscrow, ValidatorsSlashingEscrow */
export default class SlashingEscrow {
  constructor (contractName) {
    this.contract = contracts[contractName]
    this.contractName = contractName
  }

  getTitleStatus (statusID) {
    const status = [
      STATUSES.none,
      STATUSES.open,
      STATUSES.accepted,
      STATUSES.pending,
      STATUSES.decided,
      STATUSES.executed
    ]
    return status[Number(statusID)]
  }

  async getStatus (id) {
    const result = await this.contract.methods.getStatus(id)
      .call()
    return result
  }

  async getDecisionStats (id) {
    const result = await this.contract.methods.getDecisionStats(id)
      .call()
    return result
  }

  async recallProposedDecision (id, userAddress) {
    const result = await this.contract.methods.recallProposedDecision(id)
      .send(
        { from: userAddress })
    return result
  }

  async confirmDecision (id, userAddress) {
    const result = await this.contract.methods.confirmDecision(id)
      .send(
        { from: userAddress })
    return result
  }

  async getArbitrationInfos (id) {
    const result = await this.contract.methods.arbitrationInfos(id)
      .call()
    return result
  }

  async castObjection (id, link, userAddress) {
    const result = await this.contract.methods.castObjection(id, link)
      .send(
        { from: userAddress })
    return result
  }

  async execute (id, userAddress) {
    const result = await this.contract.methods.execute(id)
      .send({
        from: userAddress
      })
    return result
  }

  async proposeDecision (id, percentage, notAppealed, link, userAddress) {
    const percentageStake = getPercentageFormat(percentage)
    const result = await this.contract.methods.proposeDecision(id, percentageStake, notAppealed, link)
      .send(
        { from: userAddress })
    return result
  }

  async setProposerRemark (id, proposerRemark, appealConfirmed, userAddress) {
    const result = await this.contract.methods.setProposerRemark(id, proposerRemark, appealConfirmed)
      .send(
        { from: userAddress })
    return result
  }
}
