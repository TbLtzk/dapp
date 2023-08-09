import { L0ExclusionListItem, L0ListItemStatus, L0RootListItem, RootNodeMetric, RootNodesWithdrawalInfo } from '@q-dev/q-js-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RootNodeMember {
  address: string;
  stakeAmount: string;
  share: number;
  alias: string;
  metric?: RootNodeMetric;
}

export interface RootNodesOnchainDiffItem {
  address: string;
  isOnchain: boolean;
  isL0Active: boolean;
}

interface RootNodesState {
  members: RootNodeMember[];
  isMembersLoading: boolean;

  totalStake: string;
  isRootNode: boolean;
  rootNodeStake: string;
  withdrawalInfo: RootNodesWithdrawalInfo;

  minimumTimeLock: string;

  rootNodesOnchainDiffList: RootNodesOnchainDiffItem[];
  isRootNodesOnchainDiffListLoading: boolean;

  rootNodesL0: Record<L0ListItemStatus, L0RootListItem | null>;
  rootNodesExclusion: Record<L0ListItemStatus, L0ExclusionListItem | null>;
  rootNodesOnchainList: string[];
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
  rootNodesOnchainDiffList: [],
  isRootNodesOnchainDiffListLoading: true,
  rootNodesL0: {
    active: null,
    proposed: null
  },
  rootNodesExclusion: {
    active: null,
    proposed: null
  },
  rootNodesOnchainList: [],
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

    setRootNodesOnchainDiffList: (state, { payload }: PayloadAction<RootNodesOnchainDiffItem[]>) => {
      state.rootNodesOnchainDiffList = payload;
      state.isRootNodesOnchainDiffListLoading = false;
    },

    setRootNodesL0: (state, { payload }: PayloadAction<{
      status: L0ListItemStatus;
      rootNodesL0: L0RootListItem | null;
    }>) => {
      state.rootNodesL0[payload.status] = payload.rootNodesL0;
    },

    setRootNodesExclusion: (state, { payload }: PayloadAction<{
      status: L0ListItemStatus;
      rootNodesExclusion: L0ExclusionListItem | null;
    }>) => {
      state.rootNodesExclusion[payload.status] = payload.rootNodesExclusion;
    },

    setRootOnchainList: (state, { payload }: PayloadAction<string[]>) => {
      state.rootNodesOnchainList = payload;
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
  setRootNodesOnchainDiffList,
  setRootNodesL0,
  setRootNodesExclusion,
  setRootOnchainList,
} = rootNodesSlice.actions;
export default rootNodesSlice.reducer;
