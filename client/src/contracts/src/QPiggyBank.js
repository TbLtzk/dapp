import Web3 from 'web3';
import { contractsToAbi } from '../mapping/contract-to-abi';

const web3 = new Web3(Web3.givenProvider);
web3.eth.handleRevert = true;

export default class QPiggyBank {
  constructor(address) {
    this.contractName = 'QPiggyBank';
    this.contract = new web3.eth.Contract(contractsToAbi[this.contractName], address)
    this.methods = this.contract.methods;
  }

  async getUserBalance(address) {
    return await this.methods.getUserBalance(address)
      .call();
  }

  async deposit(address, amountL) {
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
}
