import { BaseVotingWeightInfo } from '@q-dev/q-js-sdk';
import { ProposalEvent } from 'typings/contracts';
import { CreateProposalForm } from 'typings/forms';
import { Proposal, ProposalType, VotingType } from 'typings/proposals';

import * as types from './types';

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

export const createProposal = (form: CreateProposalForm): types.CreateProposal => ({
  type: 'CREATE_PROPOSAL',
  form
});

export const voteForProposal = (payload: {
  type: VotingType
  proposal: Proposal
  isVotedFor?: boolean
}): types.VoteForProposal => ({
  type: 'VOTE_FOR_PROPOSAL',
  payload
});

export const executeProposal = (proposal: Proposal): types.ExecuteProposal => ({
  type: 'EXECUTE_PROPOSAL',
  proposal
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

export const setBaseVotingWeightInfo = (data: BaseVotingWeightInfo): types.SetBaseVotingWeightInfo => ({
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
