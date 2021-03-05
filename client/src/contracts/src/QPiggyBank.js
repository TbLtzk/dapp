import { contracts } from '../config/drizzle-config';
import { fromWei, toWei } from 'func/balance';

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
      .call({ from: address });
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
      .send({ from: address });
  }

  async claimStakeDelegatorReward(address) {
    return await this.methods.claimStakeDelegatorReward()
      .send({ from: address });
  }

  async withdraw(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.withdraw(amountL)
      .send({ from: address });
  }

  async lock(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.lock(amountL)
      .send({ from: address });
  }

  async unlock(address, amount) {
    const amountL = toWei(amount);
    return await this.methods.unlock(amountL)
      .send({ from: address });
  }

  async delegateStake(address, delegateAddresses, stakes) {
    return await this.methods.delegateStake(delegateAddresses, stakes)
      .send({ from: address });
  }

  async getDelegations(address) {
    let resultArr = [];
    const delegationsList = await this.getDelegationsList(address);
    if (delegationsList === 0) {
      return [];
    } else {
      for (let member of delegationsList) {
        resultArr.push({
          validator: member.validator,
          idealStake: fromWei(member.idealStake),
          claimableReward: fromWei(member.claimableReward),
        });
      }
      return resultArr;
    }
  }

  async getOutstandingDelegationRewards(address) {
    let sumArr = [];
    const delegationsList = await this.getDelegationsList(address);
    if (delegationsList.length === 0) {
      return 0;
    } else {
      for (let member of delegationsList) {
        sumArr.push(+fromWei(member?.claimableReward));
      }
      if (sumArr?.length !== 0) {
        const result = sumArr.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
        return result;
      } else {
        return 0;
      }
    }
  }
}
