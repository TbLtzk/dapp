import { roundNumber } from 'func/useful';
import { StableCoinQUSD } from '../../../../contracts/StableCoin';
import { web3 } from '../../../../contracts/config/drizzle-config';
import { SavingQUSD } from '../../../../contracts/Saving';
import { setTransactionCounter } from '../../../../store/actions/action-creaters/transaction-handler';

export default class Handler {
  constructor(address, dispatch) {
    this.address = address;
    this.contractSavingQUSD = new SavingQUSD();
    this.contractStableCoinQUSD = new StableCoinQUSD();
    this.dispatch = dispatch;
  }

  setSavingBalance(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.usersSavings(this.address).then((res) => {
      const resL = roundNumber(web3.utils.fromWei(res.balance), 4);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setAvailableToDeposit(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractStableCoinQUSD.balanceOf(this.address).then((res) => {
      const resL = roundNumber(web3.utils.fromWei(new web3.utils.BN(res)), 4);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async deposit(amount, setterSavBal, setAvDep) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(web3.utils.toWei(amount));
    const approve = await this.contractStableCoinQUSD.approve(this.contractSavingQUSD.address, amountL, this.address);
    if (approve.status === true) {
      this.contractSavingQUSD.deposit(this.address, amount).then(() => {
        this.setSavingBalance(setterSavBal);
        this.setAvailableToDeposit(setAvDep);
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
    }
  }

  async withdraw(amount, setterSavBal, setAvDep) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.withdraw(this.address, amount).then(() => {
      this.setSavingBalance(setterSavBal);
      this.setAvailableToDeposit(setAvDep);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  mint(amount, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractStableCoinQUSD.mint(this.address, this.address, amount).then(() => {
      this.setAvailableToDeposit(stateSetter);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async claim() {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.claim(this.address).then(() => {
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }
}
