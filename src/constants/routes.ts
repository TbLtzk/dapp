export enum RoutePaths {
  dashboard = '/',
  dashboardTokenomics = '/dashboard/tokenomics',
  dashboardSavingBorrowing = '/dashboard/saving-borrowing',
  dahboardRootNodesMonitoring = '/dashboard/root-nodes-monitoring',
  dashboardValidatorsMonitoring = '/dashboard/validators-monitoring',

  governance = '/governance',
  qProposals = '/governance/q-proposals',
  rootNodePanel = '/governance/root-node-panel',
  expertProposals = '/governance/expert-proposals',
  slashingProposals = '/governance/slashing-proposals',
  contractUpdates = '/governance/contract-updates',

  newQProposal = '/governance/q-proposals/new',
  newRootNodeProposal = '/governance/root-node-panel/new',
  newExpertProposal = '/governance/expert-proposals/new',
  newSlashingProposal = '/governance/slashing-proposals/new',

  auctions = '/auctions',

  liquidation = '/auctions/liquidation',
  systemDebt = '/auctions/system-debt',
  systemSurplus = '/auctions/system-surplus',

  newLiquidation = '/auctions/liquidation/new',
  newSystemDebt = '/auctions/system-debt/new',
  newSystemSurplus = '/auctions/system-surplus/new',

  qParameters = '/q-parameters',
  qDefiRiskExpertPanelParameters = '/q-parameters/defi-risk-experts',
  qRootNodeSelectionExpertPanelParameters = '/q-parameters/root-node-selection-experts',
  qFeesAndIncentivesExpertPanel = '/q-parameters/fees-and-incentives-experts',
  qContractRegistry = '/q-parameters/contract-registry',
  qConstitution = '/q-parameters/constitution',

  staking = '/staking',
  stakingSlug = '/staking/:slug?',

  stakingRootNode = '/staking/root-node-staking',

  stakingValidators = '/staking/validators',
  stakingValidatorSlug = '/staking/validators/:address?',
  stakingValidatorManage = '/staking/validators/manage-balance',
  stakingValidatorStakeRewarPoolManage = '/staking/validators/manage-stake-reward-pool',

  stakingDelegations = '/staking/delegations',
  stakingDelegationsSlug = '/staking/delegations/:slug?',
  stakingDelegationsManual = '/staking/delegations/manual',
  stakingDelegationsValidators = '/staking/delegations/validators',
}
