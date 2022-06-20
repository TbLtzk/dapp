export const STATUSES = {
  none: 'None',
  open: 'Open',
  accepted: 'Accepted',
  pending: 'Pending',
  decided: 'Decided',
  executed: 'Executed',
  passed: 'Passed',
};

export const TRANSACTION_TYPES = {
  success: 'Success',
  rejected: 'Rejected',
};

export const PROPOSALS_TYPES = {
  proposals: 'q',
  rootNodePanel: 'root-node',
  expertProposals: 'expert',
  slashingProposals: 'slashing',
  contractUpdates: 'contract-update',
};

export type ProposalType = 'q' | 'rootNode' | 'expert' | 'slashing' | 'contractUpdate';

export const AUCTIONS_TYPES = {
  liquidation: 'liquidation',
  systemDebt: 'system-debt',
  systemSurplus: 'system-surplus',
  all: 'all',
};

export const LOAD_TYPES = {
  error: 'error',
  loaded: 'loaded',
  loading: 'loading',
  initError: 'init-error',
  notLogged: 'not-logged',
  notInstalled: 'not-installed',
  wrongNetwork: 'wrong-network',
};
