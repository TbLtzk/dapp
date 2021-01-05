import Validators from 'contracts/Validators';
import ValidationRewardPools from 'contracts/ValidationRewardPools';
import { numberToUintPercent, roundNumber, uintPercentToNumber } from 'func/useful';

const contractValidators = new Validators();
const contractVRP = new ValidationRewardPools();

export default class Handler {
  constructor(address) {
    this.address = address;
  }

  getAmountOfRewardPool(stateSetter) {
    contractVRP.getBalance(this.address).then((res) => {
      const rate = roundNumber(uintPercentToNumber(res), 2);
      stateSetter(rate);
    }).catch((e) => { console.log(e); });
  }

  setInterestRate(formData, stateSetter) {
    const amountL = numberToUintPercent(formData.amount);
    contractValidators.setInterestRate(this.address, amountL).then(() => {
      this.getInterestRate(stateSetter);
    });
  }

  getInterestRate(stateSetter) {
    contractValidators.getInterestRate(this.address).then((res) => {
      const rate = roundNumber(uintPercentToNumber(res), 2);
      stateSetter(rate);
    }).catch((e) => { console.log(e); });
  }

  setValidatorShare(formData, stateSetter) {
    const delShare = numberToUintPercent(100 - formData.amount);
    contractValidators.setDelegatorsShare(this.address, delShare).then(() => {
      this.getDelegatorShare(stateSetter);
    });
  }

  getDelegatorShare(stateSetter) {
    contractValidators.getDelegatorsShare(this.address).then((res) => {
      const rate = roundNumber(uintPercentToNumber(res), 2);
      stateSetter(rate);
    }).catch((e) => { console.log(e); });
  }
}
