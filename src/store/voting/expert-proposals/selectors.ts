import { RootState } from 'store';

export const expertActiveProposalsSelector = (state: RootState) => state.expertProposals.activeProposals;
export const expertEndedProposalsSelector = (state: RootState) => state.expertProposals.endedProposals;

export const expertEndedProposalsCountSelector = (state: RootState) =>
  state.expertProposals.expertEndedProposalsCount;
export const expertActiveProposalsCountSelector = (state: RootState) =>
  state.expertProposals.expertActiveProposalsCount;
export const expertLoadingProposalsCountSelector = (state: RootState) =>
  state.expertProposals.expertLoadingProposalsCount;
