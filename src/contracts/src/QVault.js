import { fromWei } from 'func/balance.js'
import { contractsToAbi } from '../mapping/contract-to-abi'

export default class QVault {
  constructor (address) {
    this.contractName = 'QVault'
    this.contract = new window.web3.eth.Contract(contractsToAbi[this.contractName], address)
    this.methods = this.contract.methods
  }

  async getUserBalance (address) {
    return await this.methods.getUserBalance(address)
      .call()
  }

  async getDelegationsList (address) {
    return await this.methods.getDelegationsList(address)
      .call()
  }

  async deposit (address, amountL) {
    return await this.methods.deposit()
      .send({
        from: address,
        value: amountL
      })
  }

  async getLockInfo (address) {
    return await this.methods.getLockInfo()
      .call({ from: address })
  }

  async getBalanceDetails () {
    return await this.methods.getBalanceDetails()
      .call()
  }

  async compoundRateKeeper () {
    return await this.methods.compoundRateKeeper()
      .call()
  }

  async updateCompoundRate (address) {
    return await this.methods.updateCompoundRate()
      .send({ from: address })
  }

  async claimStakeDelegatorReward (address) {
    return await this.methods.claimStakeDelegatorReward()
      .send({ from: address })
  }

  async withdraw (address, amountL) {
    return await this.methods.withdraw(amountL)
      .send({ from: address })
  }

  async lock (address, amountL) {
    return await this.methods.lock(amountL)
      .send({ from: address })
  }

  async unlock (address, amountL) {
    return await this.methods.unlock(amountL)
      .send({ from: address })
  }

  async delegateStake (address, delegateAddresses, stakes) {
    return await this.methods.delegateStake(delegateAddresses, stakes)
      .send({ from: address })
  }

  async getDelegations (address) {
    const resultArr = []
    const delegationsList = await this.getDelegationsList(address)
    if (delegationsList === 0) {
      return []
    } else {
      for (const member of delegationsList) {
        resultArr.push({
          validator: member.validator,
          actualStake: fromWei(member.actualStake),
          claimableReward: fromWei(member.claimableReward)
        })
      }
      return resultArr
    }
  }

  async getOutstandingDelegationRewards (address) {
    const sumArr = []
    const delegationsList = await this.getDelegationsList(address)
    if (delegationsList.length === 0) {
      return 0
    } else {
      for (const member of delegationsList) {
        sumArr.push(+fromWei(member?.claimableReward))
      }
      if (sumArr?.length !== 0) {
        const result = sumArr.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        })
        return result
      } else {
        return 0
      }
    }
  }
}
