import * as actionTypes from 'store/actions/action-types/voting/slashing-voting';

export const getSlashingVotingProposals = (drizzle) => ({
  type: actionTypes.GET_SLASHING_VOTING_PROPOSALS,
  drizzle
});

export const getSlashingVotingProposalsSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_VOTING_PROPOSALS_SUCCESS,
  result,
});

export const getSlashingVotingProposalsError = (result) => ({
  type: actionTypes.GET_SLASHING_VOTING_PROPOSALS_ERROR,
  result,
});

export const getSlashingVotingProposal = (contractName, id, drizzle) => ({
  type: actionTypes.GET_SLASHING_VOTING_PROPOSAL,
  contractName,
  id,
  drizzle
});

export const getSlashingVotingProposalSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_VOTING_PROPOSAL_SUCCESS,
  result,
});

export const getSlashingVotingProposalError = (result) => ({
  type: actionTypes.GET_SLASHING_VOTING_PROPOSAL_ERROR,
  result,
});

