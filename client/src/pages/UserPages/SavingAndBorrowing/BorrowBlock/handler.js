import { roundNumber, uintPercentToNumber } from 'func/useful';
import { GovernedEpdrQbtcQusdOracle, GovernedEpdrQethQusdOracle } from '../../../../contracts/FxPriceFeed';
import { GovernedEpdrQbtcAddress, GovernedEpdrQethAddress } from '../../../../contracts/StableCoin';
import { web3 } from '../../../../contracts/config/drizzle-config';
import EPDRParameters from '../../../../contracts/EPDRParameters';
import { BorrowingCoreQUSD } from '../../../../contracts/BorrowingCore';
import { fromBtcBlockchain, toBtcBlockchain } from '../../../../func/balance';

export default class Handler {
  constructor(address, collateralKey) {
    this.address = address;
    this.contractEPDRParameters = new EPDRParameters();
    this.borrowingContract = new BorrowingCoreQUSD();

    if (collateralKey === 'QETH') {
      this.oracleContract = new GovernedEpdrQethQusdOracle();
    } else if (collateralKey === 'QBTC') {
      this.oracleContract = new GovernedEpdrQbtcQusdOracle();
    }

    if (collateralKey === 'QETH') {
      this.stableCoinContract = new GovernedEpdrQethAddress();
    } else if (collateralKey === 'QBTC') {
      this.stableCoinContract = new GovernedEpdrQbtcAddress();
    }
  }

  setExchangeRate(stateSetter) {
    this.oracleContract.exchangeRate().then((res) => {
      const resL = roundNumber(web3.utils.fromWei(new web3.utils.BN(res)), 4);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    });
  }

  setAvailableToDeposit(stateSetter) {
    this.stableCoinContract.balanceOf(this.address).then((res) => {
      console.log(res);
      const resL = res === undefined ? 0 : fromBtcBlockchain(res);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    });
  }

  setCollateralRatio(collateral, stateSetter) {
    const key = `governed.EPDR.${collateral}_QUSD_collateralizationRatio`;
    this.contractEPDRParameters.getUint(key).then((res) => {
      const resL = (uintPercentToNumber(res) / 100) + 1;
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    });
  }

  setLiquidationRatio(collateral, stateSetter) {
    const key = `governed.EPDR.${collateral}_QUSD_liquidationRatio`;
    this.contractEPDRParameters.getUint(key).then((res) => {
      const resL = (uintPercentToNumber(Number(res)) / 100) + 1;
      stateSetter(resL);
    }).catch((e) => { console.log(e); });
  }

  async addDeposit(amount, vaultNum) {
    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    const approve = await this.stableCoinContract.approve(this.borrowingContract.address, amountL, this.address);
    if (approve.status === true) {
      this.borrowingContract.depositCol(this.address, vaultNum, amountL).then((res) => {
        console.log(res);
      }).catch((e) => {
        // stateSetter(0);
        console.log(e);
      });
    }
  }

  async withdraw(amount, vaultNum) {
    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    this.borrowingContract.withdrawCol(this.address, vaultNum, amountL).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
  }

  async borrow(amount, vaultNum) {
    this.borrowingContract.generateStc(this.address, vaultNum, amount).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
  }

  async repay(amount, vaultNum) {
    this.borrowingContract.payBackSTC(this.address, vaultNum, amount).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
  }

  mint(amount) {
    this.stableCoinContract.mint(this.address, this.address, amount).then((res) => {
      console.log(res);
    });
    //
    // const key = `governed.EPDR.QBTC_address`;
    // this.contractEPDRParameters.getAddr(key).then((res) => {
    //   console.log(res);
    // })
  }
}
