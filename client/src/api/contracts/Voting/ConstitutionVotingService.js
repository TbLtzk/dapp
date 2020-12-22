import {convertNumVotes, getPastEvents, getPastProposalsIds, getStatusTransformation} from "api/contracts/Voting/handler/commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class ConstitutionVotingService extends VotingService {

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
                        let promiseStatus = await this.getProposalStatus(id);
                        if (promiseStatus === "1"){
                            console.log("promiseRes", promiseRes);
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
                            objRes.status = getStatusTransformation(promiseStatus);
                            objRes.vetoesNumber = await this.getVetoesNumber(id);
                            objRes.vetoesPercentage = await this.getVetoesPercentage(id);
                            objRes.title = `${proposalType} constitution proposal`;
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
            return proposals;
        } catch (e) {

        }
    }

    /**
     * get proposal number type
     * @param type
     * @return number
     */
    getProposalNumberType(type) {
        switch (type) {
            case "basic-part":
                return 0;
            case "fundamental-part":
                return 1;
            case "detailed-part":
                return 2;
            default:
                return 0;
        }
    }

    /**
     * create proposal
     * @param data
     * @param userAddress
     * @return string
     */
    async createProposal(data, userAddress) {
        let result = null;
        const classification = this.getProposalNumberType(data?.classification);
        // const hash = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
        const hash = data.hash.toLowerCase();
        const link = data["external-link"];
        const type = data["type-proposal"];
        if (type) {
            const parameterKey = data["parameter-key"];
            let valueInput = data.value;
            switch (type) {
                case "address":
                    valueInput = "0xcca19442F5b3e5Fa71aaE69C092aC280e81Fd39f";
                    result = await this.contract.methods.createAddrProposal(link, classification, hash,
                        parameterKey, valueInput).send({from: userAddress});
                    break;
                case "string":
                    valueInput = "abcd";
                    result = await this.contract.methods.createStrProposal(link, classification, hash,
                        parameterKey, valueInput).send({from: userAddress});
                    break;
                case "boolean":
                    valueInput = (valueInput === 'true');
                    console.log("valueInput", valueInput);
                    result = await this.contract.methods.createBoolProposal(link, classification, hash,
                        parameterKey, valueInput).send({from: userAddress});
                    break;
                case "uint":
                    valueInput = Number(valueInput);
                    result = await this.contract.methods.createUintProposal(link, classification, hash,
                        parameterKey, valueInput).send({from: userAddress});
                    break;

            }
        } else {
            result = await this.contract.methods.createProposal(link, classification, hash).send(
                {from: userAddress});
        }

        return result;
    }
}
