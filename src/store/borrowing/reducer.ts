import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, BorrowingVault, InterestRate, StablecoinAsset } from 'typings/defi';

interface AssetInfo {
  name: string;
  symbol: string;
  decimals: string;
}

interface AssetItem {
  collateralBalance: string;
  borrowingFee: Record<StablecoinAsset, number>;
  info: AssetInfo;
}

interface StablecoinItem {
  interestRates: InterestRate[];
  interestRatesLoading: boolean;
  borrowingVaults: BorrowingVault[];
  borrowingVaultsLoading: boolean;
}

interface BorrowingState {
  assetsMap: Record<Asset, AssetItem>;
  stablecoinMap: Record<StablecoinAsset, StablecoinItem>;
}

function getDefaultAssetItem (): AssetItem {
  return {
    collateralBalance: '0',
    borrowingFee: {
      QUSD: 0,
      QEUR: 0,
    },

    info: {
      name: '',
      symbol: '',
      decimals: ''
    }
  };
}

function getDefaultStablecoinItem (): StablecoinItem {
  return {
    interestRates: [],
    interestRatesLoading: true,

    borrowingVaults: [],
    borrowingVaultsLoading: true,
  };
}

const initialState: BorrowingState = {
  assetsMap: {
    QBTC: getDefaultAssetItem(),
    QDAI: getDefaultAssetItem(),
    QUSDC: getDefaultAssetItem(),
    QVNXAU: getDefaultAssetItem(),
  },

  stablecoinMap: {
    QUSD: getDefaultStablecoinItem(),
    QEUR: getDefaultStablecoinItem(),
  },
};

const borrowingCoreSlice = createSlice({
  name: 'borrowing',
  initialState,
  reducers: {
    setBorrowingVaults (state, { payload }: PayloadAction<{
      vaults: BorrowingVault[];
      stablecoinAsset: StablecoinAsset;
    }>) {
      const { stablecoinAsset, vaults } = payload;
      state.stablecoinMap[stablecoinAsset].borrowingVaults = vaults;
      state.stablecoinMap[stablecoinAsset].borrowingVaultsLoading = false;
    },

    setCollateralBalance (state, { payload }: PayloadAction<{
      asset: Asset;
      balance: string;
    }>) {
      state.assetsMap[payload.asset].collateralBalance = payload.balance;
    },

    setBorrowingFee (state, { payload }: PayloadAction<{
      asset: Asset;
      stablecoinAsset: StablecoinAsset;
      borrowingFee: number;
    }>) {
      state.assetsMap[payload.asset].borrowingFee[payload.stablecoinAsset] = payload.borrowingFee;
    },

    setAssetInfo (state, { payload }: PayloadAction<{
      asset: Asset;
      info: AssetInfo;
    }>) {
      state.assetsMap[payload.asset].info = payload.info;
    },

    setInterestRates (state, { payload }: PayloadAction<{
      stablecoinAsset: StablecoinAsset;
      rates: InterestRate[];
    }>) {
      const { stablecoinAsset, rates } = payload;
      state.stablecoinMap[stablecoinAsset].interestRates = rates;
      state.stablecoinMap[stablecoinAsset].interestRatesLoading = false;
    },
  }
});

export const {
  setBorrowingVaults,
  setCollateralBalance,
  setBorrowingFee,
  setInterestRates,
  setAssetInfo,
} = borrowingCoreSlice.actions;
export default borrowingCoreSlice.reducer;
