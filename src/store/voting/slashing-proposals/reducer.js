import * as actionTypes from './action-types'
import { changeProposalsArrIfExist, changeProposalsArrIfEmptyResult } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { PROPOSAL_STATUS_TYPES } from '../../../constants/statuses'
import { mergeArrays } from 'func/useful'

const initialState = {
  oneProposal: [],
  proposalsArr: [],
  loadingProposals: true,
  errorM: null,

  endedProposals: [],
  loadingEndedProposals: true,
  errorEnded: null,

  slashingActiveProposalsCount: 0,
  slashingEndedProposalsCount: 0,
  slashingLoadingProposalsCount: true
}

export default function slashingProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SLASHING_ENDED_PROPOSALS_SUCCESS:
      return {
        ...state,
        endedProposals: mergeArrays(state.endedProposals, action.result.endedProposals, action.result.reset),
        loadingEndedProposals: action.result.loading,
        errorEnded: null
      }
    case actionTypes.GET_SLASHING_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        errorEnded: action.result
      }
    case actionTypes.GET_SLASHING_PROPOSALS_LIST:
      return {
        ...state,
        loadingProposals: action.proposalStatusType === PROPOSAL_STATUS_TYPES.active ? true : state.loadingProposals,
        loadingEndedProposals:
          action.proposalStatusType === PROPOSAL_STATUS_TYPES.ended ? true : state.loadingEndedProposals
      }
    case actionTypes.GET_SLASHING_PROPOSALS_LIST_SUCCESS:
      return {
        ...state,
        proposalsArr: mergeArrays(state.proposalsArr, action.result.proposalsArr, action.result.loading),
        loadingProposals: action.result.loading,
        errorM: null
      }
    case actionTypes.GET_SLASHING_PROPOSALS_LIST_ERROR:
      return {
        ...state,
        proposalsArr: [],
        loadingProposals: false,
        errorM: action.result
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
