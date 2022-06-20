import { createSelector } from 'reselect';

import { RootState } from 'store';

export const qProposalsSelector = (state: RootState) => state.qProposals.proposals;

export const qActiveProposalsSelector = createSelector(
  [qProposalsSelector], (proposals) =>
    proposals.filter((proposal) => proposal.status === 'active')
);
export const qEndedProposalsSelector = createSelector(
  [qProposalsSelector], (proposals) =>
    proposals.filter((proposal) => proposal.status === 'ended')
);

export const qActiveProposalsCountSelector = createSelector(
  [qActiveProposalsSelector], (proposals) => proposals.length
);
export const qEndedProposalsCountSelector = createSelector(
  [qEndedProposalsSelector], (proposals) => proposals.length
);

export const qLoadingProposalsCountSelector = (state: RootState) => state.qProposals.isLoading;
export const qProposalsLoadingSelector = (state: RootState) => state.qProposals.isLoading;
