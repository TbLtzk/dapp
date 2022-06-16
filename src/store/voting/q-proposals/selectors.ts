import { RootState } from 'store';

export const qActiveProposalsSelector = (state: RootState) => state.qProposals.activeProposals;
export const qEndedProposalsSelector = (state: RootState) => state.qProposals.endedProposals;

export const qEndedProposalsCountSelector = (state: RootState) => state.qProposals.qEndedProposalsCount;
export const qActiveProposalsCountSelector = (state: RootState) => state.qProposals.qActiveProposalsCount;
export const qLoadingProposalsCountSelector = (state: RootState) => state.qProposals.qLoadingProposalsCount;
