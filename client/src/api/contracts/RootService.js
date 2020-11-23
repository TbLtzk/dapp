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

    /**
     * get root node stake
     * @return array
     */
    async getRootNodeAllData() {
        try {
            const rootMembers = [];
            const rootStakes = [];
            return this.getRootMembers().then((members) => {

                console.log('getRootMembersIn', members);
                if (members) {
                    members.map((member, i) => {
                        this.getRootNodeStake(member).then((nodeStake) => {
                            // rootStakes.push(nodeStake);
                            rootStakes.push((i + 1) * 4);
                        });
                    });

                }
                // let result = rootStakes.reduce((sum, current) =>{
                //     console.log('current', current);
                //     return sum + current
                // }, 0);
                // console.log('rootStakesIN', rootStakes);
                // console.log('stakeSumIN', result);
                return rootStakes;

            });

            // return await this.Root.methods.getRootNodeStake(node).call();
        } catch (e) {
            console.log(e);
        }
    }

    async getRootCalc() {
        try {
            const result = await this.getRootNodeAllData();
            console.log('getRootCalc', result);
            let res = result.reduce((sum, current) => {
                console.log('current', current);
                return sum + current
            }, 0);
            console.log('stakeSumIn', res);

        } catch (e) {

        }
    }
}
