import * as actionTypes from './action-types';

export const getRootProposals = () => ({
  type: actionTypes.GET_ROOT_PROPOSALS
});

export const setRootProposals = (activeProposalsArray, endedProposalsArray, proposalsCounter) => ({
  type: actionTypes.SET_ROOT_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});
