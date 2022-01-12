import { groupArrayByBlockNumber } from 'func/useful'
import * as actionTypes from './action-types'

const initialState = {
  activeProposals: [],
  endedProposals: [],

  rootActiveProposalsCount: -1,
  rootEndedProposalsCount: -1,
  rootLoadingProposalsCount: true
}

export default function rootNodeProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ROOT_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: groupArrayByBlockNumber(action.result)
      }
    case actionTypes.SET_ROOT_ENDED_PROPOSALS:
      return {
        ...state,
        endedProposals: groupArrayByBlockNumber(action.result)
      }
    case actionTypes.SET_ROOT_PROPOSALS_COUNT: {
      return {
        ...state,
        rootEndedProposalsCount: action.result.ended,
        rootActiveProposalsCount: action.result.active,
        rootLoadingProposalsCount: false
      }
    }
    default:
      return state
  }
}
