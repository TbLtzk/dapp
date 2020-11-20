export default class ContractRegistryService {

    constructor(drizzle) {
        this.drizzle = drizzle;
        this.contractRegistry = drizzle.contracts.ContractRegistry;
    }

    /**
     * get root contract address
     * @return string
     */
    async getAddress() {
        try{
            const res = await this.contractRegistry.methods.getAddress("governance.rootNodes").call();
            // const res = await (this.contractRegistry.methods.getAddress("governance.rootNodes").call(async function (err, address) {
            //     console.log('get address from registry err: ' + err);
            //     if (err){
            //         throw new Error(err);
            //     }
            //     console.log(address);
            //     return address;
            // }));
            return res;
        } catch (e) {
           console.log(e);
        }
    }
}
