import { VaultStats } from '@q-dev/q-js-sdk';
import { calculateInterestRate, toBigNumber } from '@q-dev/utils';
import { Asset, VaultData } from 'typings/defi';

import { getBorrowingInstance, getStableCoinInstance } from 'contracts/contract-instance';

import { UINT_PSEUDO_UNDEFINED } from 'constants/boundaries';

export function convertToBigAmount (decimals: number) {
  return (value: number | string) =>
    toBigNumber(value)
      .multipliedBy(10 ** decimals)
      .toFixed();
}

export function convertFromBigAmount (decimals: number) {
  return (value: number | string) =>
    toBigNumber(value)
      .dividedBy(10 ** decimals)
      .toFixed();
}

export async function prepareVaultdata (vaultStats: VaultStats, userAddress: string): Promise<VaultData> {
  const collateralAsset = vaultStats.colStats.key as Asset;
  const [borrowingInstance, stableCoinInstance] = await Promise.all([
    getBorrowingInstance(collateralAsset),
    getStableCoinInstance(),
  ]);

  const [decimals, stableCoinBalance, borrowingBalance] = await Promise.all([
    borrowingInstance.decimals(),
    stableCoinInstance.balanceOf(userAddress),
    borrowingInstance.balanceOf(userAddress)
  ]);

  const borrowingFromBigAmount = convertFromBigAmount(18);
  const collateralFromBigAmount = convertFromBigAmount(+decimals);

  const liquidationPriceRaw = vaultStats.colStats.liquidationPrice;
  const assetPrice = borrowingFromBigAmount(vaultStats.colStats.price);
  const lockedCollateral = collateralFromBigAmount(vaultStats.colStats.balance);

  return {
    collateralDetails: {
      collateralAsset,
      assetPrice,
      decimals: +decimals,
      lockedCollateral,
      availableDeposit: collateralFromBigAmount(borrowingBalance),
      availableWithdraw: collateralFromBigAmount(vaultStats.colStats.withdrawableAmount),
      liquidationPrice: liquidationPriceRaw === UINT_PSEUDO_UNDEFINED
        ? '0'
        : borrowingFromBigAmount(liquidationPriceRaw),
    },
    borrowingDetails: {
      borrowingAsset: vaultStats.stcStats.key,
      availableRepay: borrowingFromBigAmount(stableCoinBalance),
      collateralValue: Number(lockedCollateral) * Number(assetPrice),
      availableBorrow: borrowingFromBigAmount(vaultStats.stcStats.availableToBorrow),
      outstandingDebt: borrowingFromBigAmount(vaultStats.stcStats.outstandingDebt),
      borrowingLimit: borrowingFromBigAmount(vaultStats.stcStats.borrowingLimit),
      liquidationLimit: borrowingFromBigAmount(vaultStats.stcStats.liquidationLimit),
      borrowingFee: calculateInterestRate(Number(vaultStats.stcStats.borrowingFee)),
    },
  };
}
