import { SlashingProposalsAction } from './action-creators';
import * as actionTypes from './action-types';

import { groupArrayByBlockNumber } from 'func/useful';

export interface SlashingProposalsState {
  activeProposals: any[]
  endedProposals: any[]

  slashingActiveProposalsCount: number
  slashingEndedProposalsCount: number
  slashingLoadingProposalsCount: boolean
}

const initialState: SlashingProposalsState = {
  activeProposals: [],
  endedProposals: [],

  slashingActiveProposalsCount: -1,
  slashingEndedProposalsCount: -1,
  slashingLoadingProposalsCount: true
};

export default function slashingProposals (state = initialState, action: SlashingProposalsAction) {
  switch (action.type) {
    case actionTypes.SET_SLASHING_PROPOSALS:
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
