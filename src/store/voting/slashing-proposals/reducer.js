import { groupArrayByBlockNumber } from 'func/useful'
import * as actionTypes from './action-types'

const initialState = {
  activeProposals: [],
  endedProposals: [],

  slashingActiveProposalsCount: -1,
  slashingEndedProposalsCount: -1,
  slashingLoadingProposalsCount: true
}

export default function slashingProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SLASHING_PROPOSALS:
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.activeProposalsArray),
        endedProposals: groupArrayByBlockNumber(action.endedProposalsArray),
        slashingEndedProposalsCount: action.proposalsCounter.ended,
        slashingActiveProposalsCount: action.proposalsCounter.active,
        slashingLoadingProposalsCount: false
      }
    default:
      return state
  }
}
