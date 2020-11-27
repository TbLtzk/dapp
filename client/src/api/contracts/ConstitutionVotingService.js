export default class ConstitutionVotingService {

    constructor(drizzle) {
        this.drizzle = drizzle;
        this.Root = drizzle.contracts.Root;
    }

    /**
     * get root members
     * @return array
     */
    async getRootMembers() {
        try {
            return await this.Root.methods.getMembers().call();
        } catch (e) {
            console.log(e);
        }
    }


}
