import * as actionTypes from 'store/actions/action-types/voting/validators-slashing-voting';

/* getValidatorsSlashingVotingProposals */
export const getValidatorsSlashingVotingProposals = (contract) => ({
    type: actionTypes.GET_VALIDATORS_SLASHING_VOTING_PROPOSALS,
    contract
});

export const getValidatorsSlashingVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_VALIDATORS_SLASHING_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getValidatorsSlashingVotingProposalsError = (result) => ({
    type: actionTypes.GET_VALIDATORS_SLASHING_VOTING_PROPOSALS_ERROR,
    result,
});

/* create proposal */
export const createProposal = (contract, remark, userAddress, anyAddress) => ({
    type: actionTypes.CREATE_VALIDATORS_SLASHING_VOTING_PROPOSAL,
    contract, remark, userAddress, anyAddress
});

export const createProposalSuccess = (result) => ({
    type: actionTypes.CREATE_VALIDATORS_SLASHING_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const createProposalError = (result) => ({
    type: actionTypes.CREATE_VALIDATORS_SLASHING_VOTING_PROPOSAL_ERROR,
    result,
});
