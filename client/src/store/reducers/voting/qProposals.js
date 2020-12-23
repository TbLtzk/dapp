import * as actionTypes from "../../actions/action-types/voting/qproposals";

const initialState = {
    proposalsArr: [],
    loading: true,
    loadingProposals: true,
    errorM: null,
    createProposalLoading: true,
    createProposalResult: null,

    formObjectCreateProposal: {},
    createdStepsLimit: 4,
    stepCounter: 1,
    disabledContinueBtn: true,

    formObjectVoteProposal: {},
    stepVoteCounter: 1,
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
        case actionTypes.SET_CREATED_STEPS_LIMIT:
            return {
                ...state,
                createdStepsLimit: action.result
            };
        case actionTypes.SET_STEP_COUNTER:
            return {
                ...state,
                stepCounter: action.result
            };
        case actionTypes.SET_DISABLED_CREATED_PROPOSAL_BTN:
            return {
                ...state,
                disabledContinueBtn: action.result
            };
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
        default:
            return state;
    }
}
