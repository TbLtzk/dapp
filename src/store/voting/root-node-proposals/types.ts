export interface GetRootProposals {
  type: 'GET_ROOT_PROPOSALS'
}

export interface SetRootProposals {
  type: 'SET_ROOT_PROPOSALS'
  activeProposalsArray: any[]
  endedProposalsArray: any[]
  proposalsCounter: { ended: number, active: number }
}

export type RootNodeProposalsAction = GetRootProposals | SetRootProposals
