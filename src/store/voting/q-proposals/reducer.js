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
    case actionTypes.SET_Q_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.result)
      }
    case actionTypes.SET_Q_ENDED_PROPOSALS:
      return {
        ...state,
        endedProposals: groupArrayByBlockNumber(action.result)
      }
    case actionTypes.SET_Q_PROPOSALS_COUNT: {
      return {
        ...state,
        qEndedProposalsCount: action.result.ended,
        qActiveProposalsCount: action.result.active,
        qLoadingProposalsCount: false
      }
    }
    default:
      return state
  }
}
