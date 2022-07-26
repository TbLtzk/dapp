import { BaseVotingWeightInfo } from '@q-dev/q-js-sdk';
import { ContractType, ProposalEvent } from 'typings/contracts';
import { CreateProposalForm } from 'typings/forms';
import { Proposal, ProposalType, VotingType } from 'typings/proposals';

export interface GetProposals {
  type: 'GET_PROPOSALS'
  proposalType: ProposalType
}

export interface SetProposals {
  type: 'SET_PROPOSALS'
  proposalType: ProposalType
  proposals: ProposalEvent[]
  lastBlock: number
}

export interface SetMinimalActiveBlock {
  type: 'SET_MINIMAL_ACTIVE_BLOCK'
  block: number
}

export interface CreateProposal {
  type: 'CREATE_PROPOSAL'
  form: CreateProposalForm
}

export interface VoteForProposal {
  type: 'VOTE_FOR_PROPOSAL'
  payload: {
    proposal: Proposal
    type: VotingType
    isVotedFor?: boolean
  }
}

export interface ExecuteProposal {
  type: 'EXECUTE_PROPOSAL'
  proposal: Proposal
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
  payload: BaseVotingWeightInfo
}

export interface GetProposalsByType {
  type: 'GET_PROPOSALS_BY_TYPE'
  contractName: ContractType
}

export interface SetNewParameter {
  type: 'SET_NEW_PARAMETER'
  result: boolean
}

export type ProposalsAction =
  SetProposals |
  SetMinimalActiveBlock |
  GetConstitutionHashSuccess |
  SetBaseVotingWeightInfo |
  SetNewParameter
