import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset, BorrowingVault, InterestRate } from 'typings/defi';

interface AssetInfo {
  name: string;
  symbol: string;
  decimals: string;
}

interface AssetItem {
  collateralBalance: string;
  borrowingFee: number;

  info: AssetInfo;
}

interface BorrowingState {
  assetsMap: Record<Asset, AssetItem>;

  collateralBalance: string;
  borrowingFee: number;

  interestRates: InterestRate[];
  interestRatesLoading: boolean;

  borrowingVaults: BorrowingVault[];
  borrowingVaultsError: Error | null | unknown;
  borrowingVaultsLoading: boolean;
}

function getDefaultAssetItem (): AssetItem {
  return {
    collateralBalance: '0',
    borrowingFee: 0,

    info: {
      name: '',
      symbol: '',
      decimals: ''
    }
  };
}

const initialState: BorrowingState = {
  assetsMap: {
    QBTC: getDefaultAssetItem(),
    QDAI: getDefaultAssetItem(),
    QUSDC: getDefaultAssetItem(),
    QVNXAU: getDefaultAssetItem(),
  },

  collateralBalance: '0',
  borrowingFee: 0,

  interestRates: [],
  interestRatesLoading: true,

  borrowingVaults: [],
  borrowingVaultsLoading: true,
  borrowingVaultsError: null,
};

const borrowingCoreSlice = createSlice({
  name: 'borrowing',
  initialState,
  reducers: {
    setBorrowingVaults (state, { payload }: PayloadAction<BorrowingVault[]>) {
      state.borrowingVaults = payload;
      state.borrowingVaultsLoading = false;
    },

    setBorrowingVaultsError (state, { payload }: PayloadAction<unknown>) {
      state.borrowingVaultsError = payload;
      state.borrowingVaultsLoading = false;
      state.borrowingVaults = [];
    },

    setCollateralBalance (state, { payload }: PayloadAction<{
      asset: Asset;
      balance: string;
    }>) {
      state.assetsMap[payload.asset].collateralBalance = payload.balance;
    },

    setBorrowingFee (state, { payload }: PayloadAction<{
      asset: Asset;
      borrowingFee: number;
    }>) {
      state.assetsMap[payload.asset].borrowingFee = payload.borrowingFee;
    },

    setAssetInfo (state, { payload }: PayloadAction<{
      asset: Asset;
      info: AssetInfo;
    }>) {
      state.assetsMap[payload.asset].info = payload.info;
    },

    setInterestRates (state, { payload }: PayloadAction<InterestRate[]>) {
      state.interestRates = payload;
      state.interestRatesLoading = false;
    },
  }
});

export const {
  setBorrowingVaults,
  setBorrowingVaultsError,
  setCollateralBalance,
  setBorrowingFee,
  setInterestRates,
  setAssetInfo,
} = borrowingCoreSlice.actions;
export default borrowingCoreSlice.reducer;
