import * as actionTypes from './action-types';

export const getContractUpdatesProposals = () => ({
  type: actionTypes.GET_CONTRACT_UPDATES_PROPOSALS
});

export const setContractUpdatesProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
) => ({
  type: actionTypes.SET_CONTRACT_UPDATES_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});

export type ContractUpdatesAction = ReturnType<typeof setContractUpdatesProposals>
