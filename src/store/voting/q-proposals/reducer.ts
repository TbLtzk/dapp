import { QProposalsAction } from './types';

import { groupArrayByBlockNumber } from 'func/useful';

const initialState = {
  activeProposals: [] as any[],
  endedProposals: [] as any[],

  qActiveProposalsCount: -1,
  qEndedProposalsCount: -1,
  qLoadingProposalsCount: true
};

export default function qProposals (state = initialState, action: QProposalsAction) {
  switch (action.type) {
    case 'SET_Q_PROPOSALS':
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.activeProposalsArray),
        endedProposals: groupArrayByBlockNumber(action.endedProposalsArray),
        qEndedProposalsCount: action.proposalsCounter.ended,
        qActiveProposalsCount: action.proposalsCounter.active,
        qLoadingProposalsCount: false
      };
    default:
      return state;
  }
}
