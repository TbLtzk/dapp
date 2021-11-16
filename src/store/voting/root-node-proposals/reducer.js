import * as actionTypes from './action-types'
import { changeProposalsArrIfExist, changeProposalsArrIfEmptyResult } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { removeCurrentProposals } from 'func/useful'

const initialState = {
  oneProposal: [],
  proposalsArr: [],
  loadingProposals: true,
  errorM: null,

  endedProposals: [],
  loadingEndedProposals: true,
  errorEnded: null,

  rootActiveProposalsCount: 0,
  rootEndedProposalsCount: 0,
  rootLoadingProposalsCount: true
}

export default function rootNodeProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS_SUCCESS:
      return {
        ...state,
        endedProposals: removeCurrentProposals(state.endedProposals, action.result.endedProposals, action.result.reset),
        loadingEndedProposals: action.result.loading
      }
    case actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        errorEnded: action.result
      }
    case actionTypes.GET_ROOT_NODE_PROPOSALS_LIST:
      return {
        ...state,
        loadingProposals: action.proposalStatusType === PROPOSAL_STATUS_TYPES.active ? true : state.loadingProposals,
        loadingEndedProposals:
          action.proposalStatusType === PROPOSAL_STATUS_TYPES.ended ? true : state.loadingEndedProposals
      }
    case actionTypes.GET_ROOT_NODE_PROPOSALS_LIST_SUCCESS:
      return {
        ...state,
        proposalsArr: removeCurrentProposals(state.proposalsArr, action.result.proposalsArr, action.result.loading),
        loadingProposals: action.result.loading,
        errorM: null
      }
    case actionTypes.GET_ROOT_NODE_PROPOSALS_LIST_ERROR:
      return {
        ...state,
        proposalsArr: [],
        loadingProposals: false,
        errorM: action.result
      }
    case actionTypes.GET_ROOT_NODE_PROPOSAL:
      return {
        ...state,
        loadingProposals: true
      }
    case actionTypes.GET_ROOT_NODE_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfExist(state.proposalsArr, action),
        loadingProposals: false
      }
    case actionTypes.GET_ROOT_NODE_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false
      }
    case actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfEmptyResult(state.proposalsArr, action),
        loadingProposals: false
      }
    case actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfExist(state.endedProposals, action),
        loadingEndedProposals: false
      }
    case actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfEmptyResult(state.endedProposals, action),
        loadingEndedProposals: false
      }
    case actionTypes.GET_ROOT_NODE_ENDED_PROPOSAL:
      return {
        ...state,
        loadingEndedProposals: true
      }
    case actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_ERROR:
      return {
        ...state,
        endedProposals: [...state.endedProposals],
        loadingEndedProposals: false
      }
    case actionTypes.GET_ONE_ROOT_NODE_PROPOSAL_SUCCESS:
      return {
        ...state,
        oneProposal: action.result,
        loadingProposals: false
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
