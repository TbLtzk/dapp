export default class ConstitutionVotingService {

    constructor(drizzle) {
        this.drizzle = drizzle;
        this.ConstitutionVoting = drizzle.contracts.ConstitutionVoting;
    }

    /**
     * get created proposals
     * @return array
     */
    async getCreatedProposals() {
        try {
            const proposalEvents = await this.ConstitutionVoting.getPastEvents('ProposalCreated', { fromBlock: 0, toBlock: 'latest' }).call();
            console.log("proposalEvents", proposalEvents);

            // return await this.ConstitutionVoting.methods.getMembers().call();
        } catch (e) {
            console.log(e);
        }
    }


}
