import {
    getPastEvents,
    getStatusTransformation,
    getPastProposalsIds,
    convertNumVotes
} from "api/contracts/Voting/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class RootsVotingService extends VotingService {

    // constructor(drizzle) {
    //     this.drizzle = drizzle;
    //     this.RootsVoting = drizzle.contracts.RootsVoting;
    // }

    /**
     * get proposal event
     * @return array
     */
    // async getProposalsEvent() {
    //     try {
    //         return await getPastEvents(this.drizzle, 'RootsVoting', 'ProposalCreated');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * check proposal type depends on candidate and replaceDest addresses
     * @param candidateAddress
     * @param replaceDestAddress
     * @return string
     */
    checkProposalTitle(candidateAddress, replaceDestAddress) {
        if (candidateAddress && replaceDestAddress) {
            return "Rode Node Swapping Proposal"
        } else if (candidateAddress && !replaceDestAddress) {
            return "Root Node Adding Proposal"
        } else if (!candidateAddress && replaceDestAddress) {
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
            console.log("proposalIds", proposalIds);
            let proposals = [];
            if (proposalIds) {
                for (let id of proposalIds) {
                    let objRes = {};
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
                        let promiseStatus = await this.getProposalStatus(id);
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
     * get proposal
     * @param id
     * @return array
     */
    // async getProposal(id) {
    //     try {
    //         const result = await this.RootsVoting.methods.proposals(id).call();
    //         // const result = await this.RootsVoting.methods.getProposal(id).call();
    //         // console.log("result", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * get proposal status
     * @param id
     * @return string
     */
    // async getProposalStatus(id) {
    //     try {
    //         const result = await this.RootsVoting.methods.getStatus(id).call();
    //         // console.log("getStatus", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * get proposal id in iteration
     * @param id
     * @return array
     */
    // async proposalIteratorResult(id) {
    //     try {
    //         return await this.getProposal(id).then((proposal, error) => {
    //             // console.log("proposal", proposal);
    //             return proposal;
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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
     * get vetoes number
     * @param id
     * @return array
     */
    // async getVetoesNumber(id) {
    //     try {
    //         const result = await this.RootsVoting.methods.getVetosNumber(id).call();
    //         // console.log("getVetoesNumber", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * get vetoes percentage
     * @param id
     * @return array
     */
    // async getVetoesPercentage(id) {
    //     try {
    //         const result = await this.RootsVoting.methods.getVetosPercentage(id).call();
    //         // console.log("getVetoesPercentage", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // /**
    //  * vote against proposal
    //  * @param id
    //  * @return array
    //  */
    // async voteAgainst(id) {
    //     try {
    //         const result = await this.RootsVoting.methods.voteAgainst(id, true).call();
    //         // console.log("voteAgainst", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    //
    // /**
    //  * vote for proposal
    //  * @param id
    //  * @return array
    //  */
    // async voteFor(id) {
    //     try {
    //         const result = await this.RootsVoting.methods.voteFor.cacheSend(
    //            id, true, {from: "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"});
    //         // console.log("voteFor", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * vote for proposal
     * @param remark
     * @param userAddress
     * @param anyAddress, that you want to delete (my, root)
     * @return array
     */
    // async createProposal(remark, userAddress, anyAddress) {
    //     try {
    //         const result = await this.RootsVoting.methods.createProposal.cacheSend(
    //             remark, userAddress, anyAddress, {from: userAddress});
    //         // console.log("createProposal", result);
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
        console.log("DATA", data);
        let result = null;
        // const hash = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
        const link = data["external-link"];
        let addressToRemove = data.address;

        const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';
        if (data.first === "add-a-new-root-node") {
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
        } else if (data.first === "remove-a-current-root-node") {
            //TODO: error for empty_addr
            result = await this.contract.methods.createProposal(link, EMPTY_ADDR, userAddress).send(
                {from: userAddress});
        }


        return result;
    }
}
