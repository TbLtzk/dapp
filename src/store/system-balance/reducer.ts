import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SystemBalanceState {
  stableCoinTotalSupply: string;
  systemBalanceSurplus: string;
  systemBalance: string;
  systemBalanceDebt: string;

  systemReserveAvailableAmount: string;
  systemReserveBalance: string;
}

const initialState: SystemBalanceState = {
  stableCoinTotalSupply: '0',
  systemBalanceSurplus: '0',
  systemBalance: '0',
  systemBalanceDebt: '0',

  systemReserveAvailableAmount: '0',
  systemReserveBalance: '0',
};

const systemBalanceSlice = createSlice({
  name: 'system-balance',
  initialState,
  reducers: {
    setStableCoinTotalSupply: (state, { payload }: PayloadAction<string>) => {
      state.stableCoinTotalSupply = payload;
    },

    setSystemBalanceSurplus: (state, { payload }: PayloadAction<string>) => {
      state.systemBalanceSurplus = payload;
    },

    setSystemBalance: (state, { payload }: PayloadAction<string>) => {
      state.systemBalance = payload;
    },

    setSystemBalanceDebt: (state, { payload }: PayloadAction<string>) => {
      state.systemBalanceDebt = payload;
    },

    setSystemReserveAvailableAmount: (state, { payload }: PayloadAction<string>) => {
      state.systemReserveAvailableAmount = payload;
    },

    setSystemReserveBalance: (state, { payload }: PayloadAction<string>) => {
      state.systemReserveBalance = payload;
    },
  }
});

export const {
  setStableCoinTotalSupply,
  setSystemBalanceSurplus,
  setSystemBalance,
  setSystemBalanceDebt,
  setSystemReserveAvailableAmount,
  setSystemReserveBalance,
} = systemBalanceSlice.actions;
export default systemBalanceSlice.reducer;
