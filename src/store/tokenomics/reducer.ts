import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenomicsState {
  defaultAllocationProxy: string;
  defaultAllocationProxyLoading: boolean;

  validationRewardProxy: string;
  validationRewardProxyLoading: boolean;

  rootNodeRewardProxy: string;
  rootNodeRewardProxyLoading: boolean;

  qHolderUpdateTime: string;
  qHolderUpdateTimeLoading: boolean;

  rootNodesAPR: string;
  validatorsAPR: string;
}

const initialState: TokenomicsState = {
  defaultAllocationProxy: '0',
  defaultAllocationProxyLoading: false,

  validationRewardProxy: '0',
  validationRewardProxyLoading: false,

  rootNodeRewardProxy: '0',
  rootNodeRewardProxyLoading: false,

  qHolderUpdateTime: '0',
  qHolderUpdateTimeLoading: false,

  rootNodesAPR: '0',
  validatorsAPR: '0',
};

const tokenomicsSlice = createSlice({
  name: 'tokenomics',
  initialState,
  reducers: {
    setDefaultAllocationProxy: (state, { payload }: PayloadAction<string>) => {
      state.defaultAllocationProxy = payload;
      state.defaultAllocationProxyLoading = false;
    },

    setDefaultAllocationProxyLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.defaultAllocationProxyLoading = payload;
    },

    setValidationRewardProxy: (state, { payload }: PayloadAction<string>) => {
      state.validationRewardProxy = payload;
      state.validationRewardProxyLoading = false;
    },

    setValidationRewardProxyLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.validationRewardProxyLoading = payload;
    },

    setRootNodeRewardProxy: (state, { payload }: PayloadAction<string>) => {
      state.rootNodeRewardProxy = payload;
      state.rootNodeRewardProxyLoading = false;
    },

    setRootNodeRewardProxyLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.rootNodeRewardProxyLoading = payload;
    },

    setqHolderUpdateTime: (state, { payload }: PayloadAction<string>) => {
      state.qHolderUpdateTime = payload;
      state.qHolderUpdateTimeLoading = false;
    },

    setQHolderUpdateTimeLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.qHolderUpdateTimeLoading = payload;
    },

    setRootNodesAPR: (state, { payload }: PayloadAction<string>) => {
      state.rootNodesAPR = payload;
    },

    setValidatorsAPR: (state, { payload }: PayloadAction<string>) => {
      state.validatorsAPR = payload;
    }
  }
});

export const {
  setDefaultAllocationProxy,
  setDefaultAllocationProxyLoading,
  setValidationRewardProxy,
  setValidationRewardProxyLoading,
  setRootNodeRewardProxy,
  setRootNodeRewardProxyLoading,
  setqHolderUpdateTime,
  setQHolderUpdateTimeLoading,
  setRootNodesAPR,
  setValidatorsAPR,
} = tokenomicsSlice.actions;
export default tokenomicsSlice.reducer;
