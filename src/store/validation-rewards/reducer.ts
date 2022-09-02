import { ValidatorPoolInfo } from '@q-dev/q-js-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ValidationRewardsState {
  poolInfo: ValidatorPoolInfo;
  poolBalance: string;
  delegatorsShare: number;
  lastUpdateOfCompoundRate: string;
}

const initialState: ValidationRewardsState = {
  poolInfo: {
    interestRate: '0',
    aggregatedNormalizedStake: '0',
    compoundRate: '0',
    delegatedStake: '0',
    delegatorsShare: '0',
    lastUpdateOfCompoundRate: '0',
    poolBalance: '0',
    reservedForClaims: '0',
  },
  poolBalance: '0',
  delegatorsShare: 0,
  lastUpdateOfCompoundRate: '0',
};

export const validationRewardsSlice = createSlice({
  name: 'validation-rewards',
  initialState,
  reducers: {
    setPoolInfo: (state, { payload }: PayloadAction<ValidatorPoolInfo>) => {
      state.poolInfo = payload;
    },

    setPoolBalance: (state, { payload }: PayloadAction<string>) => {
      state.poolBalance = payload;
    },

    setDelegatorsShare: (state, { payload }: PayloadAction<number>) => {
      state.delegatorsShare = payload;
    },

    setLastUpdateOfCompoundRate: (state, { payload }: PayloadAction<string>) => {
      state.lastUpdateOfCompoundRate = payload;
    }
  }
});

export const {
  setPoolInfo,
  setPoolBalance,
  setDelegatorsShare,
  setLastUpdateOfCompoundRate,
} = validationRewardsSlice.actions;
export default validationRewardsSlice.reducer;
