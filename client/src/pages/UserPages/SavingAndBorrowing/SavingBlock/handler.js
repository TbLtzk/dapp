import {StableCoinQUSD} from 'contracts/src/StableCoin';
import {web3} from 'contracts/config/drizzle-config';
import {SavingQUSD} from 'contracts/src/Saving';
import {setTransactionCounter} from 'store/actions/action-creaters/transaction-handler';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import {maxApproveAmount} from 'func/numbers';
import {toWei, fromWei} from 'func/balance';
import {uintPerSecondToPerYearNumber} from 'func/useful';

export default class Handler {
  constructor(address, dispatch) {
    this.address = address;
    this.contractSavingQUSD = new SavingQUSD();
    this.contractStableCoinQUSD = new StableCoinQUSD();
    this.dispatch = dispatch;
  }

  setSavingBalanceIntRateEstInterest(savingBalanceSetter, interestRateSetter, estimatedInterestSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.getBalanceDetails().then((res) => {
      // console.log("setSavingBalanceIntRateEstInterest", res);
      const interestRate = uintPerSecondToPerYearNumber(res.interestRate);
      savingBalanceSetter(fromWei(res.currentBalance));
      interestRateSetter(interestRate);
      estimatedInterestSetter(res.currentBalance * ((1 + interestRate) / 100));
    }).catch((e) => {
      savingBalanceSetter(0);
      interestRateSetter('-');
      estimatedInterestSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setAvailableToDeposit(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractStableCoinQUSD.balanceOf(this.address).then((res) => {
      const resL = fromWei(res);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async deposit(amount, setterSavBal, setAvDep, setInterestRate, setEstInterest) {
    this.dispatch(setTransactionCounter(1));

    const amountL = toWei(amount);
    this.contractSavingQUSD.deposit(this.address, amount).then(() => {
      this.setSavingBalanceIntRateEstInterest(setterSavBal, setInterestRate, setEstInterest);
      this.setAvailableToDeposit(setAvDep);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async withdraw(amount, setterSavBal, setAvDep, setInterestRate, setEstInterest) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.withdraw(this.address, amount).then(() => {
      this.setSavingBalanceIntRateEstInterest(setterSavBal, setInterestRate, setEstInterest);
      this.setAvailableToDeposit(setAvDep);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
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
    const approve = await this.contractStableCoinQUSD.approve(this.contractSavingQUSD.address, maxApproveAmount, this.address);
    // const approve = await this.contractStableCoinQUSD.approve(this.contractSavingQUSD.address, 0, this.address);
    // console.log('approve', approve);
  }
}
