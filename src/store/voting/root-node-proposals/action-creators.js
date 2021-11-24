import * as actionTypes from './action-types'

export const getRootProposalsCount = () => ({
  type: actionTypes.GET_ROOT_PROPOSALS_COUNT
})

export const setRootProposalsCount = (result) => ({
  type: actionTypes.SET_ROOT_PROPOSALS_COUNT,
  result
})

// proposals
export const getRootProposals = (proposalStatusType, range) => ({
  type: actionTypes.GET_ROOT_PROPOSALS,
  proposalStatusType,
  range
})

// active proposals
export const setRootActiveProposals = (result) => ({
  type: actionTypes.SET_ROOT_ACTIVE_PROPOSALS,
  result
})

export const setRootActiveProposalsError = (result) => ({
  type: actionTypes.SET_ROOT_ACTIVE_PROPOSALS_ERROR,
  result
})

export const setRootActiveProposalsLoading = (result) => ({
  type: actionTypes.SET_ROOT_ACTIVE_PROPOSALS_LOADING,
  result
})

// ended proposals

export const setRootEndedProposals = (result) => ({
  type: actionTypes.SET_ROOT_ENDED_PROPOSALS,
  result
})
export const setRootEndedProposalsError = (result) => ({
  type: actionTypes.SET_ROOT_ENDED_PROPOSALS_ERROR,
  result
})

export const setRootEndedProposalsLoading = (result) => ({
  type: actionTypes.SET_ROOT_ENDED_PROPOSALS_LOADING,
  result
})
/// //////////////////////////////////////////////////////////////////////////

export const getProposalRootNode = (contractName, id, activeProposal) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL,
  contractName,
  id,
  activeProposal
})

export const getProposalSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_SUCCESS,
  result
})
export const getEmptyProposalSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_SUCCESS,
  result
})

export const getProposalError = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_ERROR,
  result
})

export const getRootNodeProposalEnded = (result) => ({
  type: actionTypes.GET_ROOT_NODE_ENDED_PROPOSAL,
  result
})
export const getProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_SUCCESS,
  result
})
export const getEmptyProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_ROOT_NODE_EMPTY_PROPOSAL_ENDED_SUCCESS,
  result
})

export const getProposalEndedError = (result) => ({
  type: actionTypes.GET_ROOT_NODE_PROPOSAL_ENDED_ERROR,
  result
})

export const getOneProposalSuccess = (result) => ({
  type: actionTypes.GET_ONE_ROOT_NODE_PROPOSAL_SUCCESS,
  result
})
