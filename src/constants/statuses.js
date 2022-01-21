export const STATUSES = {
  none: 'None',
  open: 'Open',
  accepted: 'Accepted',
  pending: 'Pending',
  decided: 'Decided',
  executed: 'Executed'
}

export const PROPOSALS_TYPES = {
  proposals: 'q-proposals',
  rootNodePanel: 'q-root-node-panel',
  expertProposals: 'q-expert-proposals',
  slashingProposals: 'slashing-proposals',
  contractUpdates: 'contract-updates'
}

export const AUCTIONS_TYPES = {
  liquidation: 'liquidation',
  systemDebt: 'system-debt',
  systemSurplus: 'system-surplus',
  all: 'all'
}

export const PROPOSAL_STATUS_TYPES = {
  active: 'active',
  ended: 'ended',
  reset: 'reset'
}

export const LOAD_TYPES = {
  notLogged: 'not-logged',
  error: 'error',
  initError: 'init-error',
  loaded: 'loaded',
  loading: 'loading'
}

export const WARNING_MAX_NUMBER = 'Warning: No Q left on sender wallet for future transactions (gas)'
