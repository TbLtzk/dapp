import * as actionTypes from "../../actions/action-types/voting/qproposals";

const initialState = {
    proposalsArr: [],
    loading: true,
    loadingProposals: true,
    errorM: null,
    createProposalLoading: true,
    createProposalResult: null,
    formObjectCreateProposal: {}
};

export default function qProposals(state = initialState, action) {

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
        case actionTypes.SET_CREATED_PROPOSAL_OBJECT:
            return {
                ...state,
                formObjectCreateProposal: action.result
            };
        default:
            return state;
    }
}
