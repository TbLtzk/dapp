import * as actionTypes from "../../actions/action-types/voting/slashing-voting";

const initialState = {
    proposalsArr: [],
    loading: true,
    loadingProposals: true,
    errorM: null,
};

export default function slashingVoting(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_SLASHING_VOTING_PROPOSALS:
            return {
                ...state,
                loadingProposals: true
            };
        case actionTypes.GET_SLASHING_VOTING_PROPOSALS_SUCCESS:
            return {
                ...state,
                proposalsArr: action.result,
                loadingProposals: false
            };
        case actionTypes.GET_SLASHING_VOTING_PROPOSALS_ERROR:
            return {
                ...state,
                proposalsArr: [],
                loadingProposals: false,
                errorM: action.result
            };
        case actionTypes.GET_SLASHING_VOTING_PROPOSAL:
            return {
                ...state,
                loadingProposals: true
            };
        case actionTypes.GET_SLASHING_VOTING_PROPOSAL_SUCCESS:
            return {
                ...state,
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
                // proposalsArr: [...state.proposalsArr, ...action.result],
                loadingProposals: false
            };
        case actionTypes.GET_SLASHING_VOTING_PROPOSAL_ERROR:
            return {
                ...state,
                proposalsArr: [...state.proposalsArr],
                loadingProposals: false,
            };
        default:
            return state;
    }
}
