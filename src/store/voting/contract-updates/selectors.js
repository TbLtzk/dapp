export const contractUpdatesActiveProposalsSelector = (state) => state.contractUpdatesProposals.activeProposals;
export const contractUpdatesEndedProposalsSelector = (state) => state.contractUpdatesProposals.endedProposals;

export const contractUpdatesActiveProposalsCountSelector = (state) =>
  state.contractUpdatesProposals.contractUpdatesActiveProposalsCount;
export const contractUpdatesEndedProposalsCountSelector = (state) =>
  state.contractUpdatesProposals.contractUpdatesEndedProposalsCount;
export const contractUpdatesLoadingProposalsCountSelector = (state) =>
  state.contractUpdatesProposals.contractUpdatesLoadingProposalsCount;
