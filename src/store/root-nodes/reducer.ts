import { RootNodeMetric, RootNodesWithdrawalInfo } from '@q-dev/q-js-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RootNodeMember {
  address: string;
  stakeAmount: string;
  share: number;
  alias: string;
  metric?: RootNodeMetric;
}

interface RootNodesState {
  members: RootNodeMember[];
  isMembersLoading: boolean;

  totalStake: string;
  isRootNode: boolean;
  rootNodeStake: string;
  withdrawalInfo: RootNodesWithdrawalInfo;

  minimumTimeLock: string;
}

const initialState: RootNodesState = {
  members: [],
  isMembersLoading: true,

  totalStake: '0',
  isRootNode: false,
  rootNodeStake: '0',
  withdrawalInfo: {
    amount: '0',
    endTime: '0',
  },

  minimumTimeLock: '0',
};

const rootNodesSlice = createSlice({
  name: 'root-nodes',
  initialState,
  reducers: {
    setMembers: (state, { payload }: PayloadAction<RootNodeMember[]>) => {
      state.members = payload;
      state.isMembersLoading = false;
    },

    setTotalStake: (state, { payload }: PayloadAction<string>) => {
      state.totalStake = payload;
    },

    setRootNodeStake: (state, { payload }: PayloadAction<string>) => {
      state.rootNodeStake = payload;
    },

    setWithdrawalInfo: (state, { payload }: PayloadAction<RootNodesWithdrawalInfo>) => {
      state.withdrawalInfo = payload;
    },

    setIsRootNode: (state, { payload }: PayloadAction<boolean>) => {
      state.isRootNode = payload;
    },

    setMinimumTimeLock: (state, { payload }: PayloadAction<string>) => {
      state.minimumTimeLock = payload;
    },
  }
});

export const {
  setMembers,
  setTotalStake,
  setRootNodeStake,
  setWithdrawalInfo,
  setIsRootNode,
  setMinimumTimeLock,
} = rootNodesSlice.actions;
export default rootNodesSlice.reducer;
