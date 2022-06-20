import { ProposalEvent } from 'typings/contracts';

import * as types from './types';

import { ProposalType } from 'constants/statuses';

export const getProposals = (proposalType: ProposalType): types.GetProposals => ({
  type: 'GET_PROPOSALS',
  proposalType
});

export const setProposals = (
  proposalType: ProposalType,
  proposals: ProposalEvent[],
  lastBlock: number
): types.SetProposals => ({
  type: 'SET_PROPOSALS',
  proposalType,
  proposals,
  lastBlock
});

export const setMinimalActiveBlock = (block: number): types.SetMinimalActiveBlock => ({
  type: 'SET_MINIMAL_ACTIVE_BLOCK',
  block
});

export const createProposal = (proposal: any): types.CreateProposal => ({
  type: 'CREATE_PROPOSAL',
  proposal
});

export const setVoteDetails = (result: any): types.SetVoteDetails => ({
  type: 'SET_VOTE_DETAILS',
  result
});

export const voteForProposal = (data: any): types.VoteForProposal => ({
  type: 'VOTE_FOR_PROPOSAL',
  data
});

export const executeProposal = (data: any): types.ExecuteProposal => ({
  type: 'EXECUTE_PROPOSAL',
  data
});

export const getNumberAllProposals = (): types.GetNumberAllProposals => ({
  type: 'GET_NUMBER_ALL_ENDED_PROPOSALS'
});

export const getConstitutionHash = (): types.GetConstitutionHash => ({
  type: 'GET_CONSTITUTION_HASH'
});

export const getConstitutionHashSuccess = (result: any): types.GetConstitutionHashSuccess => ({
  type: 'GET_CONSTITUTION_HASH_SUCCESS',
  result
});

export const getBaseVotingWeightInfo = (): types.GetBaseVotingWeightInfo => ({
  type: 'GET_BASE_VOTING_WEIGHT_INFO'
});

export const setBaseVotingWeightInfo = (data: any): types.SetBaseVotingWeightInfo => ({
  type: 'SET_BASE_VOTING_WEIGHT_INFO',
  payload: data
});

export const getProposalsByType = (contractName: any): types.GetProposalsByType => ({
  type: 'GET_PROPOSALS_BY_TYPE',
  contractName
});

export const setNewParameter = (result: any): types.SetNewParameter => ({
  type: 'SET_NEW_PARAMETER',
  result
});
