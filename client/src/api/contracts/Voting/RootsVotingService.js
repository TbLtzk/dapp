import {getPastEvents, getStatusTransformation, getPastProposalsIds} from "api/contracts/Voting/commonFunc";

export default class RootsVotingService {

    constructor(drizzle) {
        this.drizzle = drizzle;
        this.RootsVoting = drizzle.contracts.RootsVoting;
    }

    /**
     * get proposal event
     * @return array
     */
    async getProposalsEvent() {
        try {
            return await getPastEvents(this.drizzle, 'RootsVoting', 'ProposalCreated');
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
            const proposalIds = getPastProposalsIds(proposalEvents);
            console.log("proposalIds", proposalIds);
            let proposals = [];
            if (proposalIds) {
                for (let id of proposalIds) {
                    let objRes = {};
                    let promiseRes = await this.proposalIteratorResult(id);
                    // objRes = [...promiseRes];
                    if (promiseRes) {
                        objRes.id = id;
                        objRes.remark = promiseRes.base.remark;
                        objRes.candidate = promiseRes.candidate;
                        objRes.replaceDest = promiseRes.replaceDest;
                        objRes.votesCount = promiseRes.votesCount;
                        objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                        objRes.votesFor = promiseRes.base.counters.weightFor;
                        objRes.requiredMajority = promiseRes.base.params.requiredMajority;
                        objRes.requiredQuorum = promiseRes.base.params.requiredQuorum;
                        objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                        objRes.vetoThreshold = promiseRes.base.params.vetoThreshold;
                        objRes.votingEndTime = promiseRes.base.params.votingEndTime;
                        objRes.votingStartTime = promiseRes.base.params.votingStartTime;
                        let promiseStatus = await this.getProposalStatus(id);
                        // let getVotesAddress = await this.isUserVote(id, "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7");
                        // let getVotesFor = await this.getVotesFor(id);
                        // let getVotesAgainst = await this.getVotesAgainst(id);
                        // let getProposalStats = await this.getProposalStats(id);
                        // let getVetoesNumber = await this.getVetoesNumber(id);
                        // let getVetoesPercentage = await this.getVetoesPercentage(id);
                        // let voteFor = await this.voteFor(id);
                        // let voteAgainst = await this.voteAgainst(id);
                        objRes.status = getStatusTransformation(promiseStatus);
                    }
                    proposals.push(objRes);
                }
            }
            console.log("proposals", proposals);
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
    async getProposal(id) {
        try {
            const result = await this.RootsVoting.methods.proposals(id).call();
            // const result = await this.RootsVoting.methods.getProposal(id).call();
            console.log("result", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get proposal status
     * @param id
     * @return string
     */
    async getProposalStatus(id) {
        try {
            const result = await this.RootsVoting.methods.getStatus(id).call();
            // console.log("getStatus", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get proposal id in iteration
     * @param id
     * @return array
     */
    async proposalIteratorResult(id) {
        try {
            return await this.getProposal(id).then((proposal, error) => {
                // console.log("proposal", proposal);
                return proposal;
            });
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
            console.log("getVotesFor", result);
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
            console.log("getVotesAgainst", result);
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
    async getProposalStats(id) {
        try {
            const result = await this.RootsVoting.methods.getProposalStats(id).call();
            console.log("getProposalStats", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get vetoes number
     * @param id
     * @return array
     */
    async getVetoesNumber(id) {
        try {
            const result = await this.RootsVoting.methods.getVetosNumber(id).call();
            console.log("getVetoesNumber", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get vetoes percentage
     * @param id
     * @return array
     */
    async getVetoesPercentage(id) {
        try {
            const result = await this.RootsVoting.methods.getVetosPercentage(id).call();
            console.log("getVetoesPercentage", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * vote against proposal
     * @param id
     * @return array
     */
    async voteAgainst(id) {
        try {
            const result = await this.RootsVoting.methods.voteAgainst(id).call();
            console.log("voteAgainst", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * vote for proposal
     * @param id
     * @return array
     */
    async voteFor(id) {
        try {
            const result = await this.RootsVoting.methods.voteFor(id).call();
            console.log("voteFor", result);
            return result;
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
            console.log("createProposal", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}
