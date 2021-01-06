import Validators from 'contracts/Validators';
import ValidationRewardPools from 'contracts/ValidationRewardPools';
import { numberToUintPercent, roundNumber, uintPercentToNumber } from 'func/useful';
import { setTransactionCounter } from '../../../../store/actions/action-creaters/transaction-handler';

const contractValidators = new Validators();
const contractVRP = new ValidationRewardPools();

export default class Handler {
  constructor(address, dispatch) {
    this.address = address;
    this.dispatch = dispatch;
  }

  getAmountOfRewardPool(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    contractVRP.getBalance(this.address).then((res) => {
      const rate = roundNumber(uintPercentToNumber(res), 2);
      stateSetter(rate);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setInterestRate(formData, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const amountL = numberToUintPercent(formData.amount);
    contractValidators.setInterestRate(this.address, amountL).then(() => {
      this.getInterestRate(stateSetter);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  getInterestRate(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    contractValidators.getInterestRate(this.address).then((res) => {
      const rate = roundNumber(uintPercentToNumber(res), 2);
      stateSetter(rate);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setValidatorShare(formData, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const delShare = numberToUintPercent(100 - formData.amount);
    contractValidators.setDelegatorsShare(this.address, delShare).then(() => {
      this.getDelegatorShare(stateSetter);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  getDelegatorShare(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    contractValidators.getDelegatorsShare(this.address).then((res) => {
      const rate = roundNumber(uintPercentToNumber(res), 2);
      stateSetter(rate);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }
}
