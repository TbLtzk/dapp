import { getPercentageFormat } from './base-voting-helper'
import { STATUSES } from 'constants/statuses'
import { getRootNodeSlashingEscrowInstance, getValidatorSlashingEscrowInstance } from 'contracts/contract-instance'
import { CONTRACTS_NAMES } from 'constants/contracts'

async function switchInstance (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.rootNodesSlashingEscrow:
      return await getRootNodeSlashingEscrowInstance()
    case CONTRACTS_NAMES.validatorsSlashingEscrow:
      return await getValidatorSlashingEscrowInstance()
    default:
      return {}
  }
}

export default class SlashingEscrow {
  constructor (contractName) {
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
    const contract = await switchInstance(this.contractName)
    const result = await contract.instance.methods.getStatus(id).call()
    return result
  }

  async getDecisionStats (id) {
    const contract = await switchInstance(this.contractName)
    const result = await contract.instance.methods.getDecisionStats(id).call()
    return result
  }

  async recallProposedDecision (id, userAddress) {
    const contract = await switchInstance(this.contractName)
    const result = await contract.recallProposedDecision(id, { from: userAddress })
    return result
  }

  async confirmDecision (id, userAddress) {
    const contract = await switchInstance(this.contractName)
    const { decision } = await contract.arbitrationInfos(id)
    const result = await contract.confirmDecision(id, decision.hash, { from: userAddress })
    return result
  }

  async getArbitrationInfos (id) {
    const contract = await switchInstance(this.contractName)
    const result = await contract.arbitrationInfos(id)
    return result
  }

  async castObjection (id, link, userAddress) {
    const contract = await switchInstance(this.contractName)
    const result = await contract.castObjection(id, link, { from: userAddress })
    return result
  }

  async execute (id, userAddress) {
    const contract = await switchInstance(this.contractName)
    const result = await contract.execute(id, { from: userAddress })
    return result
  }

  async proposeDecision (id, percentage, notAppealed, link, userAddress) {
    const contract = await switchInstance(this.contractName)
    const percentageStake = getPercentageFormat(percentage)
    const result = await contract.proposeDecision(id, percentageStake, notAppealed, link, {
      from: userAddress
    })
    return result
  }

  async setProposerRemark (id, proposerRemark, appealConfirmed, userAddress) {
    const contract = await switchInstance(this.contractName)
    const result = await contract.setProposerRemark(id, proposerRemark, appealConfirmed, { from: userAddress })
    return result
  }
}
