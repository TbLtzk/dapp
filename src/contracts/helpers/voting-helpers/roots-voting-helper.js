import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { fromWei } from 'func/balance';

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';

export default class RootsVoting extends VotingService {
  checkProposalTitle (candidateAddress, replaceDestAddress) {
    if (candidateAddress !== EMPTY_ADDR && replaceDestAddress !== EMPTY_ADDR) {
      return 'Rode Node Swapping Proposal';
    }

    if (candidateAddress && replaceDestAddress === EMPTY_ADDR) {
      return 'Root Node Adding Proposal';
    }

    if (candidateAddress === EMPTY_ADDR && replaceDestAddress) {
      return 'Root Node Removing proposal';
    }
  }

  async getProposalAdditionalData (promiseRes, id) {
    const proposalAdditionalData = {};
    let proposalStatistics = {};
    proposalAdditionalData.remark = promiseRes.base.remark;
    const candidateAddress = promiseRes.candidate;
    proposalAdditionalData.candidate = candidateAddress;
    const replaceDestAddress = promiseRes.replaceDest;
    proposalAdditionalData.replaceDest = replaceDestAddress;
    proposalAdditionalData.votesCount = promiseRes.votesCount;

    const weightAgainst = promiseRes.base.counters.weightAgainst;
    proposalAdditionalData.votesAgainst = fromWei(weightAgainst);

    const weightFor = promiseRes.base.counters.weightFor;
    proposalAdditionalData.votesFor = fromWei(weightFor);
    proposalAdditionalData.requiredMajority = promiseRes.base.params.requiredMajority;
    proposalAdditionalData.requiredQuorum = promiseRes.base.params.requiredQuorum;

    proposalAdditionalData.vetoThreshold = promiseRes.base.params.vetoThreshold;
    proposalStatistics = await this.getProposalStatsData(id);
    proposalAdditionalData.contract = this.contractName;

    if (weightFor > 0 || weightAgainst > 0) {
      proposalAdditionalData.numberProposalVotes = {
        votesFor: Number(proposalAdditionalData.votesFor),
        votesAgainst: Number(proposalAdditionalData.votesAgainst)
      };
    }
    return { ...proposalAdditionalData, ...proposalStatistics };
  }

  getProposalData (promiseRes, id, promiseStatus) {
    const proposalsData = {};
    proposalsData.contract = this.contractName;
    proposalsData.status = getStatusTransformation(promiseStatus);
    proposalsData.id = id;
    proposalsData.votingEndTime = promiseRes.base.params.votingEndTime;
    proposalsData.vetoEndTime = promiseRes.base.params.vetoEndTime;
    proposalsData.title = this.checkProposalTitle(promiseRes.candidate, promiseRes.replaceDest);
    return proposalsData;
  }

  async isUserVote (id, address) {
    const contract = await this.getContractInstance();
    return contract.votes(id, address);
  }
}
