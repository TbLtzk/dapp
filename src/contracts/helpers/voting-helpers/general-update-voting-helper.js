import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { fromWei } from 'func/balance';

export default class GeneralUpdateVoting extends VotingService {
  async getProposalAdditionalData (promiseRes, id) {
    const objRes = {};
    let objStats = {};
    objRes.remark = promiseRes.remark;
    const weightAgainst = promiseRes.counters.weightAgainst;
    objRes.votesAgainst = fromWei(weightAgainst);
    const weightFor = promiseRes.counters.weightFor;
    objRes.votesFor = fromWei(weightFor);

    objRes.vetosCount = promiseRes.counters.vetosCount;
    objRes.proposalExecutionP = promiseRes.params.proposalExecutionP;
    objStats = await this.getProposalStatsData(id);

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      };
    }

    return { ...objRes, ...objStats };
  }

  getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {};
    objRes.status = getStatusTransformation(promiseStatus);
    objRes.title = 'General update proposal';
    objRes.contract = CONTRACTS_NAMES.generalUpdateVoting;
    objRes.votingEndTime = promiseRes.params.votingEndTime;
    objRes.vetoEndTime = promiseRes.params.vetoEndTime;
    objRes.id = id;

    return objRes;
  }

  async createProposal (data, userAddress) {
    const contract = await this.getContractInstance();

    const link = data['external-link'];
    const result = await contract.createProposal(link, { from: userAddress });
    return result;
  }
}
