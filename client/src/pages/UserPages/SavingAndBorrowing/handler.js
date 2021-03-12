import { web3 } from 'contracts/config/drizzle-config';
import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler';
import { StableCoinQUSD } from '../../../contracts/src/StableCoin';
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { GovernedEpdrQbtcQusdOracle, GovernedEpdrQethQusdOracle } from '../../../contracts/src/FxPriceFeed';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

export default class Handler {
  constructor(address, dispatch) {
    this.address = address;
    this.dispatch = dispatch;
    this.contractStableCoinQUSD = new StableCoinQUSD();
    this.contractBorrowingCoreQUSD = new BorrowingCoreQUSD(contractsToAddresses['BorrowingCoreQUSD']);
  }

  setAvailableToDeposit(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    this.contractStableCoinQUSD.balanceOf(this.address).then((res) => {
      const resL = web3.utils.fromWei(new web3.utils.BN(res));
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  setExchangeRate(collateral, stateSetter) {
    this.dispatch(setTransactionCounter(1));
    console.log("collateral", collateral);
    let oracleContract;
    if (collateral === 'QETH') {
      oracleContract = new GovernedEpdrQethQusdOracle();
    } else if (collateral === 'QBTC') {
      oracleContract = new GovernedEpdrQbtcQusdOracle();
    }

    oracleContract.exchangeRate().then((res) => {
      const resL = web3.utils.fromWei(new web3.utils.BN(res));
      stateSetter(resL);
    }).catch((e) => {
      stateSetter(0);
      console.log(e);
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1));
    });
  }

  async setVaults(stateSetter) {
    this.dispatch(setTransactionCounter(1));

    const vaultsCount = await this.contractBorrowingCoreQUSD.userVaultsCount(this.address).catch(() => {});

    const vaultsLoc = [];
    for (let i = 0; i < vaultsCount; i += 1) {
      const vaultInfo = await this.contractBorrowingCoreQUSD.userVaults(this.address, i).catch(() => {});
      vaultsLoc.push(vaultInfo);
    }
    stateSetter(vaultsLoc);
    this.dispatch(setTransactionCounter(-1));
  }

//   // Get vault count for address
//   useEffect(async () => {
//   dispatch(setTransactionCounter(1));
//   const data = await contract.userVaultsCount(address).catch(() => {});
//   setVaultsCount(data);
//   dispatch(setTransactionCounter(-1));
// }, []);
//
// // Get vaults for address by count
// useEffect(async () => {
//   dispatch(setTransactionCounter(1));
//
//   const contractEPDR = new EPDR_Parameters();
//   const vaultsLoc = [];
//   for (let i = 0; i < vaultsCount; i += 1) {
//     const vaultInfo = await contract.userVaults(address, i).catch(() => {});
//     let fee = await contractEPDR.getUint(`governed.EPDR.${vaultInfo.colKey}_QUSD_interestRate`).catch(() => {});
//     fee = uintPerSecondToPerYearNumber(fee);
//     vaultInfo.borrowingFee = fee;
//     vaultInfo.vaultNum = i;
//     vaultsLoc.push(vaultInfo);
//   }
//   setVaults(vaultsLoc);
//   dispatch(setTransactionCounter(-1));
// }, [vaultsCount]);
}
