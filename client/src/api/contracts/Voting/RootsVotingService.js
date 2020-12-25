import {
    getPastEvents,
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes
} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';

export default class RootsVotingService extends VotingService {

    /**
     * check proposal type depends on candidate and replaceDest addresses
     * @param candidateAddress
     * @param replaceDestAddress
     * @return string
     */
    checkProposalTitle(candidateAddress, replaceDestAddress) {
        if (candidateAddress !== EMPTY_ADDR && replaceDestAddress !== EMPTY_ADDR) {
            return "Rode Node Swapping Proposal"
        } else if (candidateAddress && replaceDestAddress === EMPTY_ADDR) {
            return "Root Node Adding Proposal"
        } else if (candidateAddress === EMPTY_ADDR && replaceDestAddress) {
            return "Root Node Removing proposal"
        }
    }

    /**
     * get proposals
     * @return array
     */
    async getProposals() {
        try {
            const proposalEvents = await this.getProposalsEvent();
            const proposalIds = getPastProposalsIds(proposalEvents);
            // console.log("proposalIds", proposalIds);
            let proposals = [];
            if (proposalIds) {
                for (let id of proposalIds) {
                    let objRes = {};
                    let promiseStatus = await this.getProposalStatus(id);
                    if (promiseStatus === "1") {
                        let promiseRes = await this.proposalIteratorResult(id);
                        // objRes = [...promiseRes];
                        if (promiseRes) {
                            // console.log("promiseRes",promiseRes);
                            objRes.id = id;
                            objRes.remark = promiseRes.base.remark;
                            const candidateAddress = promiseRes.candidate;
                            objRes.candidate = candidateAddress;
                            const replaceDestAddress = promiseRes.replaceDest;
                            objRes.replaceDest = replaceDestAddress;
                            objRes.votesCount = promiseRes.votesCount;
                            objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                            objRes.votesFor = promiseRes.base.counters.weightFor;
                            objRes.requiredMajority = promiseRes.base.params.requiredMajority;
                            objRes.requiredQuorum = promiseRes.base.params.requiredQuorum;
                            //the ending is given by: vetoEndTime.
                            objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                            objRes.vetoThreshold = promiseRes.base.params.vetoThreshold;
                            //the time until when users can vote
                            objRes.votingEndTime = promiseRes.base.params.votingEndTime;

                            objRes.title = this.checkProposalTitle(candidateAddress, replaceDestAddress);
                            // let getVotesAddress = await this.isUserVote(id, "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7");
                            // let getVotesFor = await this.getVotesFor(id);
                            // let getVotesAgainst = await this.getVotesAgainst(id);
                            let getVetoesNumber = await this.getVetoesNumber(id);
                            let getVetoesPercentage = await this.getVetoesPercentage(id);
                            objRes.vetoesNumber = getVetoesNumber;
                            objRes.vetoesPercentage = getVetoesPercentage;
                            let proposalStats = await this.getProposalStats(id);
                            objRes.status = getStatusTransformation(promiseStatus);
                            // console.log("getProposalStats", proposalStats);
                            // let voteFor = await this.voteFor(id);
                            // let voteAgainst = await this.voteAgainst(id);
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
            // console.log("proposals", proposals);
            return proposals;
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * check is user vote
     * @param id
     * @param address
     * @return boolean
     */
    async isUserVote(id, address) {
        try {
            const result = await this.RootsVoting.methods.votes(id, address).call();
            console.log("votes", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * count voting results "YES"
     * @param id
     * @return number
     */
    async getVotesFor(id) {
        try {
            const result = await this.RootsVoting.methods.getVotesFor(id).call();
            // console.log("getVotesFor", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * count voting results "NO"
     * @param id
     * @return number
     */
    async getVotesAgainst(id) {
        try {
            const result = await this.RootsVoting.methods.getVotesAgainst(id).call();
            // console.log("getVotesAgainst", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * proposal status
     * @param id
     * @return array
     */
    // async getProposalStats(id) {
    //     try {
    //         const result = await this.RootsVoting.methods.getProposalStats(id).call();
    //         // console.log("getProposalStats", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * create proposal
     * @param data
     * @param userAddress
     * @return string
     */
    async createProposal(data, userAddress) {
        // console.log("DATA", data);
        let result = null;
        // const hash = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
        // const hash = data.hash.toLowerCase();
        const link = data["external-link"];
        let addressToRemove = data.address;
        // const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';
        if (data.first === "add-a-new-root-node") {
            const removeCurrent = data["remove-current"];
            if (removeCurrent === "no") {
                //TODO: in future backenders add to argument list - hash
                result = await this.contract.methods.createProposal(link, userAddress, EMPTY_ADDR).send(
                    {from: userAddress});
            } else {
                addressToRemove = "0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68"; //remove root address
                result = await this.contract.methods.createProposal(link, userAddress, addressToRemove).send(
                    {from: userAddress});
            }
        } else if (data.first === "remove-a-current-root-node") {
            addressToRemove = "0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68"; //remove root address
            result = await this.contract.methods.createProposal(link, EMPTY_ADDR, addressToRemove).send(
                {from: userAddress});
        }

        return result;
    }
}
