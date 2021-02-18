import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { StableCoinQUSD } from 'contracts/StableCoin';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import CompoundRateKeeper from 'contracts/src/CompoundRateKeeper';
import { SavingQUSD } from 'contracts/src/Saving';
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { bn, fN, getPercentageFormat, uintPerSecondToPerYearNumber } from 'func/useful';
import { remainDateTimeSince } from 'func/convertDate';

export default class Handler {
  constructor(drizzle, userAddress) {
    this.drizzle = drizzle;
    this.userAddress = userAddress;
    this.StableCoin = new StableCoinQUSD();
    this.SavingQUSD = new SavingQUSD();
    this.BorrowingCoreQUSD = new BorrowingCoreQUSD();
    this.EPDR_ParametersContract = new EPDR_Parameters();
    this.CompoundRateKeeperBorrowing = new CompoundRateKeeper('CompoundRateKeeperBorrowing');
    this.CompoundRateKeeperSaving = new CompoundRateKeeper('CompoundRateKeeperSaving');
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
    // this.SavingQUSD.compoundRateKeeper()
    // this.SavingQUSD.getBalanceDetails()
    this.CompoundRateKeeperSaving.getLastUpdate()
      .then(res => {
        // console.log('getBalanceDetails', res);
        stateSetterUnixTimestamp(res);
        const transformTime = remainDateTimeSince(res);
        stateSetter(transformTime);
      })
      .catch(e => {
        stateSetter(0);
        stateSetterUnixTimestamp(0);
      });
  }

  refreshTimeSinceRefreshBalance(stateSetter, stateLoading, stateSetterUnixTimestamp) {
    stateLoading(true);
    // this.SavingQUSD.updateCompoundRate(this.userAddress)
    //   .then(
    //     res => {
    //       this.getTimeSinceRefreshBalance(stateSetter, stateSetterUnixTimestamp);
    //       stateLoading(false);
    //     }
    //   )
    //   .catch(e => {
    //     console.log('refreshTimeSinceRefreshBalance.Error', e);
    //     stateSetter(0);
    //     stateLoading(false);
    //   });
    this.CompoundRateKeeperSaving.getCurrentRate()
      .then(res => {
        console.log("getCurrentRate", res);
        this.CompoundRateKeeperSaving.update(this.userAddress, res)
          .then(res => {
              console.log("update", res);
              this.getTimeSinceOutstandingDebt(stateSetter, stateSetterUnixTimestamp);
              stateLoading(false);
            }
          )
          .catch(e => {
            console.log("refreshTimeSinceRefreshBalance.Error", e);
            stateSetter(0);
            stateLoading(false);
          });
      })
      .catch(e => {
        console.log('refreshTimeSinceRefreshBalance.Error', e);
        stateSetter(0);
        stateLoading(false);
      });
  }

  getTimeSinceOutstandingDebt(stateSetter, stateSetterUnixTimestamp) {
    this.CompoundRateKeeperBorrowing.getLastUpdate()
      // this.BorrowingCoreQUSD.compoundRateKeeper("QBTC")
      .then(res => {
        console.log('compoundRateKeeper.getLastUpdate', res);
        stateSetterUnixTimestamp(res);
        const transformTime = remainDateTimeSince(res);
        stateSetter(transformTime);
      })
      .catch(e => {
        console.log('getTimeSinceOutstandingDebt.Error', e);
        stateSetter(0);
      });
  }

  refreshTimeSinceOutstandingDebt(stateSetter, stateLoading, stateSetterUnixTimestamp) {
    stateLoading(true);
    this.CompoundRateKeeperBorrowing.getCurrentRate()
      .then(res => {
        console.log("getCurrentRate", res);
        this.CompoundRateKeeperBorrowing.update(this.userAddress, res)
          .then(res => {
              console.log("update", res);
              this.getTimeSinceOutstandingDebt(stateSetter, stateSetterUnixTimestamp);
              stateLoading(false);
            }
          )
          .catch(e => {
            console.log("refreshTimeSinceOutstandingDebt.Error", e);
            stateSetter(0);
            stateLoading(false);
          });
      })
      .catch(e => {
        console.log('refreshTimeSinceOutstandingDebt.Error', e);
        stateSetter(0);
        stateLoading(false);
      });
    // this.BorrowingCoreQUSD.updateCompoundRate(this.userAddress, 'QBTC')
    //   .then(
    //     res => {
    //       this.getTimeSinceOutstandingDebt(stateSetter, stateSetterUnixTimestamp);
    //       stateLoading(false);
    //     }
    //   )
    //   .catch(e => {
    //     console.log("refreshTimeSinceOutstandingDebt.Error", e);
    //     stateSetter(0);
    //     stateLoading(false);
    //   });
  }
}
