import * as actionTypes from 'store/actions/action-types/voting/qproposals';

/* getQExpertProposals */
export const getQExpertProposals = (contracts) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS,
    contracts
});

export const getQExpertProposalsSuccess = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS_SUCCESS,
    result,
});

export const getQExpertProposalsError = (result) => ({
    type: actionTypes.GET_QEXPERT_PROPOSALS_ERROR,
    result,
});

/* create proposal staff */
export const setCreateProposalObj = (result) => ({
    type: actionTypes.SET_CREATED_PROPOSAL_OBJECT,
    result
});

export const setCreatedStepsLimit = (result) => ({
    type: actionTypes.SET_CREATED_STEPS_LIMIT,
    result
});

export const setStepCounter = (result) => ({
    type: actionTypes.SET_STEP_COUNTER,
    result
});

export const setDisabledCreatedProposalBtn = (result) => ({
    type: actionTypes.SET_DISABLED_CREATED_PROPOSAL_BTN,
    result
});

export const createProposal = (drizzle, data) => ({
    type: actionTypes.CREATE_PROPOSAL,
    drizzle,
    data
});

export const createProposalSuccess = (result) => ({
    type: actionTypes.CREATE_PROPOSAL_SUCCESS,
    result
});

/*vote proposal staff*/
export const setVoteProposalObj = (result) => ({
    type: actionTypes.SET_VOTE_PROPOSAL_OBJECT,
    result
});

export const setStepVoteCounter = (result) => ({
    type: actionTypes.SET_STEP_VOTE_COUNTER,
    result
});

export const voteForProposal = (drizzle, data) => ({
    type: actionTypes.VOTE_FOR_PROPOSAL,
    drizzle,
    data
});
