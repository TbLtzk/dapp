import * as actionTypes from 'store/actions/action-types/voting/roots-voting';

export const getRootsVotingProposals = (drizzle) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSALS,
    drizzle
});

export const getRootsVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getRootsVotingProposalsError = (result) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSALS_ERROR,
    result,
});

export const getRootsVotingProposal = (contractName, id, drizzle) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSAL,
    contractName,
    id,
    drizzle
});

export const getRootsVotingProposalSuccess = (result) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const getRootsVotingProposalError = (result) => ({
    type: actionTypes.GET_ROOT_VOTING_PROPOSAL_ERROR,
    result,
});
