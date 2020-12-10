import * as actionTypes from 'store/actions/action-types/voting/EPDR-membership-voting';

/* getEPDRMembershipVotingProposals */
export const getEPDRMembershipVotingProposals = (contract) => ({
    type: actionTypes.GET_EPDR_MEMBERSHIP_VOTING_PROPOSALS,
    contract
});

export const getEPDRMembershipVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_EPDR_MEMBERSHIP_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getEPDRMembershipVotingProposalsError = (result) => ({
    type: actionTypes.GET_EPDR_MEMBERSHIP_VOTING_PROPOSALS_ERROR,
    result,
});

/* create proposal */
export const createProposal = (contract, remark, userAddress, anyAddress) => ({
    type: actionTypes.CREATE_EPDR_MEMBERSHIP_VOTING_PROPOSAL,
    contract, remark, userAddress, anyAddress
});

export const createProposalSuccess = (result) => ({
    type: actionTypes.CREATE_EPDR_MEMBERSHIP_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const createProposalError = (result) => ({
    type: actionTypes.CREATE_EPDR_MEMBERSHIP_VOTING_PROPOSAL_ERROR,
    result,
});
