import {convertNumVotes, getStatusTransformation} from "api/contracts/Voting/handler/commonFunc";
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
            objRes.title = "Emergency update proposal";
            let proposalStats = await this.getProposalStats(id);
            objRes.currentMajority = convertNumVotes(proposalStats.currentMajority);
            objRes.currentQuorum = convertNumVotes(proposalStats.currentQuorum);
            objRes.currentVetoPercentage = convertNumVotes(proposalStats.currentVetoPercentage);
            objRes.requiredMajority = convertNumVotes(proposalStats.requiredMajority);
            objRes.requiredQuorum = convertNumVotes(proposalStats.requiredQuorum);
            objRes.vetoThreshold = convertNumVotes(proposalStats.vetoThreshold);
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
