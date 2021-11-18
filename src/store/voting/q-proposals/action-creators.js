import * as actionTypes from './action-types'

export const getQProposalsCount = () => ({
  type: actionTypes.GET_Q_PROPOSALS_COUNT
})

export const setQProposalsCount = (result) => ({
  type: actionTypes.SET_Q_PROPOSALS_COUNT,
  result
})

export const getProposalQ = (contractName, id, activeProposal) => ({
  type: actionTypes.GET_Q_PROPOSAL,
  contractName,
  id,
  activeProposal
})

export const getProposalSuccess = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_SUCCESS,
  result
})
export const getOneProposalSuccess = (result) => ({
  type: actionTypes.GET_Q_ONE_PROPOSAL_SUCCESS,
  result
})
export const getEmptyProposalSuccess = (result) => ({
  type: actionTypes.GET_Q_EMPTY_PROPOSAL_SUCCESS,
  result
})

export const getProposalError = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_ERROR,
  result
})

export const getQProposalEnded = () => ({
  type: actionTypes.GET_Q_PROPOSAL_ENDED
})
export const getProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_ENDED_SUCCESS,
  result
})
export const getEmptyProposalEndedSuccess = (result) => ({
  type: actionTypes.GET_Q_EMPTY_PROPOSAL_ENDED_SUCCESS,
  result
})

export const getProposalEndedError = (result) => ({
  type: actionTypes.GET_Q_PROPOSAL_ENDED_ERROR,
  result
})

// proposals
export const getQProposalsList = (proposalStatusType, blocksRange) => ({
  type: actionTypes.GET_Q_PROPOSALS_LIST,
  proposalStatusType,
  blocksRange
})

// active proposals
export const setQProposalsList = (result) => ({
  type: actionTypes.SET_Q_PROPOSALS_LIST,
  result
})

export const setQProposalsListError = (result) => ({
  type: actionTypes.SET_Q_PROPOSALS_LIST_ERROR,
  result
})

export const setQProposalsListLoading = (result) => ({
  type: actionTypes.SET_Q_PROPOSALS_LIST_LOADING,
  result
})

// ended proposals

export const setQEndedProposals = (result) => ({
  type: actionTypes.SET_Q_ENDED_PROPOSALS,
  result
})
export const setQEndedProposalsError = (result) => ({
  type: actionTypes.SET_Q_ENDED_PROPOSALS_ERROR,
  result
})

export const setQEndedProposalsLoading = (result) => ({
  type: actionTypes.SET_Q_ENDED_PROPOSALS_LOADING,
  result
})
