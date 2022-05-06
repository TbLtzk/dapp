import { UINT_PSEUDO_UNDEFINED } from 'constants/numbers';
import { fromBtcBlockchain, fromWei } from 'func/balance';
import { uintPerSecondToPerYearNumber } from 'func/useful';

export function getBorrowVaultInfoHelper (availableRepay, availableDeposit, vaultStats) {
  const colAsset = vaultStats?.colStats?.key;
  const stcConversion = fromWei;
  const colConversion = colAsset === 'QBTC' ? fromBtcBlockchain : fromWei;

  const lockedCol = colConversion(vaultStats?.colStats?.balance || 0);

  const colPrice = vaultStats?.colStats?.price ? stcConversion(vaultStats.colStats.price) : 0;

  const borOutstandingDebt = vaultStats?.stcStats?.outstandingDebt
    ? stcConversion(vaultStats.stcStats.outstandingDebt)
    : 0;
  const borrowingLimit = vaultStats?.stcStats?.borrowingLimit ? stcConversion(vaultStats.stcStats.borrowingLimit) : 0;

  const availableWithdraw = vaultStats?.colStats?.withdrawableAmount
    ? colConversion(vaultStats.colStats.withdrawableAmount)
    : 0;
  const availableBorrow = vaultStats?.stcStats?.availableToBorrow
    ? stcConversion(vaultStats.stcStats.availableToBorrow)
    : 0;

  availableDeposit = !availableDeposit ? 0 : colConversion(availableDeposit);

  const liquidationPriceRaw = vaultStats?.colStats?.liquidationPrice;
  let liquidationPrice = 0;
  if (liquidationPriceRaw && liquidationPriceRaw !== UINT_PSEUDO_UNDEFINED) {
    liquidationPrice = stcConversion(liquidationPriceRaw);
  }

  const collateralDetails = {
    assets: colAsset,
    lockedCol,
    assetPrice: colPrice,
    availableWithdraw,
    availableDeposit,
    liquidationPrice
  };

  const borCollateralValue = lockedCol * colPrice;
  availableRepay = !availableRepay ? 0 : stcConversion(availableRepay);

  const borrowingDetails = {
    assets: vaultStats?.stcStats?.key,
    collateralValue: borCollateralValue,
    borrowingLimit,
    availableBorrow,
    availableRepay,
    outstandingDebt: borOutstandingDebt,
    liquidationLimit: vaultStats?.stcStats?.liquidationLimit ? stcConversion(vaultStats.stcStats.liquidationLimit) : 0,
    borrowingFee: vaultStats?.stcStats?.borrowingFee
      ? uintPerSecondToPerYearNumber(vaultStats.stcStats.borrowingFee)
      : 0
  };
  return {
    collateralDetails,
    borrowingDetails
  };
}
