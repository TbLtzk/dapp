import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class EPDR_MembershipVotingService extends VotingService {
    /**
     * get proposals
     * @return array
     */
    async getProposals() {
        try {
            //TODO: for createRemoveExpertProposal use RemoveProposalCreated event
            const proposalEvents = await this.getProposalsEvent();
            const proposalIds = getPastProposalsIds(proposalEvents);
            console.log("EPDR_MembershipVotingService", proposalIds);
            let proposals = [];
            if (proposalIds) {
                for (let id of proposalIds) {
                    let objRes = {};
                    let promiseStatus = await this.getProposalStatus(id);
                    if (promiseStatus === "1") {
                        let promiseRes = await this.proposalIteratorResult(id);
                        if (promiseRes) {
                            // if (promiseStatus === "1"){
                            objRes.id = id;
                            objRes.remark = promiseRes.base.remark;
                            objRes.addressToAdd = promiseRes.proposalDetails.addressToAdd;
                            objRes.addressToRemove = promiseRes.proposalDetails.addressToRemove;
                            objRes.vetosCount = promiseRes.base.counters.vetosCount;
                            objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                            objRes.votesFor = promiseRes.base.counters.weightFor;
                            //the ending is given by: vetoEndTime.
                            objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                            //the time until when users can vote
                            objRes.votingEndTime = promiseRes.base.params.votingEndTime;
                            objRes.status = getStatusTransformation(promiseStatus);
                            objRes.title = "DeFi Risk Expert membership proposals";
                            objRes.type = "DeFi Risk Expert membership";
                            objRes.kindVoting = "membership";
                            objRes.contract = this.contractName;
                            let proposalStats = await this.getProposalStats(id);
                            objRes.currentMajority = convertNumVotes(proposalStats.currentMajority);
                            objRes.currentQuorum = convertNumVotes(proposalStats.currentQuorum);
                            objRes.currentVetoPercentage = convertNumVotes(proposalStats.currentVetoPercentage);
                            objRes.requiredMajority = convertNumVotes(proposalStats.requiredMajority);
                            objRes.requiredQuorum = convertNumVotes(proposalStats.requiredQuorum);
                            objRes.vetoThreshold = convertNumVotes(proposalStats.vetoThreshold);
                            proposals.push(objRes);
                        }
                    }

                }
            }
            // console.log("proposals", proposals);
            return proposals;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * create proposal
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
