import { contracts } from '../config/drizzle-config';
import { fromWei } from 'func/balance';

export default class SystemBalance {

  constructor() {
    this.contract = contracts['SystemBalance'];
  }

  async getSurplus() {
    return fromWei(
      await this.contract.methods.getSurplus()
        .call()
    );
  }

  async getDebt() {
    try{
      return fromWei(
        await this.contract.methods.getDebt()
          .call()
      );
    }catch (e) {
      console.log("getDebt e")
    }

  }

  async getBalance() {
    return fromWei(
      await this.contract.methods.getBalance()
        .call()
    );
  }

}
