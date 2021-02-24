import * as actionTypes from 'store/actions/action-types/voting/root-node-proposals';
import { changeProposalsArrIfExist, changeProposalsArrIfEmptyResult } from 'contracts/handler/VotingHandler';

const initialState = {
  proposalsArr: [],
  loadingProposals: true,
  errorM: null,

  endedProposals: [],
  loadingEndedProposals: true,
  errorEnded: null,
};

export default function rootNodeProposals(state = initialState, action) {

  switch (action.type) {
    case actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS:
      return {
        ...state,
        loadingEndedProposals: true,
      };
    case actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS_SUCCESS:
      return {
        ...state,
        endedProposals: action.result,
        loadingEndedProposals: false,
      };
    case actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        errorEnded: action.result,
      };
    case actionTypes.GET_ROOT_NODE_PROPOSALS_LIST:
      return {
        ...state,
        loadingProposals: true,
      };
    case actionTypes.GET_ROOT_NODE_PROPOSALS_LIST_SUCCESS:
      return {
        ...state,
        proposalsArr: action.result,
        loadingProposals: false,
        errorM: null,
      };
    case actionTypes.GET_ROOT_NODE_PROPOSALS_LIST_ERROR:
      return {
        ...state,
        proposalsArr: [],
        loadingProposals: false,
        errorM: action.result,
      };
    case actionTypes.GET_ROOT_NODE_PROPOSAL:
      return {
        ...state,
        loadingProposals: true
      };
    case actionTypes.GET_ROOT_NODE_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfExist(state.proposalsArr, action),
        loadingProposals: false
      };
    case actionTypes.GET_ROOT_NODE_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false,
      };
    case actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfEmptyResult(state.proposalsArr, action),
        loadingProposals: false,
      };
    case actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfExist(state.endedProposals, action),
        loadingEndedProposals: false
      };
    case actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfEmptyResult(state.endedProposals, action),
        loadingEndedProposals: false,
      };
    case actionTypes.GET_ROOT_NODE_ENDED_PROPOSAL:
      return {
        ...state,
        loadingEndedProposals: true
      };
    case actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_ERROR:
      return {
        ...state,
        endedProposals: [...state.endedProposals],
        loadingEndedProposals: false,
      };
    default:
      return state;
  }
}
