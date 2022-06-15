import * as actionTypes from './action-types';

/* create proposal staff */
export const createProposal = (proposal) => ({
  type: actionTypes.CREATE_PROPOSAL,
  proposal
});

/* vote proposal staff */
export const setVoteDetails = (result) => ({
  type: actionTypes.SET_VOTE_DETAILS,
  result
});

export const voteForProposal = (data) => ({
  type: actionTypes.VOTE_FOR_PROPOSAL,
  data
});

export const executeProposal = (data) => ({
  type: actionTypes.EXECUTE_PROPOSAL,
  data
});

// dashboard
export const getNumberAllProposals = () => ({
  type: actionTypes.GET_NUMBER_ALL_PROPOSALS
});

export const getConstitutionHash = () => ({
  type: actionTypes.GET_CONSTITUTION_HASH
});

export const getConstitutionHashSuccess = (result) => ({
  type: actionTypes.GET_CONSTITUTION_HASH_SUCCESS,
  result
});

export const getBaseVotingWeightInfo = () => ({
  type: actionTypes.GET_BASE_VOTING_WEIGHT_INFO
});

export const setBaseVotingWeightInfo = (data) => ({
  type: actionTypes.SET_BASE_VOTING_WEIGHT_INFO,
  payload: data
});

export const getProposalsByType = (contractName) => ({
  type: actionTypes.GET_PROPOSALS_BY_TYPE,
  contractName
});

export const setNewParameter = (result) => ({
  type: actionTypes.SET_NEW_PARAMETER,
  result
});
