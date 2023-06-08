import { calculateInterestRate } from '@q-dev/utils';
import { ErrorHandler, requestAddErc20 } from 'helpers';
import { Asset, BorrowAssetsRateAndFee } from 'typings/defi';

import {
  getBorrowingInstance,
  getCompoundRateBorrowingInstance,
  getCompoundRateKeeperSavingInstance,
  getEpdrParametersInstance,
} from 'contracts/contract-instance';

import { unixToDate } from 'utils/date';

export async function getBorrowAssetRateAndFee (asset: Asset): Promise<BorrowAssetsRateAndFee> {
  const contract = await getEpdrParametersInstance();
  let interestRate = '0';
  try {
    interestRate = await contract.getUint(`governed.EPDR.${asset}_QUSD_interestRate`);
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }

  return {
    asset,
    interestRate,
    borrowingFee: calculateInterestRate(Number(interestRate)),
  };
}

export async function addBorrowTokenToWallet (asset: Asset) {
  try {
    const borrowingInstance = await getBorrowingInstance(asset);
    const [decimals, symbol] = await Promise.all([
      borrowingInstance.decimals(),
      borrowingInstance.symbol(),
    ]);

    await requestAddErc20({
      address: borrowingInstance.address,
      symbol,
      decimals,
    });
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export async function getSavingCompoundRateLastUpdate () {
  try {
    const contract = await getCompoundRateKeeperSavingInstance();
    const lastUpdate = await contract.getLastUpdate();
    return unixToDate(lastUpdate);
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return null;
  }
}

export async function getBorrowingCompoundRateLastUpdate (asset: Asset) {
  try {
    const contract = await getCompoundRateBorrowingInstance(asset);
    const lastUpdate = await contract.getLastUpdate();
    return unixToDate(lastUpdate);
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return null;
  }
}
