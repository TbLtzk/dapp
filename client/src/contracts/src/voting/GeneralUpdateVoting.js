import { drizzleRegistry, contracts } from '../../config/drizzle-config';
import {
  getStatusTransformation,
} from '../../handler/VotingHandler';
import VotingService from './VotingService';

import { fromWei } from 'func/balance';

export default class GeneralUpdateVoting extends VotingService {

  /**
   * get proposal data
   * @param promiseRes
   * @param id
   * @param promiseStatus
   * @return array
   */
  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    let objStats = {};
    try {
      objRes.id = id;
      objRes.remark = promiseRes.remark;
      // objRes.votesAgainst = promiseRes.counters.weightAgainst;
      // objRes.votesFor = promiseRes.counters.weightFor;
      const weightAgainst = promiseRes.counters.weightAgainst;
      objRes.votesAgainst = fromWei(weightAgainst, 'ether');
      const weightFor = promiseRes.counters.weightFor;
      objRes.votesFor = fromWei(weightFor, 'ether');

      objRes.vetosCount = promiseRes.counters.vetosCount;
      objRes.votingEndTime = promiseRes.params.votingEndTime;
      objRes.vetoEndTime = promiseRes.params.vetoEndTime;
      objRes.proposalExecutionP = promiseRes.params.proposalExecutionP;
      objRes.status = getStatusTransformation(promiseStatus);
      objRes.title = 'General update proposal';
      objRes.contract = this.contractName;
      objStats = await this.getProposalStatsData(id);

      return { ...objRes, ...objStats };
    } catch (e) {
      console.log('e', e);
    }
  }

  /**
   * create proposal
   * @param data
   * @param userAddress
   * @return string
   */
  async createProposal(data, userAddress) {
    const link = data['external-link'];
    const result = await this.contract.methods.createProposal(link)
      .send(
        { from: userAddress });
    return result;

  }
}
