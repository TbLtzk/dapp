import { uintPercentToNumber } from 'func/useful';
import { GovernedEpdrQbtcQusdOracle, GovernedEpdrQethQusdOracle } from '../../../../contracts/FxPriceFeed';
import { GovernedEpdrQbtcAddress, GovernedEpdrQethAddress } from '../../../../contracts/StableCoin';
import { web3 } from '../../../../contracts/config/drizzle-config';
import EPDR_Parameters from 'contracts/EPDR_Parameters';
import { BorrowingCoreQUSD } from '../../../../contracts/BorrowingCore';
import { fromBtcBlockchain, toBtcBlockchain } from '../../../../func/balance';
import { setTransactionCounter } from '../../../../store/actions/action-creaters/transaction-handler';

export default class Handler {
  constructor(address, collateralKey, dispatch) {
    this.address = address;
    this.contractEPDRParameters = new EPDR_Parameters();
    this.borrowingContract = new BorrowingCoreQUSD();
    this.dispatch = dispatch;

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

  setAvailableToDeposit(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.stableCoinContract.balanceOf(this.address).then((res) => {
      console.log(res);
      const resL = res === undefined ? 0 : fromBtcBlockchain(res);
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setCollateralRatio(collateral, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const key = `governed.EPDR.${collateral}_QUSD_collateralizationRatio`;
    this.contractEPDRParameters.getUint(key).then((res) => {
      const resL = uintPercentToNumber(res) + 1;
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setLiquidationRatio(collateral, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const key = `governed.EPDR.${collateral}_QUSD_liquidationRatio`;
    this.contractEPDRParameters.getUint(key).then((res) => {
      const resL = uintPercentToNumber(Number(res)) + 1;
      stateSetter(resL);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async addDeposit(amount, vaultNum, lockedCol, setLockedCol, setAvToDeposit) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    const approve = await this.stableCoinContract.approve(this.borrowingContract.address, amountL, this.address);
    if (approve.status === true) {
      this.borrowingContract.depositCol(this.address, vaultNum, amountL).then(() => {
        setLockedCol(Number(lockedCol) + Number(amount));
        this.setAvailableToDeposit(setAvToDeposit);
      }).catch((e) => {
        // stateSetter(0);
        console.log(e);
      }).finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
    }
  }

  async withdraw(amount, vaultNum, lockedCol, setLockedCol, setAvToDeposit) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    this.borrowingContract.withdrawCol(this.address, vaultNum, amountL).then(() => {
      setLockedCol(Number(lockedCol) + Number(amount));
      this.setAvailableToDeposit(setAvToDeposit);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async borrow(amount, vaultNum) {
    this.dispatch(setTransactionCounter(1));

    this.borrowingContract.generateStc(this.address, vaultNum, amount).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async repay(amount, vaultNum) {
    this.dispatch(setTransactionCounter(1));

    this.borrowingContract.payBackSTC(this.address, vaultNum, amount).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  mint(amount) {
    this.dispatch(setTransactionCounter(1));

    this.stableCoinContract.mint(this.address, this.address, amount).then((res) => {
      console.log(res);
    });
  }

  async approve(contractAddress, amountL) {
    const approve = await this.stableCoinContract.approve(contractAddress, amountL, this.address);
    console.log("approve", approve);
  }
}
