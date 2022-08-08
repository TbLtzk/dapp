import { VaultStats } from '@q-dev/q-js-sdk';
import { ApproveType, Asset, VaultData } from 'typings/defi';

import { getBorrowingInstance, getStableCoinInstance } from 'contracts/contract-instance';

import { defiApproveType } from 'constants/defiTypes';
import { UINT_PSEUDO_UNDEFINED } from 'constants/numbers';
import { BN, uintPerSecondToPerYearNumber } from 'utils/useful';

export function convertToBigAmount (decimals: number) {
  return (value: number | string) =>
    BN(value)
      .multipliedBy(10 ** decimals)
      .toFixed();
}

export function convertFromBigAmount (decimals: number) {
  return (value: number | string) =>
    BN(value)
      .dividedBy(10 ** decimals)
      .toFixed();
}

export async function getDeFiContractByType (approveType: ApproveType, asset: Asset) {
  if (approveType === defiApproveType.deposit) {
    const contract = await getBorrowingInstance(asset);
    return contract.methods;
  } else {
    const contract = await getStableCoinInstance();
    return contract;
  }
}

export async function prepareVaultdata (vaultStats: VaultStats, userAddress: string): Promise<VaultData> {
  const collateralAsset = vaultStats.colStats.key as Asset;
  const borrowingAsset = vaultStats.stcStats.key;

  const borrowingInstance = await getBorrowingInstance(collateralAsset);
  const stableCoinInstance = await getStableCoinInstance();
  const decimals = await borrowingInstance.methods.decimals().call();

  const borrowingFromBigAmount = convertFromBigAmount(18);
  const collateralFromBigAmount = convertFromBigAmount(decimals);

  const stableCoinBalance = await stableCoinInstance.balanceOf(userAddress);
  const borrowingBalance = await borrowingInstance.methods.balanceOf(userAddress).call();

  const availableDeposit = collateralFromBigAmount(borrowingBalance);
  const availableRepay = borrowingFromBigAmount(stableCoinBalance);

  const availableWithdraw = collateralFromBigAmount(vaultStats.colStats.withdrawableAmount);
  const lockedCollateral = collateralFromBigAmount(vaultStats.colStats.balance);
  const liquidationPriceRaw = vaultStats.colStats.liquidationPrice;
  const liquidationPrice =
    liquidationPriceRaw === UINT_PSEUDO_UNDEFINED ? '0' : borrowingFromBigAmount(liquidationPriceRaw);

  const assetPrice = borrowingFromBigAmount(vaultStats.colStats.price);
  const collateralValue = Number(lockedCollateral) * Number(assetPrice);
  const availableBorrow = borrowingFromBigAmount(vaultStats.stcStats.availableToBorrow);
  const outstandingDebt = borrowingFromBigAmount(vaultStats.stcStats.outstandingDebt);
  const borrowingLimit = borrowingFromBigAmount(vaultStats.stcStats.borrowingLimit);
  const liquidationLimit = borrowingFromBigAmount(vaultStats.stcStats.liquidationLimit);
  const borrowingFee = uintPerSecondToPerYearNumber(vaultStats.stcStats.borrowingFee) || 0;

  return {
    collateralDetails: {
      collateralAsset,
      lockedCollateral,
      assetPrice,
      availableWithdraw,
      availableDeposit,
      liquidationPrice,
      decimals,
    },
    borrowingDetails: {
      borrowingAsset,
      collateralValue,
      borrowingLimit,
      availableBorrow,
      availableRepay,
      outstandingDebt,
      liquidationLimit,
      borrowingFee,
    },
  };
}
