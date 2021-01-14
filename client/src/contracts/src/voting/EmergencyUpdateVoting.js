import { web3, contracts } from '../../config/drizzle-config';
import {
  getStatusTransformation,
} from '../../handler/VotingHandler';
import VotingService from './VotingService';

export default class EmergencyUpdateVoting extends VotingService {

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
      console.log('promiseRes', promiseRes);
      objRes.id = id;
      objRes.remark = promiseRes.remark;
      // objRes.votesAgainst = promiseRes.counters.weightAgainst;
      // objRes.votesFor = promiseRes.counters.weightFor;
      //number of voting people against
      const weightAgainst = promiseRes.counters.weightAgainst;
      objRes.votesAgainst = weightAgainst;
      //number of voting people for
      const weightFor = promiseRes.counters.weightFor;
      objRes.votesFor =  weightFor;

      objRes.vetosCount = promiseRes.counters.vetosCount;
      objRes.votingEndTime = promiseRes.params.votingEndTime;
      objRes.vetoEndTime = promiseRes.params.vetoEndTime;
      objRes.proposalExecutionP = promiseRes.params.proposalExecutionP;
      objRes.status = getStatusTransformation(promiseStatus);
      objRes.title = "Emergency update proposal";
      objRes.contract = this.contractName;
      objStats = await this.getProposalStatsData(id);

      return { ...objRes, ...objStats };
    } catch (e) {
      console.log("e", e);
    }
  }

  /**
   * create proposal
   * @param data
   * @param userAddress
   * @return string
   */
  async createProposal(data, userAddress) {
    console.log("data", data);
    const link = data["external-link"];
    console.log("external-link", data["external-link"]);
    const result = await this.contract.methods.createProposal(link).send(
        {from: userAddress});
    return result;

  }
}
