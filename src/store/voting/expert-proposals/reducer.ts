import { ExpertProposalsAction } from './action-creators';
import * as actionTypes from './action-types';

import { groupArrayByBlockNumber } from 'func/useful';

export interface QProposalsState {
  activeProposals: any[]
  endedProposals: any[]

  expertActiveProposalsCount: number
  expertEndedProposalsCount: number
  expertLoadingProposalsCount: boolean
}

const initialState: QProposalsState = {
  activeProposals: [],
  endedProposals: [],

  expertActiveProposalsCount: -1,
  expertEndedProposalsCount: -1,

  expertLoadingProposalsCount: true
};

export default function expertProposals (
  state = initialState,
  action: ExpertProposalsAction
) {
  switch (action.type) {
    case actionTypes.SET_EXPERT_PROPOSALS:
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
