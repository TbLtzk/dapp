import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes,
    getPercentageFormat
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class RootNodesSlashingVotingService extends VotingService {
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
                        objRes.amountToSlash = convertNumVotes(promiseRes.amountToSlash);
                        objRes.vetosCount = promiseRes.base.counters.vetosCount;
                        objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                        objRes.votesFor = promiseRes.base.counters.weightFor;
                        //the ending is given by: vetoEndTime.
                        objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                        //the time until when users can vote
                        objRes.votingEndTime = promiseRes.base.params.votingEndTime;
                        let promiseStatus = await this.getProposalStatus(id);
                        objRes.status = getStatusTransformation(promiseStatus);
                        objRes.title = "Root Nodes slashing proposals";
                        objRes.type = "root nodes slashing";
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
     * create proposal
     * @param data
     * @param userAddress
     * @return string
     */
    async createProposal(data, userAddress) {
        console.log("DATA", data);
        const link = data["external-link"];
        //percentage of stake to slash
        let percentageStake = data["%-value"];
        percentageStake = getPercentageFormat(percentageStake);
        let candidate = data["address"];
        console.log("candidate", candidate);
        console.log("percentageStake", percentageStake);
        candidate = "0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68"; //root member
        const result = await this.contract.methods.createProposal(link, candidate, percentageStake).send(
            {from: userAddress});
        return result;
    }
}
