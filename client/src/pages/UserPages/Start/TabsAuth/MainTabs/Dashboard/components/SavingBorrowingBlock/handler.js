import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { StableCoinQUSD } from 'contracts/StableCoin';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import { SavingQUSD } from 'contracts/src/Saving';
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { bn, fN, getPercentageFormat, uintPerSecondToPerYearNumber } from 'func/useful';
import {remainDateTimeSince} from "func/convertDate";

export default class Handler {
  constructor(drizzle) {
    this.drizzle = drizzle;
    this.StableCoin = new StableCoinQUSD();
    this.SavingQUSD = new SavingQUSD();
    this.BorrowingCoreQUSD = new BorrowingCoreQUSD();
    this.EPDR_ParametersContract = new EPDR_Parameters('EPDR_Parameters');
  }

  getTotalSupply(stateSetter) {
    this.StableCoin.totalSupply()
      .then(val => {
        const transf = fN(bn(val)
          .toString());
        stateSetter(transf);
      })
      .catch(e => {
        stateSetter(0);
      });
  }

  getSystemBalance(stateSetter) {
    this.StableCoin.balanceOf(contractsToAddresses.SystemBalance)
      .then(val => {
        const transf = fN(bn(this.drizzle.web3.utils.fromWei(val))
          .toString());
        stateSetter(transf);
      })
      .catch(e => {
        stateSetter(0);
      });
  }

  getSavingRate(stateSetter) {
    this.EPDR_ParametersContract.getUint('governed.EPDR.QUSD_savingRate')
      .then(val => {
        const res = uintPerSecondToPerYearNumber(val);
        stateSetter(fN(res));
      })
      .catch(e => {
        stateSetter(0);
      });
  }

  getInterestRate(stateSetter) {
    this.EPDR_ParametersContract.getUint('governed.EPDR.QBTC_QUSD_interestRate')
      .then(val => {
        const res = uintPerSecondToPerYearNumber(val);
        stateSetter(fN(res));
      })
      .catch(e => {
        stateSetter(0);
      });
  }

  getTimeSinceRefreshBalance(stateSetter, stateSetterUnixTimestamp) {
    this.SavingQUSD.getBalanceDetails()
      .then(res => {
        // console.log('getBalanceDetails', res);
        stateSetterUnixTimestamp(res?.lastUpdateOfCompoundRate);
        const transformTime = remainDateTimeSince(res?.lastUpdateOfCompoundRate);
        stateSetter(transformTime);
      })
      .catch(e => {
        stateSetter(0);
        stateSetterUnixTimestamp(0);
      });
  }

  refreshTimeSinceRefreshBalance(stateSetter, stateLoading, stateSetterUnixTimestamp) {
    stateLoading(true);
    this.SavingQUSD.updateCompoundRate(this.userAddress)
      .then(
        res => {
          this.getTimeSinceRefreshBalance(stateSetter, stateSetterUnixTimestamp);
          stateLoading(false);
        }
      )
      .catch(e => {
        console.log("refreshTimeSinceRefreshBalance.Error", e);
        stateSetter(0);
        stateLoading(false);
      });
  }

  getTimeSinceOutstandingDebt(stateSetter, stateSetterUnixTimestamp) {
    this.BorrowingCoreQUSD.compoundRateKeeper()
      .then(res => {
        console.log('compoundRateKeeper', res);
        // stateSetterUnixTimestamp(res?.lastUpdateOfCompoundRate);
        // const transformTime = remainDateTimeSince(res?.lastUpdateOfCompoundRate);
        // stateSetter(transformTime);
      })
      .catch(e => {
        console.log("getTimeSinceOutstandingDebt.Error", e)
        stateSetter(0);
        stateSetterUnixTimestamp(0);
      });
  }
}
