import { Vault } from '@q-dev/q-js-sdk';

type Asset = 'QBTC' | 'QDAI' | 'QUSDC' | 'QVNXAU';
type StablecoinAsset = 'QUSD' | 'QEUR';
type ApproveType = 'deposit' | 'repay';

interface SavingAsset {
  assetName: StablecoinAsset;
  rate: number;
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
