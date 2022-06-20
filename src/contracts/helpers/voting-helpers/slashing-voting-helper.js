import { address } from 'components/Custom/LoadingMetaMask/LoadingMetaMask';

import { getPercentageFormat, getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { getRootNodesInstance, getRootNodeSlashingEscrowInstance, getValidatorSlashingEscrowInstance } from 'contracts/contract-instance';

import { ZERO_ADDRESS } from 'constants/config';
import { CONTRACTS_NAMES } from 'constants/contracts';
import { STATUSES } from 'constants/statuses';
import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { transformToPercentage } from 'func/formatters';

export default class SlashingVoting extends VotingService {
  async getProposalAdditionalData (promiseRes, id) {
    const objRes = {};

    let objStats = {};
    const objEscrow = {
      objEscrow: {
        objection: {},
        decision: {},
        types: {}
      }
    };

    const isValidatorSlashingMode = this.contractName === CONTRACTS_NAMES.validatorsSlashingVoting;

    objRes.remark = promiseRes.base.remark;
    objRes.candidate = promiseRes.candidate;
    objRes.amountToSlash = fromWei(promiseRes.amountToSlash);
    objRes.vetosCount = promiseRes.base.counters.vetosCount;
    const weightAgainst = promiseRes.base.counters.weightAgainst;
    objRes.votesAgainst = isValidatorSlashingMode ? weightAgainst : fromWei(weightAgainst);
    const weightFor = promiseRes.base.counters.weightFor;
    objRes.votesFor = isValidatorSlashingMode ? weightFor : fromWei(weightFor);
    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      };
    }
    const rootNodesInstance = await getRootNodesInstance();
    objRes.type = isValidatorSlashingMode ? 'validator slashing' : 'root nodes slashing';
    objStats = await this.getProposalStatsData(id);
    if (promiseRes.status === '5') {
      const SlashingEscrowContractName = isValidatorSlashingMode
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow;
      const SlashingEscrowContract = new SlashingEscrow(SlashingEscrowContractName);
      objEscrow.objEscrow.objection.statusObjection = SlashingEscrowContract.getTitleStatus(
        await SlashingEscrowContract.getStatus(id)
      );
      const escrowArbitrationInfo = await SlashingEscrowContract.getArbitrationInfos(id);
      const escrowDecisionStats = await SlashingEscrowContract.getDecisionStats(id);
      objEscrow.objEscrow.objection.executed = escrowArbitrationInfo.executed;
      objEscrow.objEscrow.objection.remark = escrowArbitrationInfo.remark;
      objEscrow.objEscrow.objection.slashedAmount = fromWei(escrowArbitrationInfo.params.slashedAmount);
      objEscrow.objEscrow.objection.objectionEndTime = fromSolDateFormattingT1(
        escrowArbitrationInfo.params.objectionEndTime
      );
      objEscrow.objEscrow.objection.appealEndTime = fromSolDateFormattingT1(escrowArbitrationInfo.params.appealEndTime);
      objEscrow.objEscrow.objection.proposerRemark = escrowArbitrationInfo.proposerRemark;
      objEscrow.objEscrow.objection.appealConfirmed = escrowArbitrationInfo.appealConfirmed;
      objEscrow.objEscrow.decision.confirmationCount = escrowArbitrationInfo.decision.confirmationCount;
      objEscrow.objEscrow.decision.endDate = fromSolDateFormattingT1(escrowArbitrationInfo.decision.endDate);
      objEscrow.objEscrow.decision.externalReference = escrowArbitrationInfo.decision.externalReference;
      objEscrow.objEscrow.decision.notAppealed = escrowArbitrationInfo.decision.notAppealed;
      objEscrow.objEscrow.decision.percentage = transformToPercentage(escrowArbitrationInfo.decision.percentage);
      objEscrow.objEscrow.decision.proposer = escrowArbitrationInfo.decision.proposer;

      objEscrow.objEscrow.decision.confirmationCount = escrowDecisionStats.confirmationCount;
      objEscrow.objEscrow.decision.currentConfirmationPercentage = transformToPercentage(
        escrowDecisionStats.currentConfirmationPercentage
      );
      objEscrow.objEscrow.decision.requiredConfirmations = escrowDecisionStats.requiredConfirmations;

      objEscrow.objEscrow.types.objection = promiseRes.candidate === address;
      objEscrow.objEscrow.types.isRootNode = await rootNodesInstance.isMember(address);

      objEscrow.objEscrow.types.recallDecision =
        escrowArbitrationInfo.decision.proposer === ZERO_ADDRESS
          ? false
          : escrowArbitrationInfo.decision.proposer === address;
    }

    return { ...objRes, ...objStats, ...objEscrow };
  }

  getProposalData (promiseRes, id, promiseStatus) {
    const info = {};
    info.id = id;
    info.contract = this.contractName;
    info.vetoEndTime = promiseRes.base.params.vetoEndTime;
    info.votingEndTime = promiseRes.base.params.votingEndTime;
    info.status = getStatusTransformation(promiseStatus);
    info.title =
      this.contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? 'Validator slashing proposals'
        : 'Root Nodes slashing proposals';

    return info;
  }

  async createProposal (data, userAddress) {
    const contract = await this.getContractInstance();

    const link = data.externalLink;
    const percentageStake = getPercentageFormat(data.percent);
    const candidate = data.address;

    const result = await contract.createProposal(link, candidate, percentageStake, { from: userAddress });
    return result;
  }
}

async function switchInstance (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.rootNodesSlashingEscrow:
      return await getRootNodeSlashingEscrowInstance();
    case CONTRACTS_NAMES.validatorsSlashingEscrow:
      return await getValidatorSlashingEscrowInstance();
    default:
      return {};
  }
}

class SlashingEscrow {
  constructor (contractName) {
    this.contractName = contractName;
  }

  getTitleStatus (statusID) {
    const status = [
      STATUSES.none,
      STATUSES.open,
      STATUSES.accepted,
      STATUSES.pending,
      STATUSES.decided,
      STATUSES.executed
    ];
    return status[Number(statusID)];
  }

  async getStatus (id) {
    const contract = await switchInstance(this.contractName);
    const result = await contract.instance.methods.getStatus(id).call();
    return result;
  }

  async getDecisionStats (id) {
    const contract = await switchInstance(this.contractName);
    const result = await contract.instance.methods.getDecisionStats(id).call();
    return result;
  }

  async getArbitrationInfos (id) {
    const contract = await switchInstance(this.contractName);
    const result = await contract.arbitrationInfos(id);
    return result;
  }
}
