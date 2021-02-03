import { uintPercentToNumber, uintPerSecondToPerYearNumber } from 'func/useful';
import { GovernedEpdrQbtcQusdOracle, GovernedEpdrQethQusdOracle } from 'contracts/FxPriceFeed';
import { GovernedEpdrQbtcAddress, GovernedEpdrQethAddress, StableCoinQUSD } from 'contracts/StableCoin';
import { drizzleRegistry, web3 } from 'contracts/config/drizzle-config';
import EPDR_Parameters from 'contracts/EPDR_Parameters';
import { BorrowingCoreQUSD } from 'contracts/BorrowingCore';
import { fromBtcBlockchain, toBtcBlockchain, toWei, fromWei } from 'func/balance';
import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';
import { transformToPercentage } from 'contracts/handler/VotingHandler';

export const maxApproveAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export default class Handler {
  constructor(address, collateralKey, dispatch) {
    this.address = address;
    this.contractEPDRParameters = new EPDR_Parameters();
    this.borrowingContract = new BorrowingCoreQUSD();
    this.dispatch = dispatch;
    const contractEPDR = new EPDR_Parameters();

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
    this.stableCoinUSDContract = new StableCoinQUSD();
  }

  setAvailableToDeposit(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.stableCoinContract.balanceOf(this.address)
      .then((res) => {
        console.log(res);
        const resL = res === undefined ? 0 : fromBtcBlockchain(res);
        stateSetter(resL);
      })
      .catch((e) => {
        stateSetter(0);
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  setCollateralRatio(collateral, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const key = `governed.EPDR.${collateral}_QUSD_collateralizationRatio`;
    this.contractEPDRParameters.getUint(key)
      .then((res) => {
        const resL = transformToPercentage(res) / 100;
        // const resL = uintPercentToNumber(res) + 1;
        stateSetter(resL);
      })
      .catch((e) => {
        stateSetter(0);
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  setLiquidationRatio(collateral, stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const key = `governed.EPDR.${collateral}_QUSD_liquidationRatio`;
    this.contractEPDRParameters.getUint(key)
      .then((res) => {
        const resL = uintPercentToNumber(Number(res)) + 1;
        stateSetter(resL);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async addDeposit(amount, vaultNum, lockedCol, setLockedCol, setAvToDeposit, actCardDataInf, setActCardDataInf) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    // const approve = await this.stableCoinContract.approve(this.borrowingContract.address, amountL, this.address);
    // if (approve.status === true) {
    this.borrowingContract.depositCol(this.address, vaultNum, amountL)
      .then(() => {
        setLockedCol(Number(lockedCol) + Number(amount));
        this.setAvailableToDeposit(setAvToDeposit);
        this.updateDataInf(actCardDataInf, setActCardDataInf);
      })
      .catch((e) => {
        // stateSetter(0);
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
    // }
  }

  async withdraw(amount, vaultNum, lockedCol, setLockedCol, setAvToDeposit, actCardDataInf, setActCardDataInf) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    this.borrowingContract.withdrawCol(this.address, vaultNum, amountL)
      .then(() => {
        setLockedCol(Number(lockedCol) + Number(amount));
        this.setAvailableToDeposit(setAvToDeposit);
        this.updateDataInf(actCardDataInf, setActCardDataInf);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async borrow(amount, vaultNum, actCardDataInf, setActCardDataInf) {
    this.dispatch(setTransactionCounter(1));

    this.borrowingContract.generateStc(this.address, vaultNum,
      drizzleRegistry.web3.utils.toWei(amount, 'ether')
    )
      .then((res) => {
        this.updateDataInf(actCardDataInf, setActCardDataInf);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async repay(amount, vaultNum, actCardDataInf, setActCardDataInf) {
    this.dispatch(setTransactionCounter(1));
    const valueAmount = toWei(amount);
    console.log('valueAmount', amount);
    console.log('valueAmount', valueAmount);
    this.borrowingContract.payBackSTC(this.address, vaultNum, valueAmount)
      .then((res) => {
        this.updateDataInf(actCardDataInf, setActCardDataInf);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  mint(amount) {
    this.dispatch(setTransactionCounter(1));

    this.stableCoinContract.mint(this.address, this.address, amount)
      .then((res) => {
        console.log(res);
      });
  }

  async approve() {
    const approve = await this.stableCoinContract.approve(this.borrowingContract.address, maxApproveAmount, this.address);
    // const approve = await this.stableCoinContract.approve(this.borrowingContract.address, 0, this.address);
    console.log('approve', approve);
  }

  allowance(stateSetter) {
    // const allowance = await this.stableCoinContract.allowance(this.address, this.borrowingContract.address);
    // console.log('allowance', allowance);
    this.stableCoinContract.allowance(this.address, this.borrowingContract.address)
      .then((res) => {
        console.log('allowance', res);
        stateSetter(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setAvailableToRepay(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.stableCoinUSDContract.balanceOf(this.address)
      .then((res) => {
        stateSetter(fromWei(res));
      })
      .catch((e) => {
        stateSetter(0);
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async updateDataInf(actCardDataInf, newStateSetter) {
    if (actCardDataInf?.type === 'borrow') {
      let newVaultInf = {};
      const vaultInfo = await this.borrowingContract.userVaults(this.address, actCardDataInf?.vault?.vaultNum)
        .catch(() => {
        });
      let fee = await this.contractEPDRParameters.getUint(`governed.EPDR.${vaultInfo.colKey}_QUSD_interestRate`)
        .catch(() => {
        });
      fee = uintPerSecondToPerYearNumber(fee);
      vaultInfo.borrowingFee = fee;
      vaultInfo.vaultNum = actCardDataInf?.vault?.vaultNum;
      console.log('vaultInfo', vaultInfo);
      newVaultInf = {
        borrow: actCardDataInf?.borrow,
        collateral: actCardDataInf?.collateral,
        type: actCardDataInf?.type,
        vault: vaultInfo
      };
      newStateSetter(newVaultInf);
    }
  };
}
