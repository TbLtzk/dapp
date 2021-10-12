import * as actionTypes from 'store/actions/action-types/voting/expert-proposals'

export const getExpertEndedProposalsSuccess = (result) => ({
  type: actionTypes.GET_EXPERT_ENDED_PROPOSALS_SUCCESS,
  result
})
export const getExpertEndedProposalsError = (result) => ({
  type: actionTypes.GET_EXPERT_ENDED_PROPOSALS_ERROR,
  result
})

export const getExpertProposalsList = (proposalStatusType) => ({
  type: actionTypes.GET_EXPERT_PROPOSALS_LIST,
  proposalStatusType
})

export const getExpertProposalsListSuccess = (result) => ({
  type: actionTypes.GET_EXPERT_PROPOSALS_LIST_SUCCESS,
  result
})

export const getExpertProposalsListError = (result) => ({
  type: actionTypes.GET_EXPERT_PROPOSALS_LIST_ERROR,
  result
})

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
