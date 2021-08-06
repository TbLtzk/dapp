/* eslint-disable max-classes-per-file */
import { contractsToAbi } from '../mapping/contract-to-abi'
import { toWei } from 'func/balance'
import { errorHanlder } from 'func/useful.js'

export class SavingQUSD {
  constructor (address) {
    this.contractName = 'SavingQUSD'
    this.address = address
    this.contract = new window.web3.eth.Contract(contractsToAbi[this.contractName], address)
    this.methods = this.contract.methods
  }

  async usersSavings (address) {
    return await this.methods.usersSavings(address)
      .call()
  }

  async deposit (address, amount) {
    return await errorHanlder(this.methods.deposit(toWei(amount))
      .send({ from: address }))
  }

  async withdraw (address, amount) {
    return await errorHanlder(this.methods.withdraw(toWei(amount))
      .send({ from: address }))
  }

  async claim (address) {
    return await this.methods.claim()
      .send({ from: address })
  }

  async compoundRateKeeper () {
    return await this.methods.compoundRateKeeper()
      .call()
  }

  async getBalanceDetails (accountId) {
    return await this.methods.getBalanceDetails()
      .call(
        {
          from: accountId || ''
        }
      )
  }

  async getBalance (accountId) {
    return await this.methods.getBalance()
      .call({
        from: accountId || ''
      })
  }

  async updateCompoundRate (address) {
    return await this.methods.updateCompoundRate()
      .send({ from: address })
  }
}
