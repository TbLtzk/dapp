import Validators from 'contracts/src/Validators';
import {web3} from 'contracts/config/drizzle-config';
import {setTransactionCounter} from 'store/actions/action-creaters/transaction-handler';
import {getValidatorMembers} from 'store/actions/action-creaters/validators';
import { toWei, fromWei } from 'func/balance';

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
      const resL = fromWei(res);
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
      const amount = fromWei(res.amount);
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
      const resL = fromWei(res);
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

    this.validators.commitCollateral(this.address, toWei(amount)).then(() => {
      this.setValidatorExist(valExSetter);
      this.setAccountableTotalStake(accTotStSet);
      this.setValidatorsList(valListSet);
      this.setAccountBalance(accBalSet);
      this.dispatch(getValidatorMembers())
    }).catch((e) => {
      this.alert.error(e.message);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async announce(amount, accountableTotalStakeSetter, annToWithdrawSetter, annToWithdrawEndTimeSetter) {
    this.dispatch(setTransactionCounter(1));

    this.validators.announceWithdrawal(toWei(amount), this.address).then(() => {
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

    this.validators.withdraw(toWei(amount), this.address).then(() => {
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
