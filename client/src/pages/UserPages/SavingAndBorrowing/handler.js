import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import {SavingQUSD} from 'contracts/src/Saving';

import {fromWei} from 'func/balance';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

export default class Handler {
  constructor(address) {
    this.address = address;
    this.contractBorrowingCoreQUSD = new BorrowingCoreQUSD(contractsToAddresses['BorrowingCoreQUSD']);
    this.contractSavingQUSD = new SavingQUSD(contractsToAddresses['SavingQUSD']);
  }

  setOutstandingDebt(stateSetter, setLoading) {
    setLoading(true);
    //TODO: change this.address argument
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
        const balance = vaultInfo?.colStats?.balance ? (vaultInfo.colStats.balance / 10 ** 8) : 0;
        const price = vaultInfo?.colStats?.price ? fromWei(vaultInfo.colStats.price) : 0;
        const collLock = balance * price;
        vaultsLoc.push(collLock);
      }
      if (vaultsLoc.length > 0) {
        const totalValue = vaultsLoc.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
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
