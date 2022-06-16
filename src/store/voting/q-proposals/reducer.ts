import { QProposalsAction } from './action-creators';
import * as actionTypes from './action-types';

import { groupArrayByBlockNumber } from 'func/useful';

export interface QProposalsState {
  activeProposals: any[]
  endedProposals: any[]

  qActiveProposalsCount: number
  qEndedProposalsCount: number
  qLoadingProposalsCount: boolean
}

const initialState: QProposalsState = {
  activeProposals: [],
  endedProposals: [],

  qActiveProposalsCount: -1,
  qEndedProposalsCount: -1,
  qLoadingProposalsCount: true
};

export default function qProposals (state = initialState, action: QProposalsAction) {
  switch (action.type) {
    case actionTypes.SET_Q_PROPOSALS:
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
