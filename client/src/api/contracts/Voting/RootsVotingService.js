import {getPastEvents} from "api/contracts/Voting/commonFunc";

export default class RootsVotingService {

    constructor(drizzle) {
        this.drizzle = drizzle;
        this.RootsVoting = drizzle.contracts.RootsVoting;
    }

    /**
     * get proposals
     * @return array
     */
    async getProposals() {
        try {
            const proposalEvents = await getPastEvents(this.drizzle, 'RootsVoting', 'ProposalCreated');
            const proposalIds = proposalEvents?.map(evt => evt.returnValues._id);
            console.log("proposalIds", proposalIds);
            let proposals = [];
            let promiseRes;
            if (proposalIds) {
                proposals = proposalIds.map((id, i) => {
                    promiseRes = this.getProposal(id).then((proposal, error) => {
                        console.log("proposal", proposal);
                        return proposals.push(proposal);
                    });
                });
            }

            // const result = await this.RootsVoting.methods.getProposal(proposalIds[0]).call();
            console.log("proposals", proposals);
            return promiseRes.then((el) => {
                return proposals;
            });
            // return await Promise.all(proposals);
            // return await this.ConstitutionVoting.methods.getMembers().call();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get proposal
     * @return array
     */
    async getProposal(id) {
        try {
            const result = await this.RootsVoting.methods.getProposal(id).call();
            console.log("result", result);
            return result;
        } catch (e) {
            console.log(e);
        }
    }


}
