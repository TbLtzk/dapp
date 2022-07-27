import { Vault } from '@q-dev/q-js-sdk';
import { Asset, BorrowAssetsRateAndFee, VaultWithFee } from 'typings/defi';

import { setTransactionLoadingError } from 'store/transaction-handler/action-creators';

import {
  getBorrowingCoreInstance,
  getBorrowingInstance,
  getCompoundRateBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getEpdrParametersInstance,
  getSavingInstance,
} from 'contracts/contract-instance';

import { remainDateTimeSince } from 'func/convertDate';
import { captureError, getErrorMessage } from 'func/errors';
import { uintPerSecondToPerYearNumber } from 'func/useful';

export async function getVaultWithFee (vault: Vault, vaultNum: number | string): Promise<VaultWithFee> {
  const { borrowingFee } = await getBorrowAssetRateAndFee(vault.colKey as Asset);
  return {
    ...vault,
    vaultNum,
    borrowingFee,
  };
}
export async function getBorrowAssetRateAndFee (asset: Asset): Promise<BorrowAssetsRateAndFee> {
  const contract = await getEpdrParametersInstance();

  const interestRate = await contract.getUint(`governed.EPDR.${asset}_QUSD_interestRate`);
  const borrowingFee = uintPerSecondToPerYearNumber(interestRate) || 0;
  return { asset, borrowingFee, interestRate };
}

export async function addBorrowTokenToWallet (asset: Asset) {
  try {
    const instance = await getBorrowingInstance(asset);
    const [decimals, symbol] = await Promise.all([
      instance.methods.decimals().call(),
      instance.methods.symbol().call(),
    ]);
    const type = 'ERC20';
    if ('ethereum' in window && window?.ethereum) {
      const response = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type,
          options: {
            address: instance._address,
            symbol,
            decimals,
          },
        },
      });
      return response;
    }
  } catch (error) {
    captureError(error);
    return null;
  }
}

export async function getTimeSinceRefreshBalance (
  setTimeSinceRefreshBalance: any,
  setTimeSinceUnixTimestampRefreshBalance: any
) {
  try {
    const contract = await getCompoundRateKeeperSavingInstance();
    const res = await contract.getLastUpdate();
    setTimeSinceUnixTimestampRefreshBalance(res);
    const transformTime = remainDateTimeSince(res);
    setTimeSinceRefreshBalance(transformTime);
  } catch (error) {
    captureError(error);
  }
}

export async function refreshTimeSinceRefreshBalance (
  setTimeSinceRefreshBalance: any,
  setLoading: any,
  setTimeSinceUnixTimestampRefreshBalance: any,
  userAddress: any,
  dispatch: any
) {
  try {
    setLoading(true);
    const contract = await getSavingInstance();
    await contract.updateCompoundRate({ from: userAddress, gasBuffer: 1.2 });
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance);
  } catch (error) {
    captureError(error);
    dispatch(setTransactionLoadingError(getErrorMessage(error)));
  } finally {
    setLoading(false);
  }
}

// eslint-disable-next-line max-len
export async function getTimeSinceOutstandingDebt (
  setTimeSinceOutstandingDeb: any,
  setTimeSinceUnixTimestampOutstandingDeb: any,
  asset: any
) {
  try {
    const contract = await getCompoundRateBorrowingInstance(asset);
    const res = await contract.getLastUpdate();
    setTimeSinceUnixTimestampOutstandingDeb(res);
    const transformTime = remainDateTimeSince(res);
    setTimeSinceOutstandingDeb(transformTime);
  } catch (error) {
    captureError(error);
  }
}

export async function refreshTimeSinceOutstandingDebt (
  setTimeSinceRefreshBalance: any,
  setLoading: any,
  setTimeSinceUnixTimestampRefreshBalance: any,
  userAddress: any,
  dispatch: any,
  asset: any
) {
  try {
    setLoading(true);
    const contract = await getBorrowingCoreInstance();
    await contract.updateCompoundRate(asset, { from: userAddress, gasBuffer: 1.2 });
    getTimeSinceOutstandingDebt(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance, asset);
  } catch (error) {
    captureError(error);
    dispatch(setTransactionLoadingError(getErrorMessage(error)));
  } finally {
    setLoading(false);
  }
}
