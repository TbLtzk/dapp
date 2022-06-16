import * as actionTypes from './action-types';

export const getSlashingProposals = () => ({
  type: actionTypes.GET_SLASHING_PROPOSALS
});

export const setSlashingProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
) => ({
  type: actionTypes.SET_SLASHING_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});

export const onEscrowCastObjection = (
  data: any,
  contractName: string,
  proposalId: string
) => ({
  type: actionTypes.ESCROW_CAST_OBJECTION,
  data,
  contractName,
  proposalId
});

export const onEscrowProposeDecision = (
  data: any,
  contractName: string,
  proposalId: string
) => ({
  type: actionTypes.ESCROW_PROPOSE_DECISION,
  data,
  contractName,
  proposalId
});

export const onEscrowProposerRemark = (
  data: any,
  contractName: string,
  proposalId: string
) => ({
  type: actionTypes.ESCROW_PROPOSER_REMARK,
  data,
  contractName,
  proposalId
});

export const onEscrowRecallProposeDecision = (
  contractName: string,
  proposalId: string
) => ({
  type: actionTypes.ESCROW_RECALL_PROPOSE_DECISION,
  contractName,
  proposalId
});

export const onEscrowConfirmDecision = (
  contractName: string,
  proposalId: string
) => ({
  type: actionTypes.ESCROW_CONFIRM_DECISION,
  contractName,
  proposalId
});

export const setEscrowAction = (
  contractName: string,
  proposalId: string,
  escrowType: string
) => ({
  type: actionTypes.SET_ESCROW_ACTION,
  contractName,
  proposalId,
  escrowType
});

export const setPurgeSlashing = (
  slashingAddress: string,
  contractType: string
) => ({
  type: actionTypes.SET_PURGE_SLASHING,
  slashingAddress,
  contractType
});

export type SlashingProposalsAction = ReturnType<typeof setSlashingProposals>
