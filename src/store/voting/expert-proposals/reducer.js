import * as actionTypes from './action-types'
import {
  changeProposalsArrIfExist,
  changeProposalsArrIfEmptyResult
} from 'contracts/helpers/voting-helpers/base-voting-helper'

const initialState = {
  oneProposal: [],

  activeProposals: [],
  loadingActiveProposals: true,
  activeProposalsError: null,

  endedProposals: [],
  loadingEndedProposals: true,
  endedProposalsError: null,

  expertActiveProposalsCount: 0,
  expertEndedProposalsCount: 0,
  expertLoadingProposalsCount: true
}

export default function expertProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_EXPERT_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: [...state.activeProposals, ...action.result],
        loadingActiveProposals: false
      }
    case actionTypes.SET_EXPERT_ACTIVE_PROPOSALS_LOADING:
      return {
        ...state,
        loadingActiveProposals: true
      }
    case actionTypes.SET_EXPERT_ACTIVE_PROPOSALS_ERROR:
      return {
        ...state,
        activeProposals: [],
        loadingActiveProposals: false,
        activeProposalsError: action.result
      }
    case actionTypes.SET_EXPERT_ENDED_PROPOSALS:
      return {
        ...state,
        endedProposals: [...state.endedProposals, ...action.result],
        loadingEndedProposals: false
      }
    case actionTypes.SET_EXPERT_ENDED_PROPOSALS_LOADING:
      return {
        ...state,
        loadingEndedProposals: true
      }
    case actionTypes.SET_EXPERT_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        endedProposalsError: action.result
      }

    case actionTypes.GET_EXPERT_PROPOSAL:
      return {
        ...state,
        loadingProposals: true
      }
    case actionTypes.GET_EXPERT_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfExist(state.proposalsArr, action),
        loadingProposals: false
      }
    case actionTypes.GET_EXPERT_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false
      }
    case actionTypes.GET_EXPERT_EMPTY_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfEmptyResult(state.proposalsArr, action),
        loadingProposals: false
      }
    case actionTypes.GET_EXPERT_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfExist(state.endedProposals, action),
        loadingEndedProposals: false
      }
    case actionTypes.GET_EXPERT_EMPTY_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfEmptyResult(state.endedProposals, action),
        loadingEndedProposals: false
      }
    case actionTypes.GET_EXPERT_PROPOSAL_ENDED:
      return {
        ...state,
        loadingEndedProposals: true
      }
    case actionTypes.GET_EXPERT_PROPOSAL_ENDED_ERROR:
      return {
        ...state,
        endedProposals: [...state.endedProposals],
        loadingEndedProposals: false
      }
    case actionTypes.GET_ONE_EXPERT_PROPOSAL_SUCCESS:
      return {
        ...state,
        oneProposal: action.result,
        loadingProposals: false
      }
    case actionTypes.SET_EXPERT_PROPOSALS_COUNT: {
      return {
        ...state,
        expertEndedProposalsCount: action.result.ended,
        expertActiveProposalsCount: action.result.active,
        expertLoadingProposalsCount: false
      }
    }
    default:
      return state
  }
}
