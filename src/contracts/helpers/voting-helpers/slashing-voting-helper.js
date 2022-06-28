import { ProposalStatus } from '@q-dev/q-js-sdk';

import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { store } from 'store';

import {
  getRootNodesInstance,
  getRootNodeSlashingEscrowInstance,
  getValidatorSlashingEscrowInstance,
} from 'contracts/contract-instance';

import { ZERO_ADDRESS } from 'constants/config';
import { CONTRACTS_NAMES } from 'constants/contracts';
import { STATUSES } from 'constants/statuses';
import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { transformToPercentage } from 'func/formatters';

export default class SlashingVoting extends VotingService {
  async getProposalAdditionalData (response, id) {
    const { userInf } = store.getState();
    const address = userInf.userAddress;

    const isValidatorSlashingMode = this.contractName === CONTRACTS_NAMES.validatorsSlashingVoting;

    const weightFor = response.base.counters.weightFor;
    const weightAgainst = response.base.counters.weightAgainst;

    const objRes = {
      type: isValidatorSlashingMode ? 'validator slashing' : 'root nodes slashing',
      remark: response.base.remark,
      candidate: response.candidate,
      amountToSlash: fromWei(response.amountToSlash),
      vetosCount: response.base.counters.vetosCount,
      votesFor: isValidatorSlashingMode ? weightFor : fromWei(weightFor),
      votesAgainst: isValidatorSlashingMode ? weightAgainst : fromWei(weightAgainst),
    };

    const objEscrow = {
      objection: {},
      decision: {},
      types: {},
    };

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst),
      };
    }

    if (response.status === ProposalStatus.EXECUTED) {
      const contract = isValidatorSlashingMode
        ? await getValidatorSlashingEscrowInstance()
        : await getRootNodeSlashingEscrowInstance();

      const status = await contract.instance.methods.getStatus(id).call();
      objEscrow.objection.statusObjection = [
        STATUSES.none,
        STATUSES.open,
        STATUSES.accepted,
        STATUSES.pending,
        STATUSES.decided,
        STATUSES.executed,
      ][Number(status)];

      const escrowArbitrationInfo = await contract.arbitrationInfos(id);
      const escrowDecisionStats = await contract.instance.methods.getDecisionStats(id).call();
      const rootNodesInstance = await getRootNodesInstance();

      objEscrow.objection = {
        executed: escrowArbitrationInfo.executed,
        remark: escrowArbitrationInfo.remark,
        slashedAmount: fromWei(escrowArbitrationInfo.params.slashedAmount),
        appealEndTime: fromSolDateFormattingT1(escrowArbitrationInfo.params.appealEndTime),
        proposerRemark: escrowArbitrationInfo.proposerRemark,
        appealConfirmed: escrowArbitrationInfo.appealConfirmed,
        objectionEndTime: fromSolDateFormattingT1(escrowArbitrationInfo.params.objectionEndTime),
      };

      objEscrow.decision = {
        endDate: fromSolDateFormattingT1(escrowArbitrationInfo.decision.endDate),
        externalReference: escrowArbitrationInfo.decision.externalReference,
        notAppealed: escrowArbitrationInfo.decision.notAppealed,
        percentage: transformToPercentage(escrowArbitrationInfo.decision.percentage),
        proposer: escrowArbitrationInfo.decision.proposer,
        confirmationCount: escrowDecisionStats.confirmationCount,
        requiredConfirmations: escrowDecisionStats.requiredConfirmations,
        currentConfirmationPercentage: transformToPercentage(escrowDecisionStats.currentConfirmationPercentage),
      };

      objEscrow.types = {
        objection: response.candidate === address,
        isRootNode: await rootNodesInstance.isMember(address),
        recallDecision: address !== ZERO_ADDRESS && escrowArbitrationInfo.decision.proposer === address,
      };
    }

    const proposalStats = await this.getProposalStatsData(id);
    return { ...objRes, ...proposalStats, objEscrow };
  }

  getProposalData (response, id, promiseStatus) {
    return {
      id,
      contract: this.contractName,
      vetoEndTime: response.base.params.vetoEndTime,
      votingEndTime: response.base.params.votingEndTime,
      status: getStatusTransformation(promiseStatus),
      title:
        this.contractName === CONTRACTS_NAMES.validatorsSlashingVoting
          ? 'Validator slashing proposal'
          : 'Root Node slashing proposal',
    };
  }
}
