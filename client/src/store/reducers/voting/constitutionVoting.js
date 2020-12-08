import * as actionTypes from "../../actions/action-types/voting/constitution-voting";

const initialState = {
    proposalsArr: [],
    loading: true,
    loadingProposals: true,
    errorM: null,
    createProposalLoading: true,
    createProposalResult: null,

};

export default function constitutionVoting(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_CONSTITUTION_VOTING_PROPOSALS:
            return {
                ...state,
                loadingProposals: true
            };
        case actionTypes.GET_CONSTITUTION_VOTING_PROPOSALS_SUCCESS:
            return {
                ...state,
                proposalsArr: action.result,
                loadingProposals: false
            };
        case actionTypes.GET_CONSTITUTION_VOTING_PROPOSALS_ERROR:
            return {
                ...state,
                proposalsArr: [],
                loadingProposals: false,
                errorM: action.result
            };

        case actionTypes.CREATE_CONSTITUTION_VOTING_PROPOSAL:
            return {
                ...state,
                createProposalLoading: true
            };
        case actionTypes.CREATE_CONSTITUTION_VOTING_PROPOSAL_SUCCESS:
            return {
                ...state,
                createProposalLoading: false,
                createProposalResult: true,
            };
        case actionTypes.CREATE_CONSTITUTION_VOTING_PROPOSAL_ERROR:
            return {
                ...state,
                createProposalLoading: false,
                createProposalResult: action.result,
            };
        default:
            return state;
    }
}
