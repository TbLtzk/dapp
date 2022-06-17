import { RootState } from 'store';

export const contractUpdatesActiveProposalsSelector = (state: RootState) =>
  state.contractUpdatesProposals.activeProposals;
export const contractUpdatesEndedProposalsSelector = (state: RootState) =>
  state.contractUpdatesProposals.endedProposals;

export const contractUpdatesActiveProposalsCountSelector = (state: RootState) =>
  state.contractUpdatesProposals.contractUpdatesActiveProposalsCount;
export const contractUpdatesEndedProposalsCountSelector = (state: RootState) =>
  state.contractUpdatesProposals.contractUpdatesEndedProposalsCount;
export const contractUpdatesLoadingProposalsCountSelector = (state: RootState) =>
  state.contractUpdatesProposals.contractUpdatesLoadingProposalsCount;
