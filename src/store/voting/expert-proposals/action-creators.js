import * as actionTypes from './action-types'

export const getExpertProposals = () => ({
  type: actionTypes.GET_EXPERT_PROPOSALS
})

export const setExpertProposals = (activeProposalsArray, endedProposalsArray, proposalsCounter) => ({
  type: actionTypes.SET_EXPERT_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
})
