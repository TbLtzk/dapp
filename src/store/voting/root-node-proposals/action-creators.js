import * as actionTypes from './action-types'

export const getRootProposalsCount = () => ({
  type: actionTypes.GET_ROOT_PROPOSALS_COUNT
})

export const setRootProposalsCount = (result) => ({
  type: actionTypes.SET_ROOT_PROPOSALS_COUNT,
  result
})

export const getRootProposals = (proposalStatusType, range) => ({
  type: actionTypes.GET_ROOT_PROPOSALS,
  proposalStatusType,
  range
})

export const setRootActiveProposals = (result) => ({
  type: actionTypes.SET_ROOT_ACTIVE_PROPOSALS,
  result
})

export const setRootEndedProposals = (result) => ({
  type: actionTypes.SET_ROOT_ENDED_PROPOSALS,
  result
})
