import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { fromWei } from 'func/balance';

const proposalTitle = {
  [CONTRACTS_NAMES.ePRSMembershipVoting]: 'Q Root Node Selection Expert Panel',
  [CONTRACTS_NAMES.ePDRMembershipVoting]: 'DeFi Risk Expert membership',
  [CONTRACTS_NAMES.ePQFIMembershipVoting]: 'Fees & Incentives Experts membership'
};

export default class MembershipVoting extends VotingService {
  getProposalData (promiseRes, id, promiseStatus) {
    const info = {};
    info.vetoEndTime = promiseRes.base.params.vetoEndTime;
    info.votingEndTime = promiseRes.base.params.votingEndTime;
    info.title = proposalTitle[this.contractName];
    info.status = getStatusTransformation(promiseStatus);
    info.contract = this.contractName;
    info.id = id;
    return info;
  }

  async getProposalAdditionalData (promiseRes, id) {
    const info = {};
    const statsInfo = await this.getProposalStatsData(id);
    const weightFor = promiseRes.base.counters.weightFor;
    const weightAgainst = promiseRes.base.counters.weightAgainst;

    info.remark = promiseRes.base.remark;
    info.addressToAdd = promiseRes.proposalDetails.addressToAdd;
    info.addressToRemove = promiseRes.proposalDetails.addressToRemove;
    info.vetosCount = promiseRes.base.counters.vetosCount;
    info.votesFor = fromWei(weightFor);
    info.votesAgainst = fromWei(weightAgainst);
    info.type = proposalTitle[this.contractName];
    info.kindVoting = 'membership';

    if (weightFor > 0 || weightAgainst > 0) {
      info.numberProposalVotes = {
        votesFor: Number(info.votesFor),
        votesAgainst: Number(info.votesAgainst)
      };
    }
    return { ...info, ...statsInfo };
  }
}
