import VotingService from './VotingService';
import SlashingEscrow from './SlashingEscrow';

import {
  getStatusTransformation,
  getPercentageFormat,
  transformToPercentage
} from '../../handler/VotingHandler';
import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';

/*contacts: RootNodesSlashingVoting, ValidatorsSlashingVoting*/
export default class SlashingVoting extends VotingService {

  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    let objStats = {};
    let objEscrow = {
      objEscrow: {
        objection: {},
        decision: {}
      },
    };

    const isValidatorSlashingMode = this.contractName === 'ValidatorsSlashingVoting'; // else rootnode slashing mode

    objRes.id = id;
    objRes.remark = promiseRes.base.remark;
    objRes.candidate = promiseRes.candidate;
    objRes.amountToSlash = fromWei(promiseRes.amountToSlash);
    objRes.vetosCount = promiseRes.base.counters.vetosCount;
    //number of voting people/Q tokens against
    const weightAgainst = promiseRes.base.counters.weightAgainst;
    objRes.votesAgainst = isValidatorSlashingMode ? weightAgainst : fromWei(weightAgainst);
    //number of voting people/Q tokens for
    const weightFor = promiseRes.base.counters.weightFor;
    objRes.votesFor = isValidatorSlashingMode ? weightFor: fromWei(weightFor);
    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number( objRes.votesAgainst)
      };
    }
    //the ending is given by: vetoEndTime.
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
    //the time until when users can vote
    objRes.votingEndTime = promiseRes.base.params.votingEndTime;

    objRes.status = getStatusTransformation(promiseStatus);
    objRes.title = isValidatorSlashingMode
      ? 'Validator slashing proposals' : 'Root Nodes slashing proposals';
    objRes.type = isValidatorSlashingMode
      ? 'validator slashing' : 'root nodes slashing';
    objStats = await this.getProposalStatsData(id);
    objRes.contract = this.contractName;
    if (promiseStatus === '5') {
      const SlashingEscrowContractName = isValidatorSlashingMode
        ? 'ValidatorsSlashingEscrow' : 'RootNodesSlashingEscrow';
      const SlashingEscrowContract = new SlashingEscrow(SlashingEscrowContractName);
      objEscrow.objEscrow.objection.statusObjection =
        SlashingEscrowContract.getTitleStatus(await SlashingEscrowContract.getStatus(id));
      const escrowArbitrationInfo = await SlashingEscrowContract.getArbitrationInfos(id);
      const escrowDecisionStats = await SlashingEscrowContract.getDecisionStats(id);
      objEscrow.objEscrow.objection.executed = escrowArbitrationInfo.executed;
      objEscrow.objEscrow.objection.remark = escrowArbitrationInfo.remark;
      objEscrow.objEscrow.objection.slashedAmount = fromWei(escrowArbitrationInfo.params.slashedAmount);
      objEscrow.objEscrow.objection.objectionEndTime = fromSolDateFormattingT1(escrowArbitrationInfo.params.objectionEndTime);
      objEscrow.objEscrow.objection.appealEndTime = fromSolDateFormattingT1(escrowArbitrationInfo.params.appealEndTime);
      objEscrow.objEscrow.decision.confirmationCount = escrowArbitrationInfo.decision.confirmationCount;
      objEscrow.objEscrow.decision.endDate = fromSolDateFormattingT1(escrowArbitrationInfo.decision.endDate);
      objEscrow.objEscrow.decision.externalReference = escrowArbitrationInfo.decision.externalReference;
      objEscrow.objEscrow.decision.notAppealed = escrowArbitrationInfo.decision.notAppealed;
      objEscrow.objEscrow.decision.percentage = transformToPercentage(escrowArbitrationInfo.decision.percentage);
      objEscrow.objEscrow.decision.proposer = escrowArbitrationInfo.decision.proposer;
      objEscrow.objEscrow.decision.confirmationCount = escrowDecisionStats.confirmationCount;
      objEscrow.objEscrow.decision.currentConfirmationPercentage = transformToPercentage(escrowDecisionStats.currentConfirmationPercentage);
      objEscrow.objEscrow.decision.requiredConfirmations = escrowDecisionStats.requiredConfirmations;
    }

    return { ...objRes, ...objStats, ...objEscrow };
  }

  async createProposal(data, userAddress) {
    try {
      const link = data['external-link'];
      //percentage of stake to slash
      let percentageStake = data['%-value'];
      console.log('percentageStake', percentageStake);
      percentageStake = getPercentageFormat(percentageStake);
      console.log('percentageStake converted', percentageStake.toString());
      let candidate = data['address'];
      console.log('percentageStake', percentageStake);
      const result = await this.contract.methods.createProposal(link, candidate, percentageStake)
        .send({ from: userAddress });
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
