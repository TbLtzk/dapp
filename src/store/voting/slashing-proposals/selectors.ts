import { RootState } from 'store';

export const slashingActiveProposalsSelector = (state: RootState) => state.slashingProposals.activeProposals;
export const slashingEndedProposalsSelector = (state: RootState) => state.slashingProposals.endedProposals;

export const slashingEndedProposalsCountSelector = (state: RootState) =>
  state.slashingProposals.slashingEndedProposalsCount;
export const slashingActiveProposalsCountSelector = (state: RootState) =>
  state.slashingProposals.slashingActiveProposalsCount;
export const slashingLoadingProposalsCountSelector = (state: RootState) =>
  state.slashingProposals.slashingLoadingProposalsCount;
