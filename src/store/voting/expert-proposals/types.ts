export interface GetExpertProposals {
  type: 'GET_EXPERT_PROPOSALS'
}

export interface SetExpertProposals {
  type: 'SET_EXPERT_PROPOSALS'
  activeProposalsArray: any[]
  endedProposalsArray: any[]
  proposalsCounter: { ended: number, active: number }
}

export type ExpertProposalsAction = GetExpertProposals | SetExpertProposals
