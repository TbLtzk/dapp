export interface GetContractUpdatesProposals {
  type: 'GET_CONTRACT_UPDATES_PROPOSALS'
}

export interface SetContractUpdatesProposals {
  type: 'SET_CONTRACT_UPDATES_PROPOSALS'
  activeProposalsArray: any[]
  endedProposalsArray: any[]
  proposalsCounter: { ended: number, active: number }
}

export type ContractUpdatesAction = GetContractUpdatesProposals | SetContractUpdatesProposals
