import * as actionTypes from 'store/actions/action-types/voting/rootnodes-slashing-voting';

/* getValidatorsSlashingVotingProposals */
export const getRootNodesSlashingVotingProposals = (contract) => ({
    type: actionTypes.GET_ROOTNODES_SLASHING_VOTING_PROPOSALS,
    contract
});

export const getRootNodesSlashingVotingProposalsSuccess = (result) => ({
    type: actionTypes.GET_ROOTNODES_SLASHING_VOTING_PROPOSALS_SUCCESS,
    result,
});

export const getRootNodesSlashingVotingProposalsError = (result) => ({
    type: actionTypes.GET_ROOTNODES_SLASHING_VOTING_PROPOSALS_ERROR,
    result,
});

/* create proposal */
export const createProposal = (contract, remark, userAddress, anyAddress) => ({
    type: actionTypes.CREATE_ROOTNODES_SLASHING_VOTING_PROPOSAL,
    contract, remark, userAddress, anyAddress
});

export const createProposalSuccess = (result) => ({
    type: actionTypes.CREATE_ROOTNODES_SLASHING_VOTING_PROPOSAL_SUCCESS,
    result,
});

export const createProposalError = (result) => ({
    type: actionTypes.CREATE_ROOTNODES_SLASHING_VOTING_PROPOSAL_ERROR,
    result,
});
