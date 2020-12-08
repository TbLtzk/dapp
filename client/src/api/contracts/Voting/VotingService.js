import {convertNumVotes, getPastEvents, getPastProposalsIds, getStatusTransformation} from "./commonFunc";

export default class VotingService {

    constructor(drizzle, contractName) {
        console.log("drizzle", drizzle);
        console.log("contractName", contractName);
        this.drizzle = drizzle;
        this.contract = drizzle.contracts[contractName];
    }

    /**
     * get proposal event
     * @return array
     */
    async getProposalsEvent() {
        try {
            return await getPastEvents(this.drizzle, this.contract, 'ProposalCreated');
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
            const result = await this.contract.methods.proposals(id).call();
            // console.log("result", result);
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
     * get proposal status
     * @param id
     * @return string
     */
    async getProposalStatus(id) {
        try {
            const result = await this.contract.methods.getStatus(id).call();
            // console.log("getStatus", result);
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
            const result = await this.contract.methods.getProposalStats(id).call();
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
            const result = await this.contract.methods.getVetosNumber(id).call();
            // console.log("getVetoesNumber", result);
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
            const result = await this.contract.methods.getVetosPercentage(id).call();
            // console.log("getVetoesPercentage", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

}
