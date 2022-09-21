import { Vault } from '@q-dev/q-js-sdk';

import { defiApproveType } from 'constants/defi';

type Asset = 'QBTC' | 'QDAI' | 'QUSDC' | 'QVNXAU';
type ApproveType = typeof defiApproveType[keyof typeof defiApproveType];

interface SavingAsset {
  rate: number;
  depositAsset: string;
  interestAsset: string;
  balance: string;
  compoundRateUpdated: number;
}

interface VaultWithId extends Vault {
  id: number;
}

interface BorrowingVault extends VaultWithId {
  assetPrice: string;
  outstandingDebt: string;
  borrowingLimit: string;
  lockedCollateral: string;
}

interface BorrowAssetsRateAndFee {
  asset: Asset;
  borrowingFee: number;
  interestRate: string;
}

interface InterestRate extends BorrowAssetsRateAndFee {
  outstandingDebt: string;
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
