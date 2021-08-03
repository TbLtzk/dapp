import ValidationRewardPools from 'contracts/src/ValidationRewardPools'
import { validationRewardPoolsInstance } from 'contracts/contracts'

import {
  uintPercentToNumber,
  getPercentageFormat,
  uintPerSecondToPerYearNumber
} from 'func/useful'
import { percentageToPercentPerSecond, fromWei } from 'func/balance'

import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler'

const contractVRP = new ValidationRewardPools()

export default class Handler {
  constructor (address, dispatch) {
    this.address = address
    this.dispatch = dispatch
  }

  getAmountOfRewardPool (stateSetter) {
    this.dispatch(setTransactionCounter(1))

    contractVRP.getBalance(this.address)
      .then((res) => {
        const bal = fromWei(res)
        stateSetter(bal)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1))
      })
  }

  setInterestRate (formData, stateSetter) {
    this.dispatch(setTransactionCounter(1))

    const amountL = percentageToPercentPerSecond(formData.amount)
    validationRewardPoolsInstance.setInterestRate(amountL)
      .then(() => {
        this.getInterestRate(stateSetter)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1))
      })
  }

  getInterestRate (stateSetter) {
    this.dispatch(setTransactionCounter(1))

    validationRewardPoolsInstance.getInterestRate(this.address)
      .then((res) => {
        const rate = uintPerSecondToPerYearNumber(res)
        // const rate = uintPercentToNumber(res) * 100;
        stateSetter(rate)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1))
      })
  }

  setDelegatorShare (formData, stateSetter) {
    this.dispatch(setTransactionCounter(1))
    const delShare = getPercentageFormat(formData.amount)
    validationRewardPoolsInstance.setDelegatorsShare(delShare)
      .then(() => {
        this.getDelegatorShare(stateSetter)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1))
      })
  }

  getDelegatorShare (stateSetter) {
    this.dispatch(setTransactionCounter(1))

    validationRewardPoolsInstance.getDelegatorsShare(this.address)
      .then((res) => {
        const rate = uintPercentToNumber(res) * 100
        stateSetter(rate)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1))
      })
  }

  getPoolInfo (stateSetter) {
    this.dispatch(setTransactionCounter(1))

    validationRewardPoolsInstance.getPoolInfo(this.address)
      .then((res) => {
        const info = res
        stateSetter(fromWei(info[1]))
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1))
      })
  }
}
