import {convertNumVotes, getPastEvents, getPastProposalsIds, getStatusTransformation} from "./commonFunc";

export default class VotingService {

    constructor(drizzle, contractName) {
        this.drizzle = drizzle;
        this.contract = drizzle.contracts[contractName];
        this.contractName = contractName;
    }

    /**
     * get proposal event
     * @return array
     */
    async getProposalsEvent() {
        try {
            return await getPastEvents(this.drizzle, this.contractName, 'ProposalCreated');
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
            // console.log("getProposalStats", result);
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

    /**
     * vote against proposal
     * @param id
     * @return array
     */
    async voteAgainst(id) {
        try {
            const result = await this.contract.methods.voteAgainst(id, true).call();
            // console.log("voteAgainst", result);
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
            const result = await this.contract.methods.voteFor.cacheSend(
                id, true, {from: "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"});
            // console.log("voteFor", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * create proposal
     * @param remark
     * @param userAddress
     * @param anyAddress, that you want to delete (my, root)
     * @return array
     */
    async createProposal1(data, userAddress) {
        console.log("data", data);
        console.log("classification", data.classification);
        console.log("classification number", this.getProposalNumberType(data?.classification));
        let result = null;
        const classification = this.getProposalNumberType(data?.classification);
        const hash = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
        // const hash = data.hash;
        const link = data["external-link"];
        console.log("hash", data.hash);
        console.log("external-link", data["external-link"]);
        console.log("change_constitution_parameter", data["change-constitution-parameter"]);
        if (data["type-proposal"]) {
            const type = data["type-proposal"];
            const parameterKey = "test";
            // const parameterKey = data["parameter-key"];
            // const value = data.value;
            const value = 123;
            console.log("type_proposal", data["type-proposal"]);
            console.log("parameter-key", data["parameter-key"]);
            console.log("value", data.value);
            switch (type) {
                case "address":
                    result = await this.contract.methods.createAddrProposal(link, classification, hash, parameterKey, value).send({from: userAddress});
                    console.log("type-proposal address");
                    break;
                case "string":
                    result = await this.contract.methods.createStrProposal(link, classification, hash, parameterKey, 'abcd').send({from: userAddress});
                    console.log("type-proposal string");
                    break;
                case "boolean":
                    result = await this.contract.methods.createBoolProposal(link, classification, hash, parameterKey, true).send({from: userAddress});
                    console.log("type-proposal boolean");
                    break;
                case "uint":
                    result = await this.contract.methods.createUintProposal(link, classification, hash, parameterKey, 123).send({from: userAddress});
                    console.log("type-proposal uint");
                    break;

            }
        } else {
            console.log("NO TYPE PROPOSAL");
            console.log("link",link);
            console.log("classification",classification);
            console.log("hash",hash);
            console.log("this.contract",this.contract);
            console.log("userAddress",userAddress);
            const NEW_CONSTITUTION_HASH = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();

            // result = await this.contract.methods.createProposal.cacheSend(
            //     link, classification, hash, {from: userAddress});
            const createProposal = await this.contract.methods.createProposal.cacheSend(
                "https://example1.com", 0, NEW_CONSTITUTION_HASH, {from: userAddress});
        }
        // console.log("Create constitution voting", data, userAddress);
        return result;
        // const result = await this.contract.methods.createProposal.cacheSend(
        //     remark, userAddress, anyAddress, {from: userAddress});
        // // console.log("createProposal", result);
        // return result;

    }

}
