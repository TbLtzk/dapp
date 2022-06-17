import { GetRootProposals, SetRootProposals } from './types';

export const getRootProposals = (): GetRootProposals => ({
  type: 'GET_ROOT_PROPOSALS'
});

export const setRootProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
): SetRootProposals => ({
  type: 'SET_ROOT_PROPOSALS',
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});
