import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { LOAD_TYPES } from 'constants/statuses';

interface UserState {
  address: string;
  balance: string;
  chainId: number;
  loadType: string;
}

const initialState: UserState = {
  address: ZERO_ADDRESS,
  loadType: LOAD_TYPES.loading,
  balance: '0',
  chainId: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },

    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },

    setChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
    },

    setLoadType: (state, action: PayloadAction<string>) => {
      state.loadType = action.payload;
    }
  }
});

export const {
  setAddress,
  setBalance,
  setChainId,
  setLoadType
} = userSlice.actions;
export default userSlice.reducer;
