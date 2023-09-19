import { VaultStats } from '@q-dev/q-js-sdk';
import { calculateInterestRate } from '@q-dev/utils';
import { Asset, StablecoinAsset, VaultData } from 'typings/defi';

import { getBorrowingInstance, getStableCoinInstance } from 'contracts/contract-instance';

import { fromWei } from 'utils/web3';

export async function prepareVaultdata (
  stablecoinAsset: StablecoinAsset,
  vaultStats: VaultStats,
  userAddress: string
): Promise<VaultData> {
  const collateralAsset = vaultStats.colStats.key as Asset;
  const [borrowingInstance, stableCoinInstance] = await Promise.all([
    getBorrowingInstance(collateralAsset),
    getStableCoinInstance(stablecoinAsset),
  ]);

  const [decimals, stableCoinBalance, borrowingBalance] = await Promise.all([
    borrowingInstance.decimals(),
    stableCoinInstance.balanceOf(userAddress),
    borrowingInstance.balanceOf(userAddress),
  ]);

  const assetPrice = fromWei(vaultStats.colStats.price);
  const lockedCollateral = fromWei(vaultStats.colStats.balance, decimals);

  return {
    collateralDetails: {
      collateralAsset,
      assetPrice,
      decimals: +decimals,
      lockedCollateral,
      availableDeposit: fromWei(borrowingBalance, decimals),
      availableWithdraw: fromWei(vaultStats.colStats.withdrawableAmount, decimals),
      liquidationPrice: vaultStats.colStats.liquidationPrice,
    },
    borrowingDetails: {
      borrowingAsset: vaultStats.stcStats.key,
      availableRepay: fromWei(stableCoinBalance),
      collateralValue: Number(lockedCollateral) * Number(assetPrice),
      availableBorrow: fromWei(vaultStats.stcStats.availableToBorrow),
      outstandingDebt: fromWei(vaultStats.stcStats.outstandingDebt),
      borrowingLimit: fromWei(vaultStats.stcStats.borrowingLimit),
      liquidationLimit: fromWei(vaultStats.stcStats.liquidationLimit),
      borrowingFee: calculateInterestRate(Number(vaultStats.stcStats.borrowingFee)),
    },
  };
}
