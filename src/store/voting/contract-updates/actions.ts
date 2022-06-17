import { GetContractUpdatesProposals, SetContractUpdatesProposals } from './types';

export const getContractUpdatesProposals = (): GetContractUpdatesProposals => ({
  type: 'GET_CONTRACT_UPDATES_PROPOSALS'
});

export const setContractUpdatesProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
): SetContractUpdatesProposals => ({
  type: 'SET_CONTRACT_UPDATES_PROPOSALS',
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});
