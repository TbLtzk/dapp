/* eslint-disable */
import * as actionTypes from "./action-types";
import {
  changeProposalsArrIfExist,
  changeProposalsArrIfEmptyResult,
} from "contracts/helpers/voting-helpers/base-voting-helper";

const initialState = {
  oneProposal: [],

  activeProposals: [],
  loadingActiveProposals: true,
  activeProposalsError: null,

  endedProposals: [],
  loadingEndedProposals: true,
  endedProposalsError: null,

  qActiveProposalsCount: 0,
  qEndedProposalsCount: 0,
  qLoadingProposalsCount: true,
};

export default function qProposals(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_Q_ACTIVE_PROPOSALS:
      return {
        ...state,
        activeProposals: action.result.reset ? [] : [...state.activeProposals, ...action.result],
        loadingActiveProposals: false,
      };
    case actionTypes.SET_Q_ACTIVE_PROPOSALS_LOADING:
      return {
        ...state,
        loadingActiveProposals: true,
      };
    case actionTypes.SET_Q_ACTIVE_PROPOSALS_ERROR:
      return {
        ...state,
        activeProposals: [],
        loadingActiveProposals: false,
        activeProposalsError: action.result,
      };
    case actionTypes.SET_Q_ENDED_PROPOSALS:
      return {
        ...state,
        endedProposals: [...state.endedProposals, ...action.result],
        loadingEndedProposals: false,
      };
    case actionTypes.SET_Q_ENDED_PROPOSALS_LOADING:
      return {
        ...state,
        loadingEndedProposals: true,
      };
    case actionTypes.SET_Q_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        endedProposalsError: action.result,
      };
    case actionTypes.GET_Q_PROPOSAL:
      return {
        ...state,
        loadingProposals: true,
      };
    case actionTypes.GET_Q_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfExist(state.proposalsArr, action),
        loadingProposals: false,
      };

    case actionTypes.GET_Q_ONE_PROPOSAL_SUCCESS:
      return {
        ...state,
        oneProposal: action.result,
        loadingProposals: false,
      };
    case actionTypes.GET_Q_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfExist(state.endedProposals, action),
        // proposalsArr: [...state.proposalsArr, ...action.result],
        loadingEndedProposals: false,
      };
    case actionTypes.GET_Q_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false,
      };
    case actionTypes.GET_Q_EMPTY_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: changeProposalsArrIfEmptyResult(state.proposalsArr, action),
        loadingProposals: false,
      };
    case actionTypes.GET_Q_EMPTY_PROPOSAL_ENDED_SUCCESS:
      return {
        ...state,
        endedProposals: changeProposalsArrIfEmptyResult(state.endedProposals, action),
        loadingEndedProposals: false,
      };
    case actionTypes.GET_Q_PROPOSAL_ENDED:
      return {
        ...state,
        loadingEndedProposals: true,
      };
    case actionTypes.GET_Q_PROPOSAL_ENDED_ERROR:
      return {
        ...state,
        endedProposals: [...state.endedProposals],
        loadingEndedProposals: false,
      };
    case actionTypes.SET_Q_PROPOSALS_COUNT: {
      return {
        ...state,
        qEndedProposalsCount: action.result.ended,
        qActiveProposalsCount: action.result.active,
        qLoadingProposalsCount: false,
      };
    }
    default:
      return state;
  }
}
