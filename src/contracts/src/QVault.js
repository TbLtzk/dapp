import { fromWei } from 'func/balance.js'
import { contractsToAbi } from '../mapping/contract-to-abi';

const array = [
  {
    id: 1,
    amount: "10",
    startDate: "13.07.21 21:30:33",
    endDate: "16.07.21 21:30:33",
  },
  {
    id: 2,
    amount: "103",
    startDate: "13.07.21 21:30:33",
    endDate: "16.07.21 21:30:33",
  },
  {
    id: 3,
    amount: "101",
    startDate: "13.07.21 21:30:33",
    endDate: "15.07.21 21:30:33",
  },
  {
    id: 4,
    amount: "120",
    startDate: "13.07.21 21:30:33",
    endDate: "22.07.21 21:30:33",
  },
  {
    id: 5,
    amount: "510",
    startDate: "13.07.21 21:30:33",
    endDate: "15.07.21 21:30:33",
  },
];

export default class QVault {
  constructor(address) {
    this.contractName = 'QVault';
    this.contract = new window.web3.eth.Contract(contractsToAbi[this.contractName], address)
    this.methods = this.contract.methods;
  }

  async getUserBalance(address) {
    return await this.methods.getUserBalance(address)
      .call();
  }

  async getDelegationsList(address) {
    return await this.methods.getDelegationsList(address)
      .call();
  }

  async deposit(address, amountL) {
    return await this.methods.deposit()
      .send({
        from: address,
        value: amountL,
      });
  }

  async getTimeLockedAmounts(address) {
    const res = {
      amount: "100000000000000000000",
      releaseStart: "1626872970",
      releaseEnd: "1627000000",
    };
    return array;
  }

  async getLockInfo(address) {
    const res = await this.methods.getLockInfo()
      .call({ from: address });
    return res
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

  async withdraw(address, amountL) {
    return await this.methods.withdraw(amountL)
      .send({ from: address });
  }

  async lock(address, amountL) {
    return await this.methods.lock(amountL)
      .send({ from: address });
  }

  async unlock(address, amountL) {
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
          actualStake: fromWei(member.actualStake),
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
