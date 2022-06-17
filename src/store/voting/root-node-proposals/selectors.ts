import { RootState } from 'store';

export const rootActiveProposalsSelector = (state: RootState) => state.rootNodeProposals.activeProposals;
export const rootEndedProposalsSelector = (state: RootState) => state.rootNodeProposals.endedProposals;

export const rootEndedProposalsCountSelector = (state: RootState) => state.rootNodeProposals.rootEndedProposalsCount;
export const rootActiveProposalsCountSelector = (state: RootState) => state.rootNodeProposals.rootActiveProposalsCount;
export const rootLoadingProposalsCountSelector = (state: RootState) =>
  state.rootNodeProposals.rootLoadingProposalsCount;
