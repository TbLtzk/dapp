import * as actionTypes from './action-types'

export const getSlashingProposals = () => ({
  type: actionTypes.GET_SLASHING_PROPOSALS
})

export const setSlashingProposals = (activeProposalsArray, endedProposalsArray, proposalsCounter) => ({
  type: actionTypes.SET_SLASHING_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
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
