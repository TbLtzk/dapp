import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VestingState {
  balance: string;
  minimumTimeLock: string;
  timeLocks: TimeLockEntry[];
}

const initialState: VestingState = {
  balance: '0',
  minimumTimeLock: '0',
  timeLocks: []
};

const vestingSlice = createSlice({
  name: 'vesting',
  initialState,
  reducers: {
    setBalance: (state, { payload }: PayloadAction<string>) => {
      state.balance = payload;
    },

    setMinimumTimeLock: (state, { payload }: PayloadAction<string>) => {
      state.minimumTimeLock = payload;
    },

    setTimeLocks: (state, { payload }: PayloadAction<TimeLockEntry[]>) => {
      state.timeLocks = payload;
    }
  }
});

export const {
  setBalance,
  setMinimumTimeLock,
  setTimeLocks
} = vestingSlice.actions;
export default vestingSlice.reducer;
