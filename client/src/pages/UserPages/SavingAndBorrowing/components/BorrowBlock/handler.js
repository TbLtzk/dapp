import { web3 } from 'contracts/config/drizzle-config';
import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';

import { GovernedEpdrQbtcAddress, GovernedEpdrQethAddress, StableCoinQUSD } from 'contracts/src/StableCoin';
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';

import { uintPerSecondToPerYearNumber } from 'func/useful';
import { fromBtcBlockchain, toBtcBlockchain, toWei, fromWei } from 'func/balance';
import { maxApproveAmount } from 'func/numbers';

export default class Handler {
  constructor(address, collateralKey, dispatch, vaultId) {
    this.address = address;
    this.borrowingContract = new BorrowingCoreQUSD();
    this.dispatch = dispatch;
    this.vaultId = String(vaultId);

    if (collateralKey === 'QETH') {
      //collateral contract
      this.stableCoinContract = new GovernedEpdrQethAddress();
    } else if (collateralKey === 'QBTC') {
      //collateral contract
      this.stableCoinContract = new GovernedEpdrQbtcAddress();
    }

    this.stableCoinUSDContract = new StableCoinQUSD();
  }

  async setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf) {
    setLoadingInf(true);
    let availableDeposit = await this.setAvailableToDeposit();
    let availableRepay = await this.setAvailableToRepay();
    this.borrowingContract.getVaultStats(this.address, this.vaultId)
      .then((res) => {
        const colAssets = res?.colStats?.key;
        let lockedCol = res?.colStats?.balance;

        if (lockedCol) {
          if (colAssets === 'QETH') {
            lockedCol = fromWei(lockedCol);
          } else if (colAssets === 'QBTC') {
            lockedCol = fromBtcBlockchain(lockedCol);
          } else {
            lockedCol = 0;
          }
        } else {
          lockedCol = 0;
        }
        const colPrice = res?.colStats?.price ? fromWei(res.colStats.price) : 0;

        const borOutstandingDebt = res?.stcStats?.outstandingDebt ? fromWei(res.stcStats.outstandingDebt) : 0;
        const borrowingLimit = res?.stcStats?.borrowingLimit ? fromWei(res.stcStats.borrowingLimit) : 0;

        const availableWithdraw = colPrice !== 0 ? (borrowingLimit - borOutstandingDebt) / colPrice : 0;

        availableDeposit = !availableDeposit ? 0 : fromBtcBlockchain(availableDeposit);

        const collateralDetails = {
          assets: colAssets,
          lockedCol: lockedCol,
          assetPrice: colPrice,
          availableWithdraw: availableWithdraw,
          availableDeposit: availableDeposit,
          liquidationPrice: res?.colStats?.liquidationPrice ? fromWei(res.colStats.liquidationPrice) : 0,
        };

        const borCollateralValue = lockedCol * colPrice;
        const availableBorrow = borrowingLimit - borOutstandingDebt;
        availableRepay = !availableRepay ? 0 : fromWei(availableRepay);

        const borrowingDetails = {
          assets: res?.stcStats?.key,
          collateralValue: borCollateralValue,
          borrowingLimit: borrowingLimit,
          availableBorrow: availableBorrow,
          availableRepay: availableRepay,
          outstandingDebt: borOutstandingDebt,
          liquidationLimit: res?.stcStats?.liquidationLimit ? fromWei(res.stcStats.liquidationLimit) : 0,
          borrowingFee: res?.stcStats?.borrowingFee ? uintPerSecondToPerYearNumber(res.stcStats.borrowingFee) : 0,
        };

        setCollateralInf(collateralDetails);
        setBorrowingInf(borrowingDetails);
        setLoadingInf(false);
      })
      .catch((e) => {
        setCollateralInf({});
        setBorrowingInf({});
        setLoadingInf(false);
        console.log(e);
      })
      .finally(() => {
      });
  }

  async setAvailableToDeposit() {
    return await this.stableCoinContract?.balanceOf(this.address);
  }

  async addDeposit(amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    this.borrowingContract.depositCol(this.address, vaultNum, amountL)
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async withdraw(amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionCounter(1));

    const amountL = new web3.utils.BN(toBtcBlockchain(amount));
    this.borrowingContract.withdrawCol(this.address, vaultNum, amountL)
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async borrow(amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionCounter(1));

    this.borrowingContract.generateStc(this.address, vaultNum,
      toWei(amount)
    )
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async repay(amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionCounter(1));
    const valueAmount = toWei(amount);
    this.borrowingContract.payBackSTC(this.address, vaultNum, valueAmount)
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.dispatch(setTransactionCounter(-1));
      });
  }

  async approve(contract) {
    await contract.approve(this.borrowingContract.address, maxApproveAmount, this.address);
  }

  async approveSwitcher(type) {
    if (type === 'deposit') {
      await this.approve(this.stableCoinContract);
    } else if (type === 'repay') {
      await this.approve(this.stableCoinUSDContract);
    }
  }

  allowance(contract, stateSetter) {
    contract.allowance(this.address, this.borrowingContract.address)
      .then((res) => {
        stateSetter(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  allowanceSwitcher(stateSetter, type) {
    if (type === 'deposit') {
      this.allowance(this.stableCoinContract, stateSetter);
    } else if (type === 'repay') {
      this.allowance(this.stableCoinUSDContract, stateSetter);
    }
  }

  async setAvailableToRepay() {
    return await this.stableCoinUSDContract.balanceOf(this.address);
  }
}
