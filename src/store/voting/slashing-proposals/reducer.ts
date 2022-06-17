import { SlashingProposalsAction } from './types';

import { groupArrayByBlockNumber } from 'func/useful';

const initialState = {
  activeProposals: [] as any[],
  endedProposals: [] as any[],

  slashingActiveProposalsCount: -1,
  slashingEndedProposalsCount: -1,
  slashingLoadingProposalsCount: true
};

export default function slashingProposals (
  state = initialState,
  action: SlashingProposalsAction
) {
  switch (action.type) {
    case 'SET_SLASHING_PROPOSALS':
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.activeProposalsArray),
        endedProposals: groupArrayByBlockNumber(action.endedProposalsArray),
        slashingEndedProposalsCount: action.proposalsCounter.ended,
        slashingActiveProposalsCount: action.proposalsCounter.active,
        slashingLoadingProposalsCount: false
      };
    default:
      return state;
  }
}
