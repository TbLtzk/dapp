import * as actionTypes from 'store/actions/action-types/voting/EPQFI-membership-voting';

/* getEPQFIMembershipVotingProposals */
export const getEPQFIMembershipVotingProposals = (contract) => ({
    type: actionTypes.GET_EPQFI_MEMBERSHIP_VOTING_PROPOSALS,
    contract
});

export const getEPQFIMembershipVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_EPQFI_MEMBERSHIP_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getEPQFIMembershipVotingProposalsError = (result) => ({
    type: actionTypes.GET_EPQFI_MEMBERSHIP_VOTING_PROPOSALS_ERROR,
    result,
});

/* create proposal */
export const createProposal = (contract, remark, userAddress, anyAddress) => ({
    type: actionTypes.CREATE_EPQFI_MEMBERSHIP_VOTING_PROPOSAL,
    contract, remark, userAddress, anyAddress
});

export const createProposalSuccess = (result) => ({
    type: actionTypes.CREATE_EPQFI_MEMBERSHIP_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const createProposalError = (result) => ({
    type: actionTypes.CREATE_EPQFI_MEMBERSHIP_VOTING_PROPOSAL_ERROR,
    result,
});
