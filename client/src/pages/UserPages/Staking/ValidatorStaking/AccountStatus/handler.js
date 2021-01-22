import Validators from 'contracts/Validators';
import { web3 } from 'contracts/config/drizzle-config';
import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';

export default class Handler {
  constructor(address, dispatch, alert) {
    this.validators = new Validators();
    this.dispatch = dispatch;
    this.address = address;
    this.alert = alert;
  }

  setValidatorExist(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.validators.validatorExist(this.address).then((res) => {
      stateSetter(res);
    }).catch((e) => {
      stateSetter(false);
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setAccountableTotalStake(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.validators.getAccountableTotalStake(this.address).then((res) => {
      const resL = web3.utils.fromWei(res);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(false);
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setValidatorsList(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.validators.getPositiveValidatorStake().then((res) => {
      stateSetter(res);
    }).catch((e) => {
      stateSetter(false);
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setAnnToWithdrawData(annToWithdrawSetter, annToWithdrawEndTimeSetter) {
    this.dispatch(setTransactionCounter(1));

    this.validators.withdrawals(this.address).then((res) => {
      const amount = web3.utils.fromWei(res.amount);
      annToWithdrawSetter(amount);
      annToWithdrawEndTimeSetter(Number(res.endTime));
    }).catch((e) => {
      annToWithdrawSetter(0);
      annToWithdrawEndTimeSetter(0);
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setAccountBalance(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    web3.eth.getBalance(this.address).then((res) => {
      const resL = web3.utils.fromWei(res);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(false);
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async stakeToRanking(amount, valExSetter, accTotStSet, valListSet, accBalSet) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    this.validators.commitCollateral(this.address, amountL).then(() => {
      this.setValidatorExist(valExSetter);
      this.setAccountableTotalStake(accTotStSet);
      this.setValidatorsList(valListSet);
      this.setAccountBalance(accBalSet);
    }).catch((e) => {
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async announce(amount, accountableTotalStakeSetter, annToWithdrawSetter, annToWithdrawEndTimeSetter) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    this.validators.announceWithdrawal(amountL, this.address).then(() => {
      this.setAccountableTotalStake(accountableTotalStakeSetter);
      this.setAnnToWithdrawData(annToWithdrawSetter, annToWithdrawEndTimeSetter);
    }).catch((e) => {
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async withdrawFromRanking(amount, valExSetter, accTotStSet, valListSet, accBalSet, annToWithSet, annToWithETSet) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    this.validators.withdraw(amountL, this.address).then(() => {
      this.setValidatorExist(valExSetter);
      this.setAccountableTotalStake(accTotStSet);
      this.setValidatorsList(valListSet);
      this.setAccountBalance(accBalSet);
      this.setAnnToWithdrawData(annToWithSet, annToWithETSet);
    }).catch((e) => {
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async confirmValidation() {
    this.dispatch(setTransactionCounter(1));

    this.validators.enterShortList(this.address).then(() => {
    }).catch((e) => {
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }
}
