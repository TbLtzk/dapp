import { GetExpertProposals, SetExpertProposals } from './types';

export const getExpertProposals = (): GetExpertProposals => ({
  type: 'GET_EXPERT_PROPOSALS'
});

export const setExpertProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
): SetExpertProposals => ({
  type: 'SET_EXPERT_PROPOSALS',
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});
