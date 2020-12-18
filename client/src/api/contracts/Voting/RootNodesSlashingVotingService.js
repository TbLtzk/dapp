import {
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes
} from "api/contracts/Voting/commonFunc";
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
        let result = null;
        // const hash = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
        const link = data["external-link"];
        let addressToRemove = data.address;

        const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';
        if (data.first === "root-node-slashing") {
            const removeCurrent = data["remove-current"];
            const hash = data.hash.toLowerCase();
            console.log("hash", hash);
            console.log("removeCurrent", removeCurrent);
            if (removeCurrent === "no") {
                console.log("removeCurrent if", removeCurrent);
                console.log("removeCurrent if", this.contract);
                result = await this.contract.methods.createProposal(link, userAddress, EMPTY_ADDR).send(
                    {from: userAddress});
                // result = await this.contract.methods.createProposal(link, hash, userAddress, EMPTY_ADDR).send(
                //     {from: userAddress});
            } else {
                console.log("removeCurrent if yes", removeCurrent);
                addressToRemove = "0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68"; //remove root
                result = await this.contract.methods.createProposal(link, userAddress, addressToRemove).send(
                    {from: userAddress});

                // result = await this.contract.methods.createProposal(link, hash, userAddress, addressToRemove).send(
                //     {from: userAddress});
            }
        } else if (data.first === "validator-node-slashing") {
            //TODO: error for empty_addr
            result = await this.contract.methods.createProposal(link, EMPTY_ADDR, userAddress).send(
                {from: userAddress});
        }


        return result;
    }
}
