import { Vault } from '@q-dev/q-js-sdk';
import { Asset, BorrowAssetsRateAndFee, VaultWithFee } from 'typings/defi';

import { setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/actions';

import {
  getBorrowingCoreInstance,
  getBorrowingInstance,
  getCompoundRateBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getEpdrParametersInstance,
  getSavingInstance,
} from 'contracts/contract-instance';

import { TRANSACTION_TYPES } from 'constants/statuses';
import { unixToDate } from 'utils/date';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';
import { calculateInterestRate } from 'utils/numbers';

export async function getVaultWithFee (vault: Vault, vaultNum: number): Promise<VaultWithFee> {
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
  const borrowingFee = calculateInterestRate(Number(interestRate));
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

export async function getTimeSinceRefreshBalance (setTimeSinceRefreshBalance: any) {
  try {
    const contract = await getCompoundRateKeeperSavingInstance();
    const lastUpdate = await contract.getLastUpdate();
    setTimeSinceRefreshBalance(unixToDate(lastUpdate));
  } catch (error) {
    captureError(error);
  }
}

export async function refreshTimeSinceRefreshBalance (
  setTimeSinceRefreshBalance: any,
  setLoading: any,
  userAddress: any,
  dispatch: any,
  label: string
) {
  try {
    setLoading(true);
    const contract = await getSavingInstance();
    const transaction = await contract.updateCompoundRate({ from: userAddress, gasBuffer: 1.2 });
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance);
    dispatch(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    dispatch(setTransactionLoadingError(getErrorMessage(error)));
  } finally {
    setLoading(false);
  }
}

// eslint-disable-next-line max-len
export async function getTimeSinceOutstandingDebt (setTimeSinceOutstandingDeb: any, asset: Asset) {
  try {
    const contract = await getCompoundRateBorrowingInstance(asset);
    const lastUpdate = await contract.getLastUpdate();
    setTimeSinceOutstandingDeb(unixToDate(lastUpdate));
  } catch (error) {
    captureError(error);
  }
}

export async function refreshTimeSinceOutstandingDebt (
  setTimeSinceRefreshBalance: any,
  setLoading: any,

  userAddress: any,
  dispatch: any,
  asset: Asset,
  label: string
) {
  try {
    setLoading(true);
    const contract = await getBorrowingCoreInstance();
    const transaction = await contract.updateCompoundRate(asset, { from: userAddress, gasBuffer: 1.2 });
    getTimeSinceOutstandingDebt(setTimeSinceRefreshBalance, asset);
    dispatch(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    dispatch(setTransactionLoadingError(getErrorMessage(error)));
  } finally {
    setLoading(false);
  }
}
