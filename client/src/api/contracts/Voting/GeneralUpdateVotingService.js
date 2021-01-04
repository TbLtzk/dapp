import {
  convertNumVotes,
  getStatusTransformation,
  transformToPercentage
} from 'api/contracts/Voting/handler/commonFunc';
import VotingService from "api/contracts/Voting/VotingService";

export default class GeneralUpdateVotingService extends VotingService {

    /**
     * get proposal data
     * @param promiseRes
     * @param id
     * @param promiseStatus
     * @return array
     */
    async getProposalData(promiseRes, id, promiseStatus) {
        console.log(promiseRes);
        let objRes = {};
        try {
            objRes.id = id;
            objRes.remark = promiseRes.remark;
            objRes.votesAgainst = promiseRes.counters.weightAgainst;
            objRes.votesFor = promiseRes.counters.weightFor;
            objRes.vetosCount = promiseRes.counters.vetosCount;
            objRes.votingEndTime = promiseRes.params.votingEndTime;
            objRes.vetoEndTime = promiseRes.params.vetoEndTime;
            objRes.proposalExecutionP = promiseRes.params.proposalExecutionP;
            objRes.status = getStatusTransformation(promiseStatus);
            objRes.title = "General update proposal";
            let proposalStats = await this.getProposalStats(id);
            objRes.currentMajority = transformToPercentage(proposalStats.currentMajority);
            objRes.currentQuorum = transformToPercentage(proposalStats.currentQuorum);
            objRes.currentVetoPercentage = transformToPercentage(proposalStats.currentVetoPercentage);
            objRes.requiredMajority = transformToPercentage(proposalStats.requiredMajority);
            objRes.requiredQuorum = transformToPercentage(proposalStats.requiredQuorum);
            objRes.vetoThreshold = transformToPercentage(proposalStats.vetoThreshold);
            objRes.contract = this.contractName;

            return objRes;
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
        console.log("userAddress", userAddress);
        const link = data["external-link"];
        console.log("external-link", data["external-link"]);
        const result = await this.contract.methods.createProposal(link).send(
            {from: userAddress});
        return result;

    }
}
