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
    case actionTypes.SET_SLASHING_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.result)
      }
    case actionTypes.SET_SLASHING_ENDED_PROPOSALS:
      return {
        ...state,
        endedProposals: groupArrayByBlockNumber(action.result)
      }
    case actionTypes.SET_SLASHING_PROPOSALS_COUNT: {
      return {
        ...state,
        slashingEndedProposalsCount: action.result.ended,
        slashingActiveProposalsCount: action.result.active,
        slashingLoadingProposalsCount: false
      }
    }
    default:
      return state
  }
}
