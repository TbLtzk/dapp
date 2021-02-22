import * as actionTypes from 'store/actions/action-types/voting/slashing-proposals';

const initialState = {
  proposalsArr: [],
  loading: true,
  loadingProposals: true,
  errorM: null,
  createProposalLoading: true,
  createProposalResult: null,
};

export default function slashingProposals(state = initialState, action) {

  switch (action.type) {
    case actionTypes.SET_VOTE_PROPOSAL_OBJECT:
      return {
        ...state,
        formObjectVoteProposal: action.result
      };
    case actionTypes.SET_STEP_VOTE_COUNTER:
      return {
        ...state,
        stepVoteCounter: action.result
      };
    case actionTypes.GET_ENDED_PROPOSALS:
      return {
        ...state,
        loadingEndedProposals: true,
      };
    case actionTypes.GET_ENDED_PROPOSALS_SUCCESS:
      return {
        ...state,
        endedProposals: action.result,
        loadingEndedProposals: false,
      };
    case actionTypes.GET_ENDED_PROPOSALS_ERROR:
      return {
        ...state,
        endedProposals: [],
        loadingEndedProposals: false,
        errorEnded: action.result,
      };
    case actionTypes.GET_PROPOSALS_LIST:
      return {
        ...state,
        loadingProposals: true,
      };
    case actionTypes.GET_PROPOSALS_LIST_SUCCESS:
      return {
        ...state,
        proposalsArr: action.result,
        loadingProposals: false,
        errorM: null,
      };
    case actionTypes.GET_PROPOSALS_LIST_ERROR:
      return {
        ...state,
        proposalsArr: [],
        loadingProposals: false,
        errorM: action.result,
      };
    case actionTypes.GET_PROPOSAL:
      return {
        ...state,
        loadingProposals: true
      };
    case actionTypes.GET_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: (() => {
          const findElem = state.proposalsArr?.find((element => {
            return element.id === action.result[0].id && element.contract === action.result[0].contract;
          }));
          if (findElem) {
            return state.proposalsArr?.map((element) => {
              if (element.id === action.result[0].id && element.contract === action.result[0].contract) {
                return { ...action.result[0] };
              } else {
                return { ...element };
              }
            });
          } else {
            return [...state.proposalsArr, ...action.result];
          }
        })(),
        // proposalsArr: [...state.proposalsArr, ...action.result],
        loadingProposals: false
      };
    case actionTypes.GET_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false,
      };
    case actionTypes.GET_EMPTY_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalsArr: (() => {
          const findElem = state.proposalsArr?.find((element => {
            return element.id === action.result;
          }));
          if (findElem) {
            return state.proposalsArr?.filter((element) => {
              if (element.id !== action.result) {
                return { ...element };
              }
            });
          }
        })(),
        loadingProposals: false,
      };
    case actionTypes.ESCROW_CAST_OBJECTION_SUCCESS:
      return {
        ...state,
        // activeTab: action.activeTab,
      };
    default:
      return state;
  }
}
