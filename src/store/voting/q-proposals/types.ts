import { ProposalEvent } from 'typings/contracts';

export interface GetQProposals {
  type: 'GET_Q_PROPOSALS'
}

export interface SetQProposals {
  type: 'SET_Q_PROPOSALS'
  proposals: ProposalEvent[]
}

export type QProposalsAction = GetQProposals | SetQProposals
