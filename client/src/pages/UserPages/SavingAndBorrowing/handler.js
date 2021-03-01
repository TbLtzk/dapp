import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { SavingQUSD } from 'contracts/src/Saving';

import { fromWei } from 'func/balance';

export default class Handler {
  constructor(address) {
    this.address = address;
    this.contractBorrowingCoreQUSD = new BorrowingCoreQUSD();
    this.contractSavingQUSD = new SavingQUSD();
  }

  setOutstandingDebt(stateSetter, setLoading) {
    setLoading(true);
    this.contractBorrowingCoreQUSD.totalStcBackedByCol(this.address)
      .then((res) => {
        stateSetter(fromWei(res));
        setLoading(false);
      })
      .catch((e) => {
        stateSetter(0);
        setLoading(false);
        console.log(e);
      })
      .finally(() => {
      });
  }

  setTotalSavingBalance(stateSetter, setLoading) {
    setLoading(true);
    this.contractSavingQUSD.getBalance(this.address)
      .then((res) => {
        stateSetter(fromWei(res));
        setLoading(false);
      })
      .catch((e) => {
        stateSetter(0);
        setLoading(false);
        console.log(e);
      })
      .finally(() => {
      });
  }

  async setTotalCollateralLocked(stateSetter, setLoading) {
    setLoading(true);
    const vaultsCount = await this.contractBorrowingCoreQUSD.userVaultsCount(this.address)
      .catch(() => {
      });
    const vaultsLoc = [];
    if (vaultsCount > 0) {
      for (let i = 0; i < vaultsCount; i += 1) {
        const vaultInfo = await this.contractBorrowingCoreQUSD.getVaultStats(this.address, i)
          .catch(() => {
          });
        const balance = vaultInfo?.colStats?.balance ? fromWei(vaultInfo.colStats.balance) : 0;
        const price = vaultInfo?.colStats?.price ? fromWei(vaultInfo.colStats.price) : 0;
        const collLock = balance * price;
        vaultsLoc.push(collLock);
      }
      if (vaultsLoc.length > 0) {
        const totalValue = vaultsLoc.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
        console.log('setTotalCollateralLocked', totalValue);
        stateSetter(totalValue);
        setLoading(false);
      } else {
        stateSetter(0);
        setLoading(false);
      }
    } else {
      stateSetter(0);
      setLoading(false);
    }
  }
}
