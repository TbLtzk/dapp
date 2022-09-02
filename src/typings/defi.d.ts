import { Vault } from '@q-dev/q-js-sdk';

import { BorrowAssets, defiApproveType } from 'constants/defi';

type Asset = keyof typeof BorrowAssets;
type ApproveType = typeof defiApproveType[keyof typeof defiApproveType];

interface SavingAssets {
  rate: number;
  depositAsset: string;
  interestAsset: string;
}

interface VaultWithFee extends Vault {
  vaultNum: number;
  borrowingFee: number;
}

interface BorrowAssetsRateAndFee {
  asset: Asset;
  borrowingFee: number;
  interestRate: string;
}

interface VaultData {
  collateralDetails: {
    collateralAsset: Asset;
    lockedCollateral: string;
    assetPrice: string;
    availableWithdraw: string;
    availableDeposit: string;
    liquidationPrice: string;
    decimals: number;
  };
  borrowingDetails: {
    collateralValue: number;
    borrowingFee: number;
    borrowingAsset: string;
    borrowingLimit: string;
    availableBorrow: string;
    availableRepay: string;
    outstandingDebt: string;
    liquidationLimit: string;

  };
}
