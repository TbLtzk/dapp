import * as types from './types';

export const getSlashingProposals = (): types.GetSlashingProposals => ({
  type: 'GET_SLASHING_PROPOSALS'
});

export const setSlashingProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
): types.SetSlashingProposals => ({
  type: 'SET_SLASHING_PROPOSALS',
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});

export const onEscrowCastObjection = (
  data: any,
  contractName: string,
  proposalId: string
): types.OnEscrowCastObjection => ({
  type: 'ESCROW_CAST_OBJECTION',
  data,
  contractName,
  proposalId
});

export const onEscrowProposeDecision = (
  data: any,
  contractName: string,
  proposalId: string
): types.OnEscrowProposeDecision => ({
  type: 'ESCROW_PROPOSE_DECISION',
  data,
  contractName,
  proposalId
});

export const onEscrowProposerRemark = (
  data: any,
  contractName: string,
  proposalId: string
): types.OnEscrowProposerRemark => ({
  type: 'ESCROW_PROPOSER_REMARK',
  data,
  contractName,
  proposalId
});

export const onEscrowRecallProposeDecision = (
  contractName: string,
  proposalId: string
): types.OnEscrowRecallProposeDecision => ({
  type: 'ESCROW_RECALL_PROPOSE_DECISION',
  contractName,
  proposalId
});

export const onEscrowConfirmDecision = (
  contractName: string,
  proposalId: string
): types.OnEscrowConfirmDecision => ({
  type: 'ESCROW_CONFIRM_DECISION',
  contractName,
  proposalId
});

export const setEscrowAction = (
  contractName: string,
  proposalId: string,
  escrowType: string
): types.SetEscrowAction => ({
  type: 'SET_ESCROW_ACTION',
  contractName,
  proposalId,
  escrowType
});

export const setPurgeSlashing = (
  slashingAddress: string,
  contractType: string
): types.SetPurgeSlashing => ({
  type: 'SET_PURGE_SLASHING',
  slashingAddress,
  contractType
});
