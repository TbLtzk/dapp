import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes,
    getPercentageFormat
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

/*contacts: RootNodesSlashingVoting, ValidatorsSlashingVoting*/
export default class SlashingVoting extends VotingService {

    /**
     * get proposal
     * @param promiseRes
     * @param promiseRes
     * @return array
     */
    async getDataObject(promiseRes, statusProposal) {
        let objRes = {};
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

            objRes.status = getStatusTransformation(await this.getProposalStatus(id));
            objRes.title = this.contractName === "ValidatorsSlashingVoting"
                ? "Validator slashing proposals" : "Root Nodes slashing proposals";
            objRes.type = this.contractName === "ValidatorsSlashingVoting"
                ? "validator slashing" : "root nodes slashing";
            let proposalStats = await this.getProposalStats(id);
            objRes.currentMajority = convertNumVotes(proposalStats.currentMajority);
            objRes.currentQuorum = convertNumVotes(proposalStats.currentQuorum);
            objRes.currentVetoPercentage = convertNumVotes(proposalStats.currentVetoPercentage);
            objRes.requiredMajority = convertNumVotes(proposalStats.requiredMajority);
            objRes.requiredQuorum = convertNumVotes(proposalStats.requiredQuorum);
            objRes.vetoThreshold = convertNumVotes(proposalStats.vetoThreshold);
            return objRes;
        }

    }

    /**
     * get proposal
     * @param id
     * @return array
     */
    async getProposal(id) {
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
                            objRes.title = this.contractName === "ValidatorsSlashingVoting"
                                ? "Validator slashing proposals" : "Root Nodes slashing proposals";
                            objRes.type = this.contractName === "ValidatorsSlashingVoting"
                                ? "validator slashing" : "root nodes slashing";
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
            // console.log("proposals slashing", proposals);
            return proposals;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get proposals
     * @return array
     */
    async getProposals() {
        try {
            const proposalEvents = await this.getProposalsEvent();
            console.log("proposalEvents", proposalEvents);
            const proposalIds = getPastProposalsIds(proposalEvents);
            console.log("proposalIds", proposalIds);
            let proposals = [];
            if (proposalIds) {
                for (let id of proposalIds) {
                    let objRes = {};
                    console.log("Iteration");
                    let promiseRes = await this.proposalIteratorResult(id);
                    console.log("promiseRes", promiseRes);
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
                            objRes.title = this.contractName === "ValidatorsSlashingVoting"
                                ? "Validator slashing proposals" : "Root Nodes slashing proposals";
                            objRes.type = this.contractName === "ValidatorsSlashingVoting"
                                ? "validator slashing" : "root nodes slashing";
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
            console.log("proposals slashing", proposals);
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
        // candidate = "0x6a39b688d591ea00c9ea69658438794204b5cc62";
        candidate = this.contractName === "ValidatorsSlashingVoting" //validator member
            ? "0x6a39b688d591ea00c9ea69658438794204b5cc62"
            : "0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68"; //root member
        const result = await this.contract.methods.createProposal(link, candidate, percentageStake).send(
            {from: userAddress});
        return result;
    }
}
