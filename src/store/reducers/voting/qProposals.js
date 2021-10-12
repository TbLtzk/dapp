import * as actionTypes from 'store/actions/action-types/voting/q-proposals'
import { changeProposalsArrIfExist, changeProposalsArrIfEmptyResult } from 'contracts/handler/VotingHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'

const initialState = {
  oneProposal: [],
  proposalsArr: [],
  loadingProposals: true,
  errorM: null,

  endedProposals: [],
  loadingEndedProposals: true,
  errorEnded: null
}

export default function qProposals (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_Q_ENDED_PROPOSALS_SUCCESS:
      return {
        ...state,
        endedProposals: action.result,
        loadingEndedProposals: false,
        errorEnded: null
      }
    case actionTypes.GET_Q_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        errorEnded: action.result
      }
    case actionTypes.GET_Q_PROPOSALS_LIST:
      return {
        ...state,
        loadingProposals: action.proposalStatusType === PROPOSAL_STATUS_TYPES.active ? true : state.loadingProposals,
        loadingEndedProposals: action.proposalStatusType === PROPOSAL_STATUS_TYPES.ended ? true : state.loadingEndedProposals
      }
    case actionTypes.GET_Q_PROPOSALS_LIST_SUCCESS:
      const proposalsArr = {}
      proposalsArr[action.result.type] = action.result.data
      return {
        ...state,
        proposalsArr: action.result,
        loadingProposals: false,
        errorM: null
      }
    case actionTypes.GET_Q_PROPOSALS_LIST_ERROR:
      return {
        ...state,
        proposalsArr: [],
        loadingProposals: false,
        errorM: action.result
      }
    case actionTypes.GET_Q_PROPOSAL:
      return {
        ...state,
        loadingProposals: true
      }
    case actionTypes.GET_Q_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfExist(state.proposalsArr, action),
        loadingProposals: false
      }

    case actionTypes.GET_Q_ONE_PROPOSAL_SUCCESS:
      return {
        ...state,
        oneProposal: action.result,
        loadingProposals: false
      }
    case actionTypes.GET_Q_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfExist(state.endedProposals, action),
        // proposalsArr: [...state.proposalsArr, ...action.result],
        loadingEndedProposals: false
      }
    case actionTypes.GET_Q_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false
      }
    case actionTypes.GET_Q_EMPTY_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfEmptyResult(state.proposalsArr, action),
        loadingProposals: false
      }
    case actionTypes.GET_Q_EMPTY_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfEmptyResult(state.endedProposals, action),
        loadingEndedProposals: false
      }
    case actionTypes.GET_Q_PROPOSAL_ENDED:
      return {
        ...state,
        loadingEndedProposals: true
      }
    case actionTypes.GET_Q_PROPOSAL_ENDED_ERROR:
      return {
        ...state,
        endedProposals: [...state.endedProposals],
        loadingEndedProposals: false
      }
    default:
      return state
  }
}
