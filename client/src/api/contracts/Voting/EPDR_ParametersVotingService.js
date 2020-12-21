import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes,
    getParameterTypeTransformation
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class EEPDR_ParametersVotingService extends VotingService {
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
                    // console.log("promiseres", promiseRes);
                    if (promiseRes) {
                        objRes.id = id;
                        objRes.remark = promiseRes.base.remark;
                        objRes.parameterKey = promiseRes.parameterKey;
                        objRes.parameterType = getParameterTypeTransformation(promiseRes.parameterType);
                        objRes.addrValue = promiseRes.parameterValue.addrValue;
                        objRes.boolValue = promiseRes.parameterValue.boolValue;
                        objRes.bytes32Value = promiseRes.parameterValue.bytes32Value;
                        objRes.strValue = promiseRes.parameterValue.strValue;
                        objRes.uintValue = promiseRes.parameterValue.uintValue;

                        objRes.vetosCount = promiseRes.base.counters.vetosCount;
                        objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                        objRes.votesFor = promiseRes.base.counters.weightFor;
                        //the ending is given by: vetoEndTime.
                        objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                        //the time until when users can vote
                        objRes.votingEndTime = promiseRes.base.params.votingEndTime;
                        // let promiseStatus = await this.getProposalStatus(id);
                        // objRes.status = getStatusTransformation(promiseStatus);
                        objRes.title = "DeFi Risk Expert parameter voting proposals";
                        objRes.type = "DeFi Risk Expert Parameters Proposals";
                        objRes.kindVoting = "parameters";
                        // let proposalStats = await this.getProposalStats(id);
                        // objRes.currentMajority = convertNumVotes(proposalStats.currentMajority);
                        // objRes.currentQuorum = convertNumVotes(proposalStats.currentQuorum);
                        // objRes.currentVetoPercentage = convertNumVotes(proposalStats.currentVetoPercentage);
                        // objRes.requiredMajority = convertNumVotes(proposalStats.requiredMajority);
                        // objRes.requiredQuorum = convertNumVotes(proposalStats.requiredQuorum);
                        // objRes.vetoThreshold = convertNumVotes(proposalStats.vetoThreshold);
                    }
                    proposals.push(objRes);
                }
            }
            // console.log("proposals", proposals);
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
