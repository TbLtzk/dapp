import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes, getPercentageFormat
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class EPQFI_MembershipVotingService extends VotingService {
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
                    // console.log("EPQFI_MembershipVotingService", promiseRes);
                    if (promiseRes) {
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
                        let promiseStatus = await this.getProposalStatus(id);
                        objRes.status = getStatusTransformation(promiseStatus);
                        objRes.title = "Fees & Incentives Experts membership proposals";
                        objRes.type = "Fees & Incentives Experts membership";
                        objRes.kindVoting = "membership";
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
     * create proposal
     * @param data
     * @param userAddress
     * @return string
     */
    async createProposal(data, userAddress) {
        console.log("DATA EPQFI_MembershipVotingService", data);
        let result = null;
        const link = data["external-link"];
        let candidate = data["address"];
        console.log("candidate", candidate);
        candidate = "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"; //usual account 1
        //TODO: createChangeExpertProposal
        if (data?.first === "add-a-new-expert") {
            result = await this.contract.methods.createAddExpertProposal(link, candidate).send(
                {from: userAddress});
        } else if (data?.first === "remove-a-current-expert") {
            candidate = "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e"; //usual account 2
            result = await this.contract.methods.createRemoveExpertProposal(link, candidate).send(
                {from: userAddress});

        }

        return result;
    }
}
