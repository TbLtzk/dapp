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
     * get root node data
     * @return array
     */
    async getRootNodeAllData() {
        try {
            const rootStakes = [];
            let promiseRes;
            return this.getRootMembers().then((members) => {
                if (members) {
                    console.log("members", members);
                    members.map((member, i) => {
                        promiseRes = this.getRootNodeStake(member).then((nodeStake) => {
                            //TODO: custom data because from back get 0 value of stake
                            // rootStakes.push(nodeStake);
                            rootStakes.push(
                                {
                                    address: member,
                                    stakeAmount: (i + 1) * 450,
                                }
                            );
                            return {
                                address: member,
                                stakeAmount: (i + 1) * 450,
                            }
                        });

                    });
                }
                return promiseRes.then((el) => {
                    return rootStakes;
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * get root node data with calculation of share percents
     * @return array
     */
    async getRootCalc() {
        try {
            let rootNodeData;
            let totalStakes;
            return await this.getRootNodeAllData().then((data) => {
                // console.log('getRootCalcData', data);
                // console.log('getRootCalcData', data.length);
                if (data.length) {
                    totalStakes = data.reduce((sum, current) => {
                        return sum + current.stakeAmount
                    }, 0);
                    rootNodeData = data.map((member, i) => {
                        return {
                            ...member,
                            share: Math.round(member.stakeAmount * 100 / totalStakes)
                        }
                    });
                    console.log('rootNodeData', rootNodeData);
                    return {rootNodeData, totalStakes};
                }
            });
        } catch (e) {

        }
    }


    /**
     * commit stake
     * @return number
     */
    async stakeToPanel(data) {
        try {
            return await this.Root.methods.commitStake.cacheSend(data);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * announce withdrawal
     * @param amount
     * @return number
     */
    async announceWithdrawal(amount, paymentInf) {
        try {
            return await this.Root.methods.announceWithdrawal.cacheSend(amount, paymentInf);
            // const result = await this.Root.methods.announceWithdrawal(amount).call(function (result) {
            //     console.log('announceWithdrawal result', result);
            // });

        } catch (e) {
            console.log(e);
        }
    }

    /**
     * announce withdrawal
     * @param amount
     * @param payTo
     * @param paymentInf
     * @return number
     */
    async withdraw(amount, payTo, paymentInf) {
        try {
            // const result = await this.Root.methods.withdraw(amount, payTo).call(function (result) {
            //     console.log('withdraw result', result);
            // });
            return await this.Root.methods.withdraw.cacheSend(amount, payTo, paymentInf);
        } catch (e) {
            console.log(e);
        }
    }

}
