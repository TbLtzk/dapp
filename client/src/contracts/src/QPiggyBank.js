import {contracts} from '../config/drizzle-config';
import {fromWei, toWei} from 'func/balance';
import {uintPerSecondToPerYearNumber} from 'func/useful';

const contractName = 'QPiggyBank';

export default class QPiggyBank {
  constructor() {
    this.methods = contracts[contractName].methods;
  }

  async getUserBalance(address) {
    return await this.methods.getUserBalance(address)
        .call();
  }

  async getDelegationsList(address) {
    return await this.methods.getDelegationsList(address)
        .call();
  }

  async deposit(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.deposit()
        .send({
          from: address,
          value: amountL,
        });
  }

  async getLockInfo(address) {
    return await this.methods.getLockInfo()
        .call({from: address});
  }

  async getBalanceDetails() {
    return await this.methods.getBalanceDetails()
        .call();
  }

  async compoundRateKeeper() {
    return await this.methods.compoundRateKeeper()
        .call();
  }

  async updateCompoundRate(address) {
    return await this.methods.updateCompoundRate()
        .send({from: address});
  }

  async withdraw(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.withdraw(amountL)
        .send({from: address});
  }

  async lock(address, amount) {
    const amountL = toWei(amount);
    console.log(amount);
    return await this.methods.lock(amountL)
        .send({from: address});
  }

  async unlock(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.unlock(amountL)
        .send({from: address});
  }

  async delegateStake(address, delegateAddresses, stakes) {
    return await this.methods.delegateStake(delegateAddresses, stakes)
        .send({from: address});
  }

  async getDelegations(address) {
    let resultArr = [];
    const delegationsList = await this.getDelegationsList(address);
    console.log('delegationsList', delegationsList);
    if (delegationsList === 0) {
      return [];
    } else {
      for (let member of delegationsList) {
        console.log("compoundRate",  (member.compoundRate));
        console.log("uintPerSecondToPerYearNumber",  uintPerSecondToPerYearNumber(member.compoundRate));
        resultArr.push({
          validator: member.validator,
          idealStake: fromWei(member.idealStake),
          compoundRate: uintPerSecondToPerYearNumber(member.compoundRate),
          claimableReward: (member.claimableReward),
        });
      }
      console.log("resultArr", resultArr);
      return resultArr;
    }
  }
}
