import { groupArrayByBlockNumber } from 'func/useful'
import * as actionTypes from './action-types'

const initialState = {
  activeProposals: [],
  endedProposals: [],

  qActiveProposalsCount: -1,
  qEndedProposalsCount: -1,
  qLoadingProposalsCount: true
}

export default function qProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_Q_PROPOSALS:
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.activeProposalsArray),
        endedProposals: groupArrayByBlockNumber(action.endedProposalsArray),
        qEndedProposalsCount: action.proposalsCounter.ended,
        qActiveProposalsCount: action.proposalsCounter.active,
        qLoadingProposalsCount: false
      }
    default:
      return state
  }
}
