import { contracts } from '../../config/config';
import VotingService from './VotingService';

import {
  getStatusTransformation,
} from '../../handler/VotingHandler';
import { fromWei } from 'func/balance';

export default class GeneralUpdateVoting extends VotingService {

  constructor() {
    super();
    this.contract = contracts['GeneralUpdateVoting'];
    this.contractName = 'GeneralUpdateVoting';
  }

  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    let objStats = {};
    objRes.id = id;
    objRes.remark = promiseRes.remark;
    // objRes.votesAgainst = promiseRes.counters.weightAgainst;
    // objRes.votesFor = promiseRes.counters.weightFor;
    const weightAgainst = promiseRes.counters.weightAgainst;
    objRes.votesAgainst = fromWei(weightAgainst);
    const weightFor = promiseRes.counters.weightFor;
    objRes.votesFor = fromWei(weightFor);

    objRes.vetosCount = promiseRes.counters.vetosCount;
    objRes.votingEndTime = promiseRes.params.votingEndTime;
    objRes.vetoEndTime = promiseRes.params.vetoEndTime;
    objRes.proposalExecutionP = promiseRes.params.proposalExecutionP;
    objRes.status = getStatusTransformation(promiseStatus);
    objRes.title = 'General update proposal';
    objRes.contract = this.contractName;
    objStats = await this.getProposalStatsData(id);

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number( objRes.votesAgainst)
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
