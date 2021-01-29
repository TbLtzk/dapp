import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { StableCoinQUSD } from 'contracts/StableCoin';
import EPDR_Parameters from 'contracts/EPDR_Parameters';
import { bn, fN, getPercentageFormat } from 'func/useful';

export default class Handler {
  constructor(drizzle) {
    this.drizzle = drizzle;
    this.StableCoin = new StableCoinQUSD();
    this.EPDR_ParametersContract = new EPDR_Parameters();
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
        console.log("QUSD_savingRate", val);
        const res = getPercentageFormat(val);
        stateSetter(res?.c);
      })
      .catch(e => {
        stateSetter(0);
      });
  }

  getInterestRate(stateSetter) {
    this.EPDR_ParametersContract.getUint('governed.EPDR.QBTC_QUSD_interestRate')
      .then(val => {
        console.log("QBTC_QUSD_interestRate", val);
        const res = getPercentageFormat(val);
        stateSetter(res?.c);
      })
      .catch(e => {
        stateSetter(0);
      });
  }
}
