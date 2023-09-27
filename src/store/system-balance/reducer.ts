import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StablecoinAsset } from 'typings/defi';

interface StablecoinItem {
  systemBalance: string;
  totalSupply: string;

  systemBalanceDebt: string;
  systemBalanceSurplus: string;
}

interface SystemBalanceState {
  stablecoinMap: Record<StablecoinAsset, StablecoinItem>;

  systemReserveAvailableAmount: string;
  systemReserveBalance: string;
  systemReserveCoolDownPhase: number;
  isSystemReservePaused: boolean;
}

function getDefaultStablecoinItem (): StablecoinItem {
  return {
    systemBalance: '0',
    totalSupply: '0',
    systemBalanceDebt: '0',
    systemBalanceSurplus: '0',
  };
}

const initialState: SystemBalanceState = {
  stablecoinMap: {
    QEUR: getDefaultStablecoinItem(),
    QUSD: getDefaultStablecoinItem()
  },

  systemReserveAvailableAmount: '0',
  systemReserveBalance: '0',
  systemReserveCoolDownPhase: 0,
  isSystemReservePaused: false
};

const systemBalanceSlice = createSlice({
  name: 'system-balance',
  initialState,
  reducers: {
    setStableCoinTotalSupply: (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      totalSupply: string;
    }>) => {
      state.stablecoinMap[payload.asset].totalSupply = payload.totalSupply;
    },

    setSystemBalanceSurplus: (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      balance: string;
    }>) => {
      state.stablecoinMap[payload.asset].systemBalanceSurplus = payload.balance;
    },

    setSystemBalance: (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      balance: string;
    }>) => {
      state.stablecoinMap[payload.asset].systemBalance = payload.balance;
    },

    setSystemBalanceDebt: (state, { payload }: PayloadAction<{
      asset: StablecoinAsset;
      balance: string;
    }>) => {
      state.stablecoinMap[payload.asset].systemBalanceDebt = payload.balance;
    },

    setSystemReserveAvailableAmount: (state, { payload }: PayloadAction<string>) => {
      state.systemReserveAvailableAmount = payload;
    },

    setSystemReserveBalance: (state, { payload }: PayloadAction<string>) => {
      state.systemReserveBalance = payload;
    },

    setSystemReserveCoolDownPhase: (state, { payload }: PayloadAction<number>) => {
      state.systemReserveCoolDownPhase = payload;
    },

    setIsSystemReservePaused: (state, { payload }: PayloadAction<boolean>) => {
      state.isSystemReservePaused = payload;
    }
  }
});

export const {
  setStableCoinTotalSupply,
  setSystemBalanceSurplus,
  setSystemBalance,
  setSystemBalanceDebt,
  setSystemReserveAvailableAmount,
  setSystemReserveBalance,
  setSystemReserveCoolDownPhase,
  setIsSystemReservePaused
} = systemBalanceSlice.actions;
export default systemBalanceSlice.reducer;
