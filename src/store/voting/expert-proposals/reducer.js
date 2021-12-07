import * as actionTypes from './action-types'

const initialState = {
  activeProposals: [],
  endedProposals: [],

  expertActiveProposalsCount: -1,
  expertEndedProposalsCount: -1,

  expertLoadingProposalsCount: true
}

export default function expertProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_EXPERT_PROPOSALS_COUNT: {
      return {
        ...state,
        expertEndedProposalsCount: action.result.ended,
        expertActiveProposalsCount: action.result.active,
        expertLoadingProposalsCount: false
      }
    }
    case actionTypes.SET_EXPERT_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: action.result
      }
    case actionTypes.SET_EXPERT_ENDED_PROPOSALS:
      return {
        ...state,
        endedProposals: action.result
      }
    default:
      return state
  }
}
