import * as actionTypes from './action-types';

export const getQProposals = () => ({
  type: actionTypes.GET_Q_PROPOSALS
});

export const setQProposals = (activeProposalsArray, endedProposalsArray, proposalsCounter) => ({
  type: actionTypes.SET_Q_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});
