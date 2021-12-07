import * as actionTypes from './action-types'

export const getExpertProposalsCount = () => ({
  type: actionTypes.GET_EXPERT_PROPOSALS_COUNT
})

export const setExpertProposalsCount = (result) => ({
  type: actionTypes.SET_EXPERT_PROPOSALS_COUNT,
  result
})

export const getExpertProposals = (proposalStatusType, range) => ({
  type: actionTypes.GET_EXPERT_PROPOSALS,
  proposalStatusType,
  range
})

export const setExpertActiveProposals = (result) => ({
  type: actionTypes.SET_EXPERT_ACTIVE_PROPOSALS,
  result
})

export const setExpertEndedProposals = (result) => ({
  type: actionTypes.SET_EXPERT_ENDED_PROPOSALS,
  result
})
