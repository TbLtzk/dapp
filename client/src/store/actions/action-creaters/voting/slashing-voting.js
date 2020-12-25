import * as actionTypes from 'store/actions/action-types/voting/slashing-voting';

export const getSlashingVotingProposals = (contract) => ({
    type: actionTypes.GET_SLASHING_VOTING_PROPOSALS,
    contract
});

export const getSlashingVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_SLASHING_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getSlashingVotingProposalsError = (result) => ({
    type: actionTypes.GET_SLASHING_VOTING_PROPOSALS_ERROR,
    result,
});


export const getSlashingVotingProposal = (contract, id) => ({
    type: actionTypes.GET_SLASHING_VOTING_PROPOSAL,
    contract,
    id
});

export const getSlashingVotingProposalSuccess = (result) => ({
    type: actionTypes.GET_SLASHING_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const getSlashingVotingProposalError = (result) => ({
    type: actionTypes.GET_SLASHING_VOTING_PROPOSAL_ERROR,
    result,
});

