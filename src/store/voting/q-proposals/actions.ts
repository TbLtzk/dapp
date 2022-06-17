import { GetQProposals, SetQProposals } from './types';

export const getQProposals = (): GetQProposals => ({
  type: 'GET_Q_PROPOSALS'
});

export const setQProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
): SetQProposals => ({
  type: 'SET_Q_PROPOSALS',
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});
