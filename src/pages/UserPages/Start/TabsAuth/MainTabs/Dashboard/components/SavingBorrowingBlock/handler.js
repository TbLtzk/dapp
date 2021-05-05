import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { StableCoinQUSD } from 'contracts/src/StableCoin';
import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters';
import CompoundRateKeeper from 'contracts/src/CompoundRateKeeper';
import { SavingQUSD } from 'contracts/src/Saving';
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { BN, fN, uintPerSecondToPerYearNumber } from 'func/useful';
import { remainDateTimeSince } from 'func/convertDate';
import SystemBalance from 'contracts/src/SystemBalance';

export default class Handler {
  constructor(userAddress) {
    this.userAddress = userAddress;
    this.StableCoin = new StableCoinQUSD();
    this.SavingQUSD = new SavingQUSD(contractsToAddresses['SavingQUSD']);
    this.BorrowingCoreQUSD = new BorrowingCoreQUSD(contractsToAddresses['BorrowingCoreQUSD']);
    this.EPDR_ParametersContract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
    this.CompoundRateKeeperBorrowing = new CompoundRateKeeper('CompoundRateKeeperBorrowing');
    this.CompoundRateKeeperSaving = new CompoundRateKeeper('CompoundRateKeeperSaving');
    this.SystemBalance = new SystemBalance();
  }

  getTotalSupply(stateSetter) {
    this.StableCoin.totalSupply()
      .then(val => {
        const transf = fN(BN(val)
          .toFixed());
        stateSetter(transf);
      })
      .catch(e => {
        stateSetter(0);
      });
  }

  getSystemBalance(stateSetter) {
    this.SystemBalance.getBalance()
      .then(val => {
        const transf = fN(BN(val)
          .toFixed());
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
    this.SavingQUSD.updateCompoundRate(this.userAddress)
      .then(
        res => {
          this.getTimeSinceRefreshBalance(stateSetter, stateSetterUnixTimestamp);
          stateLoading(false);
        }
      )
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
    this.BorrowingCoreQUSD.updateCompoundRate(this.userAddress, 'QBTC')
      .then(
        res => {
          this.getTimeSinceOutstandingDebt(stateSetter, stateSetterUnixTimestamp);
          stateLoading(false);
        }
      )
      .catch(e => {
        console.log('refreshTimeSinceOutstandingDebt.Error', e);
        stateSetter(0);
        stateLoading(false);
      });
  }
}
