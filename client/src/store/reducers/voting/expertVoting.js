import * as actionTypes from '../../actions/action-types/voting/expert-voting';

const initialState = {
  proposalsArr: [],
  loading: true,
  loadingProposals: true,
  errorM: null,
};

export default function expertVoting(state = initialState, action) {

  switch (action.type) {
    case actionTypes.GET_QEXPERT_PROPOSALS:
      return {
        ...state,
        loadingProposals: true
      };
    case actionTypes.GET_QEXPERT_PROPOSALS_SUCCESS:
      return {
        ...state,
        proposalsArr: action.result,
        loadingProposals: false
      };
    case actionTypes.GET_QEXPERT_PROPOSALS_ERROR:
      return {
        ...state,
        proposalsArr: [],
        loadingProposals: false,
        errorM: action.result
      };
    case actionTypes.GET_QEXPERT_PROPOSAL:
      return {
        ...state,
        loadingProposals: true
      };
    case actionTypes.GET_QEXPERT_PROPOSAL_SUCCESS:
      return {
        ...state,
        // proposalsArr: [...state.proposalsArr, ...action.result],
        proposalsArr: (() => {
          const findElem = state.proposalsArr?.find((element => {
            return element.id === action.result[0].id;
          }));
          if (findElem) {
            return state.proposalsArr?.map((element) => {
              if (element.id === action.result[0].id) {
                return { ...action.result[0] };
              } else {
                return { ...element };
              }
            });
          } else {
            return [...state.proposalsArr, ...action.result];
          }
        })(),
        loadingProposals: false
      };
    case actionTypes.GET_QEXPERT_PROPOSAL_ERROR:
      return {
        ...state,
        proposalsArr: [...state.proposalsArr],
        loadingProposals: false,
      };
    case actionTypes.GET_EMPTY_QEXPERT_PROPOSAL_SUCCESS:
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
    default:
      return state;
  }
}
