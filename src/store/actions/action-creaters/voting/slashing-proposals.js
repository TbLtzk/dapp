import * as actionTypes from 'store/actions/action-types/voting/slashing-proposals'

export const getSlashingProposalsList = () => ({
  type: actionTypes.GET_SLASHING_PROPOSALS_LIST
})

export const getSlashingProposalsListSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_PROPOSALS_LIST_SUCCESS,
  result
})

export const getSlashingProposalsListError = (result) => ({
  type: actionTypes.GET_SLASHING_PROPOSALS_LIST_ERROR,
  result
})

export const getProposalSlashing = (contractName, id, activeProposal) => ({
  type: actionTypes.GET_SLASHING_PROPOSAL,
  contractName,
  id,
  activeProposal
})

export const getProposalSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_PROPOSAL_SUCCESS,
  result
})
export const getEmptyProposalSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_EMPTY_PROPOSAL_SUCCESS,
  result
})

export const getProposalError = (result) => ({
  type: actionTypes.GET_SLASHING_PROPOSAL_ERROR,
  result
})

export const getSlashingProposalEnded = (result) => ({
  type: actionTypes.GET_SLASHING_PROPOSAL_ENDED,
  result
})
export const getProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_PROPOSAL_ENDED_SUCCESS,
  result
})
export const getEmptyProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_EMPTY_PROPOSAL_ENDED_SUCCESS,
  result
})

export const getProposalEndedError = (result) => ({
  type: actionTypes.GET_SLASHING_PROPOSAL_ENDED_ERROR,
  result
})

// escrow
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

export const getSlashingEndedProposals = () => ({
  type: actionTypes.GET_SLASHING_ENDED_PROPOSALS
})
export const getSlashingEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_SLASHING_ENDED_PROPOSALS_SUCCESS,
  result
})
export const getSlashingEndedProposalsError = (result) => ({
  type: actionTypes.GET_SLASHING_ENDED_PROPOSALS_ERROR,
  result
})

export const getOneProposalSuccess = (result) => ({
  type: actionTypes.GET_ONE_SLASHING_PROPOSAL_SUCCESS,
  result
})
