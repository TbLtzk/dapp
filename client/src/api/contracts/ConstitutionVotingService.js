export default class ConstitutionVotingService {

    constructor(drizzle) {
        this.drizzle = drizzle;
        this.ConstitutionVoting = drizzle.contracts.ConstitutionVoting;
    }

    /**
     * get root members
     * @return array
     */
    async getRootMembers() {
        try {
            return await this.ConstitutionVoting.methods.getMembers().call();
        } catch (e) {
            console.log(e);
        }
    }


}
