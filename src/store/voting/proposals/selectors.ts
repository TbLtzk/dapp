import { createSelector } from 'reselect';
import { ProposalEvent } from 'typings/contracts';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';

import { RootState } from 'store';
import { mode } from 'store/dashboard-mode/selectors';

import { ProposalType } from 'constants/statuses';

export const proposalValuesSelector = (state: RootState) =>
  Object.values(state.proposals.proposalsMap);
export const minimalActiveBlockSelector = (state: RootState) => state.proposals.minimalActiveBlock;

export const proposalsByTypeSelector = (type: ProposalType) => (state: RootState) =>
  state.proposals.proposalsMap[type];

export const activeProposalsByTypeSelector = (type: ProposalType) => createSelector(
  [proposalsByTypeSelector(type), minimalActiveBlockSelector], ({ proposals }, minBlock) =>
    proposals.filter(item => isProposalActive(item, minBlock))
);

export const endedProposalsByTypeSelector = (type: ProposalType) => createSelector(
  [proposalsByTypeSelector(type), minimalActiveBlockSelector], ({ proposals }, minBlock) =>
    proposals.filter(item => !isProposalActive(item, minBlock))
);

export const allProposalsSelector = createSelector(
  [proposalValuesSelector], (proposalValues) =>
    proposalValues.reduce((acc, { proposals }) => {
      acc.push(...proposals);
      return acc;
    }, [] as ProposalEvent[])
);

export const basicProposalsSelector = (state: RootState) =>
  [
    ...state.proposals.proposalsMap.q.proposals,
    ...state.proposals.proposalsMap.rootNode.proposals
  ];

export const isProposalsLoadingSelector = createSelector(
  [proposalValuesSelector], (proposalValues) =>
    proposalValues.some(({ isLoading }) => isLoading)
);

export const modeProposalsSelector = createSelector(
  [mode, allProposalsSelector, basicProposalsSelector], (appMode, proposals, basicProposals) =>
    appMode === MODE.basic ? basicProposals : proposals
);

export const activeProposalsCountSelector = createSelector(
  [modeProposalsSelector, minimalActiveBlockSelector], (proposals, minBlock) =>
    proposals.filter(item => isProposalActive(item, minBlock)).length
);

export const endedProposalsCountSelector = createSelector(
  [modeProposalsSelector, minimalActiveBlockSelector], (proposals, minBlock) =>
    proposals.filter(item => !isProposalActive(item, minBlock)).length
);

export const newParameterSelector = (state: RootState) => state.proposals.newParameter;
export const voteDetailsSelector = (state: RootState) => state.proposals.voteDetails;

export const constitutionHash = (state: RootState) => state.proposals.constitutionHash;
export const baseVotingWeightInfoSelector = (state: RootState) => state.proposals.baseVotingWeightInfo;

function isProposalActive (item: ProposalEvent, minBlock: number) {
  return item.status === 'active' && item.blockNumber >= minBlock;
}
