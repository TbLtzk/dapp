import { ProposalEvent } from 'typings/contracts';

import { ProposalType } from 'constants/statuses';

export interface GetProposals {
  type: 'GET_PROPOSALS'
  proposalType: ProposalType
}

export interface SetProposals {
  type: 'SET_PROPOSALS'
  proposalType: ProposalType
  proposals: ProposalEvent[]
}

export interface CreateProposal {
  type: 'CREATE_PROPOSAL'
  proposal: any
}

export interface SetVoteDetails {
  type: 'SET_VOTE_DETAILS'
  result: { contract: string, proposalId: string }
}

export interface VoteForProposal {
  type: 'VOTE_FOR_PROPOSAL'
  data: any
}

export interface ExecuteProposal {
  type: 'EXECUTE_PROPOSAL'
  data: any
}

export interface GetNumberAllProposals {
  type: 'GET_NUMBER_ALL_ENDED_PROPOSALS'
}

export interface GetConstitutionHash {
  type: 'GET_CONSTITUTION_HASH'
}

export interface GetConstitutionHashSuccess {
  type: 'GET_CONSTITUTION_HASH_SUCCESS'
  result: string
}

export interface GetBaseVotingWeightInfo {
  type: 'GET_BASE_VOTING_WEIGHT_INFO'
}

export interface SetBaseVotingWeightInfo {
  type: 'SET_BASE_VOTING_WEIGHT_INFO'
  payload: Record<string, unknown>
}

export interface GetProposalsByType {
  type: 'GET_PROPOSALS_BY_TYPE'
  contractName: any
}

export interface SetNewParameter {
  type: 'SET_NEW_PARAMETER'
  result: boolean
}

export type ProposalsAction =
  GetProposals |
  SetProposals |
  CreateProposal |
  SetVoteDetails |
  VoteForProposal |
  ExecuteProposal |
  GetNumberAllProposals |
  GetConstitutionHash |
  GetConstitutionHashSuccess |
  GetBaseVotingWeightInfo |
  SetBaseVotingWeightInfo |
  GetProposalsByType |
  SetNewParameter
