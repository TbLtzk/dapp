import * as actionTypes from "store/actions/action-types/voting/qproposals";

const initialState = {
    proposalsArr: [],
    loading: true,
    loadingProposals: true,
    errorM: null,
};

export default function qProposals(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_Q_PROPOSALS:
            return {
                ...state,
                loadingProposals: true
            };
        case actionTypes.GET_Q_PROPOSALS_SUCCESS:
            return {
                ...state,
                proposalsArr: action.result,
                loadingProposals: false
            };
        case actionTypes.GET_Q_PROPOSALS_ERROR:
            return {
                ...state,
                proposalsArr: [],
                loadingProposals: false,
                errorM: action.result
            };

        case actionTypes.GET_Q_PROPOSAL:
            return {
                ...state,
                loadingProposals: true
            };
        case actionTypes.GET_Q_PROPOSAL_SUCCESS:
            return {
                ...state,
                proposalsArr: [...state.proposalsArr, ...action.result],
                loadingProposals: false
            };
        case actionTypes.GET_Q_PROPOSAL_ERROR:
            return {
                ...state,
                proposalsArr: [...state.proposalsArr],
                loadingProposals: false,
            };
        default:
            return state;
    }
}
