export enum RoutePaths {
  dashboard = '/',
  dashboardTokenomics = '/dashboard/tokenomics',
  dashboardSavingBorrowing = '/dashboard/saving-borrowing',
  dashboardSavingBorrowingTab = '/dashboard/saving-borrowing/:tab?',
  dashboardRootNodesMonitoring = '/dashboard/root-nodes-monitoring',
  dashboardRootNodesMonitoringTab = '/dashboard/root-nodes-monitoring/:tab?',
  dashboardRootNodesMonitoringOnchainActiveDifference = '/dashboard/root-nodes-monitoring/onchain-active-difference',
  dashboardValidatorsMonitoring = '/dashboard/validators-monitoring',

  governance = '/governance',
  governanceTab = '/governance/:tab?',
  votingPower = '/governance/voting-power',
  qProposals = '/governance/q-proposals',
  rootNodePanel = '/governance/root-node-panel',
  expertProposals = '/governance/expert-proposals',
  slashingProposals = '/governance/slashing-proposals',
  contractUpdates = '/governance/contract-updates',

  proposal = '/governance/proposal/:contract?/:id?',

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

  qVault = '/q-vault',

  timeLocks = '/time-locks',
  timeLocksTab = '/time-locks/:type?',
  timeLocksQVault = '/time-locks/q-vault',
  timeLocksRootStake = '/time-locks/root-stake',
  timeLocksValidatorStake = '/time-locks/validator-stake',
  timeLocksVestingAccount = '/time-locks/vesting-account',

  savingBorrowing = '/saving-borrowing',
  savingBorrowingTab = '/saving-borrowing/:tab?',
  saving = '/saving-borrowing/saving',
  borrowing = '/saving-borrowing/borrowing',
  borrowingPair = '/saving-borrowing/borrowing/:collateral-:borrow',
}
