import * as actionTypes from './action-types';

import { groupArrayByBlockNumber } from 'func/useful';

const initialState = {
  activeProposals: [],
  endedProposals: [],

  expertActiveProposalsCount: -1,
  expertEndedProposalsCount: -1,

  expertLoadingProposalsCount: true
};

export default function expertProposals (state = initialState, action) {
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
