import {convertNumVotes, getPastEvents, getPastProposalsIds, getStatusTransformation} from "./commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class ConstitutionVotingService extends VotingService{

    // constructor(drizzle) {
    //     // super();
    //     this.drizzle = drizzle;
    //     this.ConstitutionVoting = drizzle.contracts.ConstitutionVoting;
    // }

    /**
     * get proposal event
     * @return array
     */
    // async getProposalsEvent() {
    //     try {
    //         return await getPastEvents(this.drizzle, 'ConstitutionVoting', 'ProposalCreated');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * get proposal sting type
     * @param type
     * @return string
     */
    getProposalStringType(type) {
        switch (Number(type)) {
            case 0:
                return "Basic";
            case 1:
                return "Fundamental";
            case 2:
                return "Detailed";
            default:
                return "None";
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
            let proposals = [];
            if (proposalIds) {
                for (let id of proposalIds) {
                    let objRes = {};
                    let promiseRes = await this.proposalIteratorResult(id);
                    if (promiseRes) {
                        console.log("ConstitutionVoting promiseRes", promiseRes);
                        objRes.id = id;
                        objRes.remark = promiseRes.base.remark;
                        const proposalType = this.getProposalStringType(promiseRes.classification);
                        objRes.type = proposalType;
                        objRes.constitutionHash = promiseRes.constitutionHash;
                        objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                        objRes.votesFor = promiseRes.base.counters.weightFor;
                        objRes.vetosCount = promiseRes.base.counters.vetosCount;
                        objRes.requiredMajority = convertNumVotes(promiseRes.base.params.requiredMajority);
                        objRes.requiredQuorum = convertNumVotes(promiseRes.base.params.requiredQuorum);
                        objRes.votingEndTime = promiseRes.base.params.votingEndTime;
                        objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                        objRes.addrValue = promiseRes.parameterValue.addrValue;
                        objRes.boolValue = promiseRes.parameterValue.boolValue;
                        objRes.bytes32Value = promiseRes.parameterValue.bytes32Value;
                        objRes.strValue = promiseRes.parameterValue.strValue;
                        objRes.uintValue = promiseRes.parameterValue.uintValue;
                        objRes.vetoThreshold = convertNumVotes(promiseRes.base.params.vetoThreshold);
                        let promiseStatus = await this.getProposalStatus(id);
                        objRes.status = getStatusTransformation(promiseStatus);
                        objRes.vetoesNumber = await this.getVetoesNumber(id);
                        objRes.vetoesPercentage = await this.getVetoesPercentage(id);
                        objRes.title = `${proposalType} constitution proposal`;
                        // let proposalStats = await this.getProposalStats(id);
                    }
                    proposals.push(objRes);
                }
            }
            return proposals;
        } catch (e) {

        }
    }

    /**
     * get proposal
     * @param id
     * @return array
     */
    // async getProposal(id) {
    //     try {
    //         const result = await this.ConstitutionVoting.methods.proposals(id).call();
    //         // const result = await this.RootsVoting.methods.getProposal(id).call();
    //         // console.log("result", result);
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
     * get proposal status
     * @param id
     * @return string
     */
    // async getProposalStatus(id) {
    //     try {
    //         const result = await this.ConstitutionVoting.methods.getStatus(id).call();
    //         // console.log("getStatus", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     * proposal status
     * @param id
     * @return array
     */
    // async getProposalStats(id) {
    //     try {
    //         const result = await this.ConstitutionVoting.methods.getProposalStats(id).call();
    //         console.log("getProposalStats", result);
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
    //         const result = await this.ConstitutionVoting.methods.getVetosNumber(id).call();
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
    //         const result = await this.ConstitutionVoting.methods.getVetosPercentage(id).call();
    //         // console.log("getVetoesPercentage", result);
    //         return result;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

}
