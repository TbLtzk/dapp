import { web3 } from 'contracts/config/drizzle-config';
import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';
import QPiggyBank from 'contracts/src/QPiggyBank';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { fromWei } from 'func/balance';

export default class PiggyBankHandler {
  constructor(address, dispatch, alert) {
    this.dispatch = dispatch;
    this.address = address;
    this.alert = alert;
    this.piggyBank = new QPiggyBank(contractsToAddresses['QVault']);
  }

  async setUserBalance(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.piggyBank.getUserBalance(this.address).then((res) => {
      const resL = fromWei(res);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
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
}
