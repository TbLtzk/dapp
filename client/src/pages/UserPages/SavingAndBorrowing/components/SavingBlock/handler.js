import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';

import { StableCoinQUSD } from 'contracts/src/StableCoin';
import { SavingQUSD } from 'contracts/src/Saving';

import { MAX_APPROVE_AMOUNT } from 'constants/numbers';
import { fromWei } from 'func/balance';
import { uintPerSecondToPerYearNumber } from 'func/useful';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

export default class Handler {
  constructor(address, dispatch) {
    this.address = address;
    this.contractSavingQUSD = new SavingQUSD(contractsToAddresses['SavingQUSD']);
    this.contractStableCoinQUSD = new StableCoinQUSD();
    this.dispatch = dispatch;
  }

  setSavingBalanceIntRateEstInterest(savingBalanceSetter, interestRateSetter, estimatedInterestSetter, setLoadingInf) {
    setLoadingInf(true);
    this.contractSavingQUSD.getBalanceDetails()
      .then((res) => {
        const interestRate = res?.interestRate ? uintPerSecondToPerYearNumber(res.interestRate) : 0;
        const currentBalance = res?.currentBalance ? fromWei(res.currentBalance) : 0;
        savingBalanceSetter(currentBalance);
        interestRateSetter(interestRate);
        estimatedInterestSetter(currentBalance * ((1 + interestRate) / 100));
        setLoadingInf(false);
      })
      .catch((e) => {
        savingBalanceSetter(0);
        interestRateSetter('-');
        estimatedInterestSetter(0);
        setLoadingInf(false);
        console.log(e);
      })
      .finally(() => {});
  }

  setAvailableToDeposit(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractStableCoinQUSD.balanceOf(this.address)
      .then((res) => {
        const resL = fromWei(res);
        stateSetter(resL);
      })
      .catch((e) => {
        stateSetter(0);
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async deposit(amount, setterSavBal, setAvDep, setInterestRate, setEstInterest, setLoadingInf) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.deposit(this.address, amount)
      .then(() => {
        this.setSavingBalanceIntRateEstInterest(setterSavBal, setInterestRate, setEstInterest, setLoadingInf);
        this.setAvailableToDeposit(setAvDep);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async withdraw(amount, setterSavBal, setAvDep, setInterestRate, setEstInterest, setLoadingInf) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.withdraw(this.address, amount)
      .then(() => {
        this.setSavingBalanceIntRateEstInterest(setterSavBal, setInterestRate, setEstInterest, setLoadingInf);
        this.setAvailableToDeposit(setAvDep);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  allowance(stateSetter) {
    this.contractStableCoinQUSD.allowance(this.address, this.contractSavingQUSD.address)
      .then((res) => {
        stateSetter(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async approve() {
    await this.contractStableCoinQUSD.approve(
      this.contractSavingQUSD.address,
      MAX_APPROVE_AMOUNT,
      this.address);
  }
}
