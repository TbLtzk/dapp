import {drizzle} from "./config/drizzle-config";

export default class QPiggyBank {
    constructor() {
        this.methods = drizzle.contracts[this.constructor.name].methods;
    }

    async getUserBalance(userAddress) {
        return await this.methods.getUserBalance(userAddress).call();
    }

    async getLockedAssets(who) {
        return await this.methods.getLockedAssets(who).call();
    }

    async deposit(abandonClaims = true) {
        return await this.methods.deposit(abandonClaims).call();
    }
}
