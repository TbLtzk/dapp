import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavingAsset, StablecoinAsset } from 'typings/defi';

interface BalanceDetails {
  interestRate: number;
  currentBalance: string;
  estimatedInterest: number;
}

interface StablecoinState {
  savingRate: number;
  allowance: string;
  availableToDeposit: string;
  balanceDetails: BalanceDetails;
  totalSavingBalance: string;
}

interface SavingState {
  stablecoinMap: Record<StablecoinAsset, StablecoinState>;

  savingAssets: SavingAsset[];
  savingAssetsLoading: boolean;
  savingAssetsError: Error | null | unknown;
}

function getDefaultStablecoinState (): StablecoinState {
  return {
    savingRate: 0,
    allowance: '0',
    availableToDeposit: '0',
    balanceDetails: {
      interestRate: 0,
      currentBalance: '0',
      estimatedInterest: 0,
    },
    totalSavingBalance: '0',
  };
}

const initialState: SavingState = {
  stablecoinMap: {
    QUSD: getDefaultStablecoinState(),
    QEUR: getDefaultStablecoinState(),
  },

  savingAssets: [],
  savingAssetsLoading: true,
  savingAssetsError: null,
};

const savingSlice = createSlice({
  name: 'saving',
  initialState,
  reducers: {
    setBalanceDetails (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      balanceDetails: BalanceDetails;
    }>) {
      state.stablecoinMap[payload.asset].balanceDetails = payload.balanceDetails;
    },

    setAllowance (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      allowance: string;
    }>) {
      state.stablecoinMap[payload.asset].allowance = payload.allowance;
    },

    setAvailableToDeposit (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      amount: string;
    }>) {
      state.stablecoinMap[payload.asset].availableToDeposit = payload.amount;
    },

    setSavingAssets (state, { payload }: PayloadAction<SavingAsset[]>) {
      state.savingAssets = payload;
      state.savingAssetsLoading = false;
    },

    setSavingAssetsError (state, { payload }: PayloadAction<unknown>) {
      state.savingAssetsError = payload;
      state.savingAssetsLoading = false;
    },

    setTotalSavingBalance (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      balance: string;
    }>) {
      state.stablecoinMap[payload.asset].totalSavingBalance = payload.balance;
    },

    setSavingRate (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      rate: number;
    }>) {
      state.stablecoinMap[payload.asset].savingRate = payload.rate;
    },
  }
});

export const {
  setBalanceDetails,
  setAllowance,
  setAvailableToDeposit,
  setSavingAssets,
  setSavingAssetsError,
  setTotalSavingBalance,
  setSavingRate,
} = savingSlice.actions;
export default savingSlice.reducer;
