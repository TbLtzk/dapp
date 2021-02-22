import { contracts } from '../../config/drizzle-config';
import {
  getStatusTransformation,
} from '../../handler/VotingHandler';
import VotingService from './VotingService';

export default class EmergencyUpdateVoting extends VotingService {

  constructor() {
    super();
    this.contract = contracts['EmergencyUpdateVoting'];
    this.contractName = 'EmergencyUpdateVoting';
  }

  //get proposal data
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

    return { ...objRes, ...objStats };
  }

  //create proposal
  async createProposal(data, userAddress) {
    const link = data['external-link'];
    const result = await this.contract.methods.createProposal(link)
      .send(
        { from: userAddress });
    return result;
  }
}
