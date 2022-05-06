import * as actionTypes from './action-types';

export const getContractUpdatesProposals = () => ({
  type: actionTypes.GET_CONTRACT_UPDATES_PROPOSALS
});

export const setContractUpdatesProposals = (activeProposalsArray, endedProposalsArray, proposalsCounter) => ({
  type: actionTypes.SET_CONTRACT_UPDATES_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});
