import * as actionTypes from './action-types'

export const getExpertProposalsCount = () => ({
  type: actionTypes.GET_EXPERT_PROPOSALS_COUNT
})

export const setExpertProposalsCount = (result) => ({
  type: actionTypes.SET_EXPERT_PROPOSALS_COUNT,
  result
})

// proposals
export const getExpertProposals = (proposalStatusType, range) => ({
  type: actionTypes.GET_EXPERT_PROPOSALS,
  proposalStatusType,
  range
})

// active proposals
export const setExpertActiveProposals = (result) => ({
  type: actionTypes.SET_EXPERT_ACTIVE_PROPOSALS,
  result
})

export const setExpertActiveProposalsError = (result) => ({
  type: actionTypes.SET_EXPERT_ACTIVE_PROPOSALS_ERROR,
  result
})

export const setExpertActiveProposalsLoading = (result) => ({
  type: actionTypes.SET_EXPERT_ACTIVE_PROPOSALS_LOADING,
  result
})

// ended proposals

export const setExpertEndedProposals = (result) => ({
  type: actionTypes.SET_EXPERT_ENDED_PROPOSALS,
  result
})
export const setExpertEndedProposalsError = (result) => ({
  type: actionTypes.SET_EXPERT_ENDED_PROPOSALS_ERROR,
  result
})

export const setExpertEndedProposalsLoading = (result) => ({
  type: actionTypes.SET_EXPERT_ENDED_PROPOSALS_LOADING,
  result
})
/// //////////////////////////////////////////////////////////////////////////

export const getProposalExpert = (contractName, id, activeProposal) => ({
  type: actionTypes.GET_EXPERT_PROPOSAL,
  contractName,
  id,
  activeProposal
})

export const getProposalSuccess = (result) => ({
  type: actionTypes.GET_EXPERT_PROPOSAL_SUCCESS,
  result
})
export const getEmptyProposalSuccess = (result) => ({
  type: actionTypes.GET_EXPERT_EMPTY_PROPOSAL_SUCCESS,
  result
})

export const getProposalError = (result) => ({
  type: actionTypes.GET_EXPERT_PROPOSAL_ERROR,
  result
})

export const getExpertProposalEnded = () => ({
  type: actionTypes.GET_EXPERT_PROPOSAL_ENDED
})
export const getProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_EXPERT_PROPOSAL_ENDED_SUCCESS,
  result
})
export const getEmptyProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_EXPERT_EMPTY_PROPOSAL_ENDED_SUCCESS,
  result
})

export const getProposalEndedError = (result) => ({
  type: actionTypes.GET_EXPERT_PROPOSAL_ENDED_ERROR,
  result
})

export const getOneProposalSuccess = (result) => ({
  type: actionTypes.GET_ONE_EXPERT_PROPOSAL_SUCCESS,
  result
})
