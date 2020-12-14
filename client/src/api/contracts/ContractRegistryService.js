export default class ContractRegistryService {

    constructor(drizzle) {
        this.drizzle = drizzle;
        this.contractRegistry = drizzle.contracts.ContractRegistry;
    }

    /**
     * get contract address
     * @return string
     */
    async getAddress() {
        try {
            //root contract address
            // const res = await this.contractRegistry.methods.getAddress("governance.rootNodes").call();
            //ConstitutionParametersVoting
            // const res = await this.contractRegistry.methods.getAddress("governance.rootNodes.membershipVoting").call();
            //ValidatorsSlashingVoting
            // const res = await this.contractRegistry.methods.getAddress("governance.validators.slashingVoting").call();
            //RootNodesSlashingVoting
            // const res = await this.contractRegistry.methods.getAddress("governance.rootNodes.slashingVoting").call();
            //EPQFI_MembershipVoting
            // const res = await this.contractRegistry.methods.getAddress("governance.experts.EPQFI.membershipVoting").call();
            //EPDR_MembershipVoting
            // const res = await this.contractRegistry.methods.getAddress("governance.experts.EPDR.membershipVoting").call();
            //EPQFI_ParametersVoting
            //  const res = await this.contractRegistry.methods.getAddress("governance.experts.EPQFI.parametersVoting").call();
            //EPDR_ParametersVoting
            const res = await this.contractRegistry.methods.getAddress("governance.experts.EPDR.parametersVoting").call();
            //ConstitutionVoting
            // const res = await this.contractRegistry.methods.getAddress("governance.constitution.parametersVoting").call();
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
