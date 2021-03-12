import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';
import QPiggyBank from 'contracts/src/QPiggyBank';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

export class Handler {
  constructor(address, dispatch) {
    this.piggyBank = new QPiggyBank(contractsToAddresses['QPiggyBank']);
    this.dispatch = dispatch;
    this.address = address;
  }

  async delegateStake(delegateAddresses, stakes) {
    this.dispatch(setTransactionCounter(1));

    this.piggyBank.delegateStake(this.address, delegateAddresses, stakes).then(() => {
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }
}
