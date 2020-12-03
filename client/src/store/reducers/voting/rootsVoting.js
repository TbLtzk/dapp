import * as actionTypes from "../../actions/action-types/voting/roots-voting";

const initialState = {
    proposalsArr: [],
    loading: true,
    loadingProposals: true,
    errorM: null,
};

export default function rootsVoting(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_ROOT_VOTING_PROPOSALS:
            return {
                ...state,
                loadingProposals: true
            };
        case actionTypes.GET_ROOT_VOTING_PROPOSALS_SUCCESS:
            return {
                ...state,
                proposalsArr: action.result,
                loadingProposals: false
            };
        case actionTypes.GET_ROOT_VOTING_PROPOSALS_ERROR:
            return {
                ...state,
                proposalsArr: [],
                loadingProposals: false,
                errorM: action.result
            };
        default:
            return state;
    }
}
