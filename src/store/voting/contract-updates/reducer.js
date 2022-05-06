import * as actionTypes from './action-types';

import { groupArrayByBlockNumber } from 'func/useful';

const initialState = {
  activeProposals: [],
  endedProposals: [],

  contractUpdatesActiveProposalsCount: -1,
  contractUpdatesEndedProposalsCount: -1,
  contractUpdatesLoadingProposalsCount: true
};

export default function contractUpdatesProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CONTRACT_UPDATES_PROPOSALS:
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.activeProposalsArray),
        endedProposals: groupArrayByBlockNumber(action.endedProposalsArray),
        contractUpdatesEndedProposalsCount: action.proposalsCounter.ended,
        contractUpdatesActiveProposalsCount: action.proposalsCounter.active,
        contractUpdatesLoadingProposalsCount: false
      };
    default:
      return state;
  }
}
