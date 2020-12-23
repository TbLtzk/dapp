import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes,
    getPercentageFormat
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class ValidatorsSlashingVotingService extends VotingService {
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
                        let promiseStatus = await this.getProposalStatus(id);
                        if (promiseStatus === "1") {
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
                            objRes.contract = this.contractName;
                            proposals.push(objRes);
                        }
                    }

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
        candidate = "0x6a39b688d591ea00c9ea69658438794204b5cc62"; //validator member
        const result = await this.contract.methods.createProposal(link, candidate, percentageStake).send(
            {from: userAddress});
        return result;
    }
}
