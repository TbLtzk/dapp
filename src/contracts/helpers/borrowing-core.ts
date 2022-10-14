import { calculateInterestRate } from '@q-dev/utils';
import { Asset, BorrowAssetsRateAndFee } from 'typings/defi';

import {
  getBorrowingInstance,
  getCompoundRateBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getEpdrParametersInstance,
} from 'contracts/contract-instance';

import { unixToDate } from 'utils/date';
import { captureError } from 'utils/errors';

export async function getBorrowAssetRateAndFee (asset: Asset): Promise<BorrowAssetsRateAndFee> {
  const contract = await getEpdrParametersInstance();
  let interestRate = '0';
  try {
    interestRate = await contract.getUint(`governed.EPDR.${asset}_QUSD_interestRate`);
  } catch (error) {
    captureError(error);
  }

  return {
    asset,
    interestRate,
    borrowingFee: calculateInterestRate(Number(interestRate)),
  };
}

export async function addBorrowTokenToWallet (asset: Asset) {
  try {
    const instance = await getBorrowingInstance(asset);
    const [decimals, symbol] = await Promise.all([
      instance.methods.decimals().call(),
      instance.methods.symbol().call(),
    ]);

    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: instance.options.address,
          symbol,
          decimals,
        },
      }
    });
  } catch (error) {
    captureError(error);
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
