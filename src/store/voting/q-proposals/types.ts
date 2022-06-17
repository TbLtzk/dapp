export interface GetQProposals {
  type: 'GET_Q_PROPOSALS'
}

export interface SetQProposals {
  type: 'SET_Q_PROPOSALS'
  activeProposalsArray: any[]
  endedProposalsArray: any[]
  proposalsCounter: { ended: number, active: number }
}

export type QProposalsAction = GetQProposals | SetQProposals
