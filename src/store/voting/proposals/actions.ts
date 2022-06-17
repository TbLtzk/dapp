import {
  CreateProposal,
  ExecuteProposal,
  GetBaseVotingWeightInfo,
  GetConstitutionHash,
  GetConstitutionHashSuccess,
  GetNumberAllProposals,
  GetProposalsByType,
  SetBaseVotingWeightInfo,
  SetNewParameter,
  SetVoteDetails,
  VoteForProposal
} from './types';

export const createProposal = (proposal: any): CreateProposal => ({
  type: 'CREATE_PROPOSAL',
  proposal
});

export const setVoteDetails = (result: any): SetVoteDetails => ({
  type: 'SET_VOTE_DETAILS',
  result
});

export const voteForProposal = (data: any): VoteForProposal => ({
  type: 'VOTE_FOR_PROPOSAL',
  data
});

export const executeProposal = (data: any): ExecuteProposal => ({
  type: 'EXECUTE_PROPOSAL',
  data
});

export const getNumberAllProposals = (): GetNumberAllProposals => ({
  type: 'GET_NUMBER_ALL_ENDED_PROPOSALS'
});

export const getConstitutionHash = (): GetConstitutionHash => ({
  type: 'GET_CONSTITUTION_HASH'
});

export const getConstitutionHashSuccess = (result: any): GetConstitutionHashSuccess => ({
  type: 'GET_CONSTITUTION_HASH_SUCCESS',
  result
});

export const getBaseVotingWeightInfo = (): GetBaseVotingWeightInfo => ({
  type: 'GET_BASE_VOTING_WEIGHT_INFO'
});

export const setBaseVotingWeightInfo = (data: any): SetBaseVotingWeightInfo => ({
  type: 'SET_BASE_VOTING_WEIGHT_INFO',
  payload: data
});

export const getProposalsByType = (contractName: any): GetProposalsByType => ({
  type: 'GET_PROPOSALS_BY_TYPE',
  contractName
});

export const setNewParameter = (result: any): SetNewParameter => ({
  type: 'SET_NEW_PARAMETER',
  result
});
