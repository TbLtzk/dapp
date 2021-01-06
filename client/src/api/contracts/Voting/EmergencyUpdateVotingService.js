import {
  getStatusTransformation,
} from 'api/contracts/Voting/handler/commonFunc';
import VotingService from 'api/contracts/Voting/VotingService';

export default class EmergencyUpdateVotingService extends VotingService {

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
      objRes.votesAgainst = this.drizzle.web3.utils.fromWei(weightAgainst, "ether");
      const weightFor = promiseRes.counters.weightFor;
      objRes.votesFor =  this.drizzle.web3.utils.fromWei(weightFor, "ether");

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
