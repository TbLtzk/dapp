import * as actionTypes from './action-types'
import { changeProposalsArrIfExist, changeProposalsArrIfEmptyResult } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'

const initialState = {
  oneProposal: [],
  proposalsArr: [],
  loadingProposals: true,
  errorM: null,

  endedProposals: [],
  loadingEndedProposals: true,
  errorEnded: null,

  expertActiveProposalsCount: 0,
  expertEndedProposalsCount: 0,
  expertLoadingProposalsCount: true
}

export default function expertProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_EXPERT_ENDED_PROPOSALS_SUCCESS:
      return {
        ...state,
        endedProposals: action.result,
        loadingEndedProposals: false
      }
    case actionTypes.GET_EXPERT_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        errorEnded: action.result
      }
    case actionTypes.GET_EXPERT_PROPOSALS_LIST:
      return {
        ...state,
        loadingProposals: action.proposalStatusType === PROPOSAL_STATUS_TYPES.active ? true : state.loadingProposals,
        loadingEndedProposals:
          action.proposalStatusType === PROPOSAL_STATUS_TYPES.ended ? true : state.loadingEndedProposals
      }
    case actionTypes.GET_EXPERT_PROPOSALS_LIST_SUCCESS:
      return {
        ...state,
        proposalsArr: action.result,
        loadingProposals: false,
        errorM: null
      }
    case actionTypes.GET_EXPERT_PROPOSALS_LIST_ERROR:
      return {
        ...state,
        proposalsArr: [],
        loadingProposals: false,
        errorM: action.result
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
