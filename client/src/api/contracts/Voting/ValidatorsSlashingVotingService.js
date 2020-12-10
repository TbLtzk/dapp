import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes
} from "api/contracts/Voting/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class ValidatorSlashingVotingService extends VotingService {
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
                    let promiseRes = await this.proposalIteratorResult(id);
                    if (promiseRes) {
                        objRes.id = id;
                        objRes.remark = promiseRes.base.remark;
                        objRes.candidate = promiseRes.candidate;
                        objRes.amountToSlash = promiseRes.amountToSlash;
                        objRes.vetosCount = promiseRes.base.counters.vetosCount;
                        objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                        objRes.votesFor = promiseRes.base.counters.weightFor;
                        //the ending is given by: vetoEndTime.
                        objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                        //the time until when users can vote
                        objRes.votingEndTime = promiseRes.base.params.votingEndTime;
                        let promiseStatus = await this.getProposalStatus(id);
                        objRes.status = getStatusTransformation(promiseStatus);
                        objRes.title = "Validator slashing proposals";
                        objRes.type = "validator slashing";
                        let proposalStats = await this.getProposalStats(id);
                        objRes.currentMajority = convertNumVotes(proposalStats.currentMajority);
                        objRes.currentQuorum = convertNumVotes(proposalStats.currentQuorum);
                        objRes.currentVetoPercentage = convertNumVotes(proposalStats.currentVetoPercentage);
                        objRes.requiredMajority = convertNumVotes(proposalStats.requiredMajority);
                        objRes.requiredQuorum = convertNumVotes(proposalStats.requiredQuorum);
                        objRes.vetoThreshold = convertNumVotes(proposalStats.vetoThreshold);
                    }
                    proposals.push(objRes);
                }
            }
            // console.log("proposals slashing", proposals);
            return proposals;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * vote for proposal
     * @param remark
     * @param userAddress
     * @param anyAddress, that you want to delete (my, root)
     * @return array
     */
    async createProposal(remark, userAddress, anyAddress) {
        try {
            const result = await this.RootsVoting.methods.createProposal.cacheSend(
                remark, userAddress, anyAddress, {from: userAddress});
            // console.log("createProposal", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}
