import * as actionTypes from 'store/actions/action-types/voting/roots-voting';

/* getRootsVotingProposals */
export const getRootsVotingProposals = (contract) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSALS,
    contract
});

export const getRootsVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getRootsVotingProposalsError = (result) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSALS_ERROR,
    result,
});

