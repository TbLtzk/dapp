import VotingService from './voting-service-helper'
import SlashingEscrow from './slashing-escrow-helper'

import { getStatusTransformation, getPercentageFormat, transformToPercentage } from './base-voting-helper'
import { fromWei } from 'func/balance'
import { fromSolDateFormattingT1 } from 'func/date'
import { CONTRACTS_NAMES } from 'constants/contracts'

export default class SlashingVoting extends VotingService {
  async getProposalAdditionalData (promiseRes, id) {
    const objRes = {}

    let objStats = {}
    const objEscrow = {
      objEscrow: {
        objection: {},
        decision: {}
      }
    }

    const isValidatorSlashingMode = this.contractName === CONTRACTS_NAMES.validatorsSlashingVoting

    objRes.remark = promiseRes.base.remark
    objRes.candidate = promiseRes.candidate
    objRes.amountToSlash = fromWei(promiseRes.amountToSlash)
    objRes.vetosCount = promiseRes.base.counters.vetosCount
    const weightAgainst = promiseRes.base.counters.weightAgainst
    objRes.votesAgainst = isValidatorSlashingMode ? weightAgainst : fromWei(weightAgainst)
    const weightFor = promiseRes.base.counters.weightFor
    objRes.votesFor = isValidatorSlashingMode ? weightFor : fromWei(weightFor)
    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      }
    }

    objRes.type = isValidatorSlashingMode ? 'validator slashing' : 'root nodes slashing'
    objStats = await this.getProposalStatsData(id)
    if (promiseRes.status === '5') {
      const SlashingEscrowContractName = isValidatorSlashingMode
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow
      const SlashingEscrowContract = new SlashingEscrow(SlashingEscrowContractName)
      objEscrow.objEscrow.objection.statusObjection = SlashingEscrowContract.getTitleStatus(
        await SlashingEscrowContract.getStatus(id)
      )
      const escrowArbitrationInfo = await SlashingEscrowContract.getArbitrationInfos(id)
      const escrowDecisionStats = await SlashingEscrowContract.getDecisionStats(id)
      objEscrow.objEscrow.objection.executed = escrowArbitrationInfo.executed
      objEscrow.objEscrow.objection.remark = escrowArbitrationInfo.remark
      objEscrow.objEscrow.objection.slashedAmount = fromWei(escrowArbitrationInfo.params.slashedAmount)
      objEscrow.objEscrow.objection.objectionEndTime = fromSolDateFormattingT1(
        escrowArbitrationInfo.params.objectionEndTime
      )
      objEscrow.objEscrow.objection.appealEndTime = fromSolDateFormattingT1(escrowArbitrationInfo.params.appealEndTime)
      objEscrow.objEscrow.objection.proposerRemark = escrowArbitrationInfo.proposerRemark
      objEscrow.objEscrow.objection.appealConfirmed = escrowArbitrationInfo.appealConfirmed
      objEscrow.objEscrow.decision.confirmationCount = escrowArbitrationInfo.decision.confirmationCount
      objEscrow.objEscrow.decision.endDate = fromSolDateFormattingT1(escrowArbitrationInfo.decision.endDate)
      objEscrow.objEscrow.decision.externalReference = escrowArbitrationInfo.decision.externalReference
      objEscrow.objEscrow.decision.notAppealed = escrowArbitrationInfo.decision.notAppealed
      objEscrow.objEscrow.decision.percentage = transformToPercentage(escrowArbitrationInfo.decision.percentage)
      objEscrow.objEscrow.decision.proposer = escrowArbitrationInfo.decision.proposer
      objEscrow.objEscrow.decision.confirmationCount = escrowDecisionStats.confirmationCount
      objEscrow.objEscrow.decision.currentConfirmationPercentage = transformToPercentage(
        escrowDecisionStats.currentConfirmationPercentage
      )
      objEscrow.objEscrow.decision.requiredConfirmations = escrowDecisionStats.requiredConfirmations
    }

    return { ...objRes, ...objStats, ...objEscrow }
  }

  getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {}
    objRes.id = id
    objRes.contract = this.contractName
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime
    objRes.votingEndTime = promiseRes.base.params.votingEndTime
    objRes.status = getStatusTransformation(promiseStatus)
    const isValidatorSlashingMode = this.contractName === CONTRACTS_NAMES.validatorsSlashingVoting
    objRes.title = isValidatorSlashingMode ? 'Validator slashing proposals' : 'Root Nodes slashing proposals'

    return objRes
  }

  async createProposal (data, userAddress) {
    const contract = await this.getContractInstance()

    const link = data['external-link']
    let percentageStake = data['%-value']
    percentageStake = getPercentageFormat(percentageStake)
    const candidate = data.address
    const result = await contract.createProposal(link, candidate, percentageStake, { from: userAddress })
    return result
  }
}
