import {
    convertNumVotes,
    getPastEvents,
    getPastProposalsIds,
    getStatusTransformation
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class EmergencyUpdateVotingService extends VotingService {

    /**
     * get proposals
     * @return array
     */
    async getProposals() {
        try {
            const proposalEvents = await this.getProposalsEvent();
            const proposalIds = getPastProposalsIds(proposalEvents);
            let proposals = [];
            if (proposalIds) {
                for (let id of proposalIds) {
                    let objRes = {};
                    let promiseStatus = await this.getProposalStatus(id);
                    if (promiseStatus === "1") {
                        let promiseRes = await this.proposalIteratorResult(id);
                        if (promiseRes) {
                            objRes.id = id;
                            objRes.remark = promiseRes.remark;
                            objRes.votesAgainst = promiseRes.weightAgainst;
                            objRes.votesFor = promiseRes.weightFor;
                            objRes.vetosCount = promiseRes.vetosCount;
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
                            proposals.push(objRes);
                        }
                    }
                }
            }
            return proposals;
        } catch (e) {
            console.log("e", e)
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
