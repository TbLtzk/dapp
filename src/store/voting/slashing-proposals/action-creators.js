import * as actionTypes from './action-types'

export const getSlashingProposalsCount = () => ({
  type: actionTypes.GET_SLASHING_PROPOSALS_COUNT
})

export const setSlashingProposalsCount = (result) => ({
  type: actionTypes.SET_SLASHING_PROPOSALS_COUNT,
  result
})

export const getSlashingProposals = (proposalStatusType, range) => ({
  type: actionTypes.GET_SLASHING_PROPOSALS,
  proposalStatusType,
  range
})

export const setSlashingActiveProposals = (result) => ({
  type: actionTypes.SET_SLASHING_ACTIVE_PROPOSALS,
  result
})

export const setSlashingEndedProposals = (result) => ({
  type: actionTypes.SET_SLASHING_ENDED_PROPOSALS,
  result
})

export const onEscrowCastObjection = (data, contractName, proposalId) => ({
  type: actionTypes.ESCROW_CAST_OBJECTION,
  data,
  contractName,
  proposalId
})

export const onEscrowProposeDecision = (data, contractName, proposalId) => ({
  type: actionTypes.ESCROW_PROPOSE_DECISION,
  data,
  contractName,
  proposalId
})

export const onEscrowProposerRemark = (data, contractName, proposalId) => ({
  type: actionTypes.ESCROW_PROPOSER_REMARK,
  data,
  contractName,
  proposalId
})

export const onEscrowRecallProposeDecision = (contractName, proposalId) => ({
  type: actionTypes.ESCROW_RECALL_PROPOSE_DECISION,
  contractName,
  proposalId
})
export const onEscrowConfirmDecision = (contractName, proposalId) => ({
  type: actionTypes.ESCROW_CONFIRM_DECISION,
  contractName,
  proposalId
})
