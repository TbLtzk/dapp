import {StableCoinQUSD} from 'contracts/StableCoin';
import {web3} from 'contracts/config/drizzle-config';
import {SavingQUSD} from 'contracts/Saving';
import {setTransactionCounter} from 'store/actions/action-creaters/transaction-handler';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import {maxApproveAmount} from 'func/numbers';
import {toWei, fromWei} from 'func/balance';

export default class Handler {
  constructor(address, dispatch) {
    this.address = address;
    this.contractSavingQUSD = new SavingQUSD();
    this.contractStableCoinQUSD = new StableCoinQUSD();
    this.contractEPDRParameters = new EPDR_Parameters("EPDR_Parameters");
    this.dispatch = dispatch;
  }

  setSavingBalanceAndLatestClaim(savingBalanceSetter, latestClaimSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.usersSavings(this.address).then((res) => {
      latestClaimSetter(res.latestClaim);
      const sbL = fromWei(res.balance);
      savingBalanceSetter(sbL);
    }).catch((e) => {
      savingBalanceSetter(0);
      latestClaimSetter(0);
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

  setSavingRate(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractEPDRParameters.getUint('governed.EPDR.QUSD_savingRate').then((res) => {
      stateSetter(res);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async deposit(amount, setterSavBal, setAvDep, setLatestClaim) {
    this.dispatch(setTransactionCounter(1));

    const amountL = toWei(amount);
    // const approve = await this.contractStableCoinQUSD.approve(this.contractSavingQUSD.address, amountL, this.address);
    // if (approve.status === true) {
    this.contractSavingQUSD.deposit(this.address, amount).then(() => {
      this.setSavingBalanceAndLatestClaim(setterSavBal, setLatestClaim);
      this.setAvailableToDeposit(setAvDep);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
    // }
  }

  async withdraw(amount, setterSavBal, setAvDep, setLatestClaim) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.withdraw(this.address, amount).then(() => {
      this.setSavingBalanceAndLatestClaim(setterSavBal, setLatestClaim);
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

  async claim(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractSavingQUSD.claim(this.address).then(() => {
      stateSetter('0');
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
