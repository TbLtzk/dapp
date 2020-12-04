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

/* create proposal */
export const createProposal = (contract, remark, userAddress, anyAddress) => ({
    type: actionTypes.CREATE_ROOT_VOTING_PROPOSAL,
    contract, remark, userAddress, anyAddress
});

export const createProposalSuccess = (result) => ({
    type: actionTypes.CREATE_ROOT_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const createProposalError = (result) => ({
    type: actionTypes.CREATE_ROOT_VOTING_PROPOSAL_ERROR,
    result,
});
