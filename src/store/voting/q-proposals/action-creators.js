import * as actionTypes from './action-types'

export const getQProposalsCount = () => ({
  type: actionTypes.GET_Q_PROPOSALS_COUNT
})

export const setQProposalsCount = (result) => ({
  type: actionTypes.SET_Q_PROPOSALS_COUNT,
  result
})

export const getQProposals = (proposalStatusType, range) => ({
  type: actionTypes.GET_Q_PROPOSALS,
  proposalStatusType,
  range
})

export const setQActiveProposals = (result) => ({
  type: actionTypes.SET_Q_ACTIVE_PROPOSALS,
  result
})

export const setQEndedProposals = (result) => ({
  type: actionTypes.SET_Q_ENDED_PROPOSALS,
  result
})
