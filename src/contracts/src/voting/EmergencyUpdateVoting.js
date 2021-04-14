import { contracts } from '../../config/config';
import VotingService from './VotingService';

import {
  getStatusTransformation,
} from '../../handler/VotingHandler';

export default class EmergencyUpdateVoting extends VotingService {

  constructor() {
    super();
    this.contract = contracts['EmergencyUpdateVoting'];
    this.contractName = 'EmergencyUpdateVoting';
  }

  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    let objStats = {};
    objRes.id = id;
    objRes.remark = promiseRes.remark;
    // objRes.votesAgainst = promiseRes.counters.weightAgainst;
    // objRes.votesFor = promiseRes.counters.weightFor;
    //number of voting people against
    const weightAgainst = promiseRes.counters.weightAgainst;
    objRes.votesAgainst = weightAgainst;
    //number of voting people for
    const weightFor = promiseRes.counters.weightFor;
    objRes.votesFor = weightFor;

    objRes.vetosCount = promiseRes.counters.vetosCount;
    objRes.votingEndTime = promiseRes.params.votingEndTime;
    objRes.vetoEndTime = promiseRes.params.vetoEndTime;
    objRes.proposalExecutionP = promiseRes.params.proposalExecutionP;
    objRes.status = getStatusTransformation(promiseStatus);
    objRes.title = 'Emergency update proposal';
    objRes.contract = this.contractName;
    objStats = await this.getProposalStatsData(id);

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(weightFor),
        votesAgainst: Number(weightAgainst)
      };
    }

    return { ...objRes, ...objStats };
  }

  async createProposal(data, userAddress) {
    const link = data['external-link'];
    const result = await this.contract.methods.createProposal(link)
      .send(
        { from: userAddress });
    return result;
  }
}
