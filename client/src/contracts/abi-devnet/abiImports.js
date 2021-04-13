const baseContracts = {
  ContractRegistry: require('./ContractRegistry'),
}
const dynamicContracts = {
  BorrowingCoreQUSD: require('./BorrowingCore'),
  ConstitutionParameters: require('./Constitution'),
  ConstitutionVoting: require('./ConstitutionVoting'),
  DefaultAllocationProxy: require('./DefaultAllocationProxy'),
  EPDR_Membership: require('./EPDR_Membership'),
  EPDR_MembershipVoting: require('./EPDR_MembershipVoting'),
  EPDR_Parameters: require('./EPDR_Parameters'),
  EPDR_ParametersVoting: require('./EPDR_ParametersVoting'),
  EPQFI_Membership: require('./EPQFI_Membership'),
  EPQFI_MembershipVoting: require('./EPQFI_MembershipVoting'),
  EPQFI_Parameters: require('./EPQFI_Parameters'),
  EPQFI_ParametersVoting: require('./EPQFI_ParametersVoting'),
  EmergencyUpdateVoting: require('./EmergencyUpdateVoting'),
  GeneralUpdateVoting: require('./GeneralUpdateVoting'),
  LiquidationAuction: require('./LiquidationAuction'),
  QHolderRewardPool: require('./QHolderRewardPool'),
  QPiggyBank: require('./PiggyBank'),
  RootNodeRewardProxy: require('./RootNodeRawardProxy'),
  Root: require('./Roots'),
  RootsVoting: require('./RootsVoting'),
  RootNodesSlashingVoting: require('./RootNodesSlashingVoting'),
  RootNodesSlashingEscrow: require('./RootNodeSlashingEscrow'),
  SavingQUSD: require('./Saving'),
  StableCoinQUSD: require('./StableCoin'),
  SystemBalance: require('./SystemBalance'),
  SystemDebtAuction: require('./SystemDebtAuction'),
  SystemReserve: require('./SystemReserve'),
  SystemSurplusAuction: require('./SystemSurplusAuction'),
  ValidationRewardPools: require('./ValidationRewardPools'),
  ValidationRewardProxy: require('./ValidationRewardProxy'),
  Validators: require('./Validators'),
  ValidatorsSlashingVoting: require('./ValidatorsSlashingVoting'),
  ValidatorsSlashingEscrow: require('./ValidatorSlashingEscrow'),
}

const customContracts = {
  GovernedEpdrQethQusdOracle: require('./FxPriceFeed'),
  GovernedEpdrQbtcQusdOracle: require('./FxPriceFeed'),
  GovernedEpdrQethAddress: require('./StableCoin'),
  GovernedEpdrQbtcAddress: require('./StableCoin'),

  CompoundRateKeeperPiggyBank: require('./CompoundRateKeeper'),
  CompoundRateKeeperSaving: require('./CompoundRateKeeper'),
  CompoundRateKeeperBorrowing: require('./CompoundRateKeeper'),
}

export const contractsAbiDevnet = {
  ...baseContracts,
  ...dynamicContracts,
  ...customContracts
};
