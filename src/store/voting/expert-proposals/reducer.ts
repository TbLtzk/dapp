import { ExpertProposalsAction } from './types';

import { groupArrayByBlockNumber } from 'func/useful';

const initialState = {
  activeProposals: [] as any[],
  endedProposals: [] as any[],

  expertActiveProposalsCount: -1,
  expertEndedProposalsCount: -1,

  expertLoadingProposalsCount: true
};

export default function expertProposals (
  state = initialState,
  action: ExpertProposalsAction
) {
  switch (action.type) {
    case 'SET_EXPERT_PROPOSALS':
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.activeProposalsArray),
        endedProposals: groupArrayByBlockNumber(action.endedProposalsArray),
        expertEndedProposalsCount: action.proposalsCounter.ended,
        expertActiveProposalsCount: action.proposalsCounter.active,
        expertLoadingProposalsCount: false
      };

    default:
      return state;
  }
}
