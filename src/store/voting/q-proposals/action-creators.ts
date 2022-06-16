import * as actionTypes from './action-types';

export const getQProposals = () => ({
  type: actionTypes.GET_Q_PROPOSALS
});

export const setQProposals = (
  activeProposalsArray: any[],
  endedProposalsArray: any[],
  proposalsCounter: { ended: number, active: number }
) => ({
  type: actionTypes.SET_Q_PROPOSALS,
  activeProposalsArray,
  endedProposalsArray,
  proposalsCounter
});

export type QProposalsAction = ReturnType<typeof setQProposals>
