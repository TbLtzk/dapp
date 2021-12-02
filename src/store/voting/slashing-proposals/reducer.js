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

  slashingActiveProposalsCount: -1,
  slashingEndedProposalsCount: -1,
  slashingLoadingProposalsCount: true
}

export default function slashingProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SLASHING_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: action.result,
        loadingActiveProposals: false
      }
    case actionTypes.SET_SLASHING_ACTIVE_PROPOSALS_LOADING:
      return {
        ...state,
        loadingActiveProposals: true
      }
    case actionTypes.SET_SLASHING_ACTIVE_PROPOSALS_ERROR:
      return {
        ...state,
        activeProposals: [],
        loadingActiveProposals: false,
        activeProposalsError: action.result
      }
    case actionTypes.SET_SLASHING_ENDED_PROPOSALS:
      return {
        ...state,
        endedProposals: action.result,
        loadingEndedProposals: false
      }
    case actionTypes.SET_SLASHING_ENDED_PROPOSALS_LOADING:
      return {
        ...state,
        loadingEndedProposals: true
      }
    case actionTypes.SET_SLASHING_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        endedProposalsError: action.result
      }

    case actionTypes.GET_SLASHING_PROPOSAL:
      return {
        ...state,
        loadingProposals: true
      }
    case actionTypes.GET_SLASHING_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfExist(state.proposalsArr, action),
        loadingProposals: false
      }
    case actionTypes.GET_SLASHING_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false
      }
    case actionTypes.GET_SLASHING_EMPTY_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfEmptyResult(state.proposalsArr, action),
        loadingProposals: false
      }
    case actionTypes.GET_SLASHING_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfExist(state.endedProposals, action),
        loadingEndedProposals: false
      }
    case actionTypes.GET_SLASHING_EMPTY_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfEmptyResult(state.endedProposals, action),
        loadingEndedProposals: false
      }
    case actionTypes.GET_SLASHING_PROPOSAL_ENDED:
      return {
        ...state,
        loadingEndedProposals: true
      }
    case actionTypes.GET_SLASHING_PROPOSAL_ENDED_ERROR:
      return {
        ...state,
        endedProposals: [...state.endedProposals],
        loadingEndedProposals: false
      }
    case actionTypes.GET_ONE_SLASHING_PROPOSAL_SUCCESS:
      return {
        ...state,
        oneProposal: action.result,
        loadingProposals: false
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
