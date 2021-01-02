import * as actionTypes from "store/actions/action-types/voting/proposals";

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

    endedProposals: [],
    loadingEndedProposals: true,
    errorEnded: null,
};

export default function proposals(state = initialState, action) {

    switch (action.type) {
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
        default:
            return state;
    }
}
