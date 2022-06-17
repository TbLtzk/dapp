import * as actionTypes from './action-types';

export const getExpertProposals = () => ({
  type: actionTypes.GET_EXPERT_PROPOSALS
});

export const setExpertProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
) => ({
  type: actionTypes.SET_EXPERT_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});

export type ExpertProposalsAction = ReturnType<typeof setExpertProposals>
