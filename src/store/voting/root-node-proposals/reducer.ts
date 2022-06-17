import { RootNodeProposalsAction } from './types';

import { groupArrayByBlockNumber } from 'func/useful';

export interface RootNodeProposalsState {
  activeProposals: any[]
  endedProposals: any[]

  rootActiveProposalsCount: number
  rootEndedProposalsCount: number
  rootLoadingProposalsCount: boolean
}

const initialState: RootNodeProposalsState = {
  activeProposals: [],
  endedProposals: [],

  rootActiveProposalsCount: -1,
  rootEndedProposalsCount: -1,
  rootLoadingProposalsCount: true
};

export default function rootNodeProposals (
  state = initialState,
  action: RootNodeProposalsAction
) {
  switch (action.type) {
    case 'SET_ROOT_PROPOSALS':
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.activeProposalsArray),
        endedProposals: groupArrayByBlockNumber(action.endedProposalsArray),
        rootEndedProposalsCount: action.proposalsCounter.ended,
        rootActiveProposalsCount: action.proposalsCounter.active,
        rootLoadingProposalsCount: false
      };
    default:
      return state;
  }
}
