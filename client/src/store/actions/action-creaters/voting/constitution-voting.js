import * as actionTypes from 'store/actions/action-types/voting/constitution-voting';

/* getConstitutionVotingProposals */
export const getConstitutionVotingProposals = (contract) => ({
    type: actionTypes.GET_CONSTITUTION_VOTING_PROPOSALS,
    contract
});

export const getConstitutionVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_CONSTITUTION_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getConstitutionVotingProposalsError = (result) => ({
    type: actionTypes.GET_CONSTITUTION_VOTING_PROPOSALS_ERROR,
    result,
});

/* create proposal */
export const createProposal = (contract, remark, userAddress, anyAddress) => ({
    type: actionTypes.CREATE_CONSTITUTION_VOTING_PROPOSAL,
    contract, remark, userAddress, anyAddress
});

export const createProposalSuccess = (result) => ({
    type: actionTypes.CREATE_CONSTITUTION_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const createProposalError = (result) => ({
    type: actionTypes.CREATE_CONSTITUTION_VOTING_PROPOSAL_ERROR,
    result,
});
