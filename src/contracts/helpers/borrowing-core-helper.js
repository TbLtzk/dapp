
import { setTransactionLoadingError } from 'store/transaction-handler/action-creators';

import {
  getBorrowingCoreInstance,
  getCompoundRateKeeperBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getGovernedEpdrQbtcAddressInstance,
  getSavingInstance,
  getStableCoinInstance
} from 'contracts/contract-instance';

import { fromWei } from 'func/balance';
import { remainDateTimeSince } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';
import { BN, uintPerSecondToPerYearNumber } from 'func/useful';

async function addToken (contract, address) {
  try {
    const [decimals, symbol] = await Promise.all([
      contract.methods.decimals().call(),
      contract.methods.symbol().call()
    ]);

    const response = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals
        }
      }
    });
    return response;
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return null;
  }
}

export async function addQBTCToken (setQbtcToken) {
  const contract = await getGovernedEpdrQbtcAddressInstance();
  addToken(contract, contract._address);
  localStorage.setItem('qbtcTokenAdded', '0');
  setQbtcToken('0');
}

export async function addQUSDToken (setQusdToken) {
  const contract = await getStableCoinInstance();
  addToken(contract.instance, contract.address);
  localStorage.setItem('qusdTokenAdded', '0');
  setQusdToken('0');
}

export function getOutstandingDebtHelper (vaultsStats) {
  const amount = vaultsStats.reduce((sum, item) => sum.plus(BN(item?.stcStats?.outstandingDebt)), BN(0));
  return fromWei(amount.toFixed());
}

export function getTotalCollateralLockedHelper (vaultsStats) {
  if (!vaultsStats.length) {
    return '0';
  } else {
    const vaultsLoc = vaultsStats.map((vaultInfo) => {
      const balance = vaultInfo?.colStats?.balance ? vaultInfo.colStats.balance / 10 ** 8 : 0;
      const price = vaultInfo?.colStats?.price ? fromWei(vaultInfo.colStats.price) : 0;
      const collLock = balance * price;
      return collLock;
    });
    if (vaultsLoc.length > 0) {
      const totalValue = vaultsLoc.reduce((acc, curr) => acc + curr);
      return totalValue.toString();
    } else {
      return '0';
    }
  }
}

export function getBalanceDetailsHelper (balanceDetails) {
  const rate = uintPerSecondToPerYearNumber(balanceDetails.interestRate);

  return [
    {
      depositAsset: 'QUSD',
      interestAsset: 'QUSD',
      rate
    }
  ];
}

export async function generateVaultData (contract, userAddress, vault, vaultNum) {
  const vaultStats = await contract.getVaultStats(userAddress, vaultNum);
  const borrowingFee = uintPerSecondToPerYearNumber(vaultStats.stcStats.borrowingFee);
  return { ...vault, vaultNum, borrowingFee };
}

export async function getTimeSinceRefreshBalance (setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance) {
  try {
    const contract = await getCompoundRateKeeperSavingInstance();
    const res = await contract.getLastUpdate();
    setTimeSinceUnixTimestampRefreshBalance(res);
    const transformTime = remainDateTimeSince(res);
    setTimeSinceRefreshBalance(transformTime);
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export async function refreshTimeSinceRefreshBalance (
  setTimeSinceRefreshBalance,
  setLoading,
  setTimeSinceUnixTimestampRefreshBalance,
  userAddress,
  dispatch
) {
  try {
    setLoading(true);
    const contract = await getSavingInstance();
    await contract.updateCompoundRate({ from: userAddress, gasBuffer: 1.2 });
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance);
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    dispatch(setTransactionLoadingError(errorMsg));
  } finally {
    setLoading(false);
  }
}

// eslint-disable-next-line max-len
export async function getTimeSinceOutstandingDebt (setTimeSinceOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb) {
  try {
    const contract = await getCompoundRateKeeperBorrowingInstance();
    const res = await contract.getLastUpdate();
    setTimeSinceUnixTimestampOutstandingDeb(res);
    const transformTime = remainDateTimeSince(res);
    setTimeSinceOutstandingDeb(transformTime);
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export async function refreshTimeSinceOutstandingDebt (
  setTimeSinceRefreshBalance,
  setLoading,
  setTimeSinceUnixTimestampRefreshBalance,
  userAddress,
  dispatch
) {
  try {
    setLoading(true);
    const contract = await getBorrowingCoreInstance();
    await contract.updateCompoundRate('QBTC', { from: userAddress, gasBuffer: 1.2 });
    getTimeSinceOutstandingDebt(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance);
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    dispatch(setTransactionLoadingError(errorMsg));
  } finally {
    setLoading(false);
  }
}
