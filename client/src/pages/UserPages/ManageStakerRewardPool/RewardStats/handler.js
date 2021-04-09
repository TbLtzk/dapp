import ValidationRewardPools from 'contracts/src/ValidationRewardPools';
import { validationRewardPoolsInstance } from 'contracts/contracts';

import {
  uintPercentToNumber,
  getPercentageFormat,
  uintPerSecondToPerYearNumber
} from 'func/useful';
import { percentageToPercentPerSecond } from 'func/balance';

import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';

const contractVRP = new ValidationRewardPools();

export default class Handler {
  constructor(address, dispatch) {
    this.address = address;
    this.dispatch = dispatch;
  }

  getAmountOfRewardPool(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    contractVRP.getBalance(this.address)
      .then((res) => {
        const rate = uintPercentToNumber(res) * 100;
        stateSetter(rate);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  setInterestRate(formData, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const amountL = percentageToPercentPerSecond(formData.amount);
    validationRewardPoolsInstance.setInterestRate(this.address, amountL)
      .then(() => {
        this.getInterestRate(stateSetter);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  getInterestRate(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    validationRewardPoolsInstance.getInterestRate(this.address)
      .then((res) => {
        const rate = uintPerSecondToPerYearNumber(res);
        // const rate = uintPercentToNumber(res) * 100;
        stateSetter(rate);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  setValidatorShare(formData, stateSetter) {
    this.dispatch(setTransactionCounter(1));
    const delShare = getPercentageFormat(formData.amount);
    validationRewardPoolsInstance.setDelegatorsShare(this.address, delShare)
      .then(() => {
        this.getDelegatorShare(stateSetter);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  getDelegatorShare(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    validationRewardPoolsInstance.getDelegatorsShare(this.address)
      .then((res) => {
        const rate = uintPercentToNumber(res) * 100;
        stateSetter(rate);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }
}
