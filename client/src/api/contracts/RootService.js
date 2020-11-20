export default class RootService {

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

    /**
     * check is user is root member
     * @param userAddress
     * @return boolean
     */
    async checkMemberIsRoot(userAddress) {
        try {
            return await this.Root.methods.checkMember(userAddress).call();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get member count
     * @return number
     */
    async getMemberCount() {
        try {
            return await this.Root.methods.getCount().call();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get root node stake
     *  @param node
     * @return number
     */
    async getRootNodeStake(node) {
        try {
            return await this.Root.methods.getRootNodeStake(node).call();
        } catch (e) {
            console.log(e);
        }
    }
}
