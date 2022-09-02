import { Vault } from '@q-dev/q-js-sdk';
import { Asset, BorrowAssetsRateAndFee, VaultWithFee } from 'typings/defi';

import {
  getBorrowingInstance,
  getCompoundRateBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getEpdrParametersInstance,
} from 'contracts/contract-instance';

import { unixToDate } from 'utils/date';
import { captureError } from 'utils/errors';
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
            address: instance.options.address,
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

export async function getSavingCompoundRateLastUpdate () {
  try {
    const contract = await getCompoundRateKeeperSavingInstance();
    const lastUpdate = await contract.getLastUpdate();
    return unixToDate(lastUpdate);
  } catch (error) {
    captureError(error);
    return null;
  }
}

export async function getBorrowingCompoundRateLastUpdate (asset: Asset) {
  try {
    const contract = await getCompoundRateBorrowingInstance(asset);
    const lastUpdate = await contract.getLastUpdate();
    return unixToDate(lastUpdate);
  } catch (error) {
    captureError(error);
    return null;
  }
}
