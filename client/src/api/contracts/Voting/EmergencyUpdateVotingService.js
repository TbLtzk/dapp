import {convertNumVotes, getPastEvents, getPastProposalsIds, getStatusTransformation} from "./commonFunc";
import VotingService from "api/contracts/Voting/VotingService";

export default class EmergencyUpdateVotingService extends VotingService {

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
                        objRes.id = id;
                        // objRes.remark = promiseRes.base.remark;
                        // const proposalType = this.getProposalStringType(promiseRes.classification);
                        // objRes.type = proposalType;
                        // objRes.constitutionHash = promiseRes.constitutionHash;
                        // objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
                        // objRes.votesFor = promiseRes.base.counters.weightFor;
                        // objRes.vetosCount = promiseRes.base.counters.vetosCount;
                        // objRes.requiredMajority = convertNumVotes(promiseRes.base.params.requiredMajority);
                        // objRes.requiredQuorum = convertNumVotes(promiseRes.base.params.requiredQuorum);
                        // objRes.votingEndTime = promiseRes.base.params.votingEndTime;
                        // objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
                        // objRes.addrValue = promiseRes.parameterValue.addrValue;
                        // objRes.boolValue = promiseRes.parameterValue.boolValue;
                        // objRes.bytes32Value = promiseRes.parameterValue.bytes32Value;
                        // objRes.strValue = promiseRes.parameterValue.strValue;
                        // objRes.uintValue = promiseRes.parameterValue.uintValue;
                        // objRes.vetoThreshold = convertNumVotes(promiseRes.base.params.vetoThreshold);
                        // let promiseStatus = await this.getProposalStatus(id);
                        // objRes.status = getStatusTransformation(promiseStatus);
                        // objRes.vetoesNumber = await this.getVetoesNumber(id);
                        // objRes.vetoesPercentage = await this.getVetoesPercentage(id);
                        // objRes.title = `${proposalType} constitution proposal`;
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
     * create proposal
     * @param data
     * @param userAddress
     * @return string
     */
    async createProposal(data, userAddress) {
        console.log("data", data);
        const link = data["external-link"];
        console.log("external-link", data["external-link"]);
        const result = await this.contract.methods.createProposal.cacheSend(
            link, {from: userAddress});
        return result;

    }
}
