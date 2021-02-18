export const contractsAbiDevnet = {
  BorrowingCoreQUSD: require('./BorrowingCore'),
  ConstitutionParameters: require('./Constitution'),
  ConstitutionVoting: require('./ConstitutionVoting'),
  ContractRegistry: require('./ContractRegistry'),
  DefaultAllocationProxy: require('./DefaultAllocationProxy'),
  EmergencyUpdateVoting: require('./EmergencyUpdateVoting'),

  EPDR_Membership: require('./EPDR_Membership'),
  EPDR_MembershipVoting: require('./EPDR_MembershipVoting'),
  EPDR_Parameters: require('./EPDR_Parameters'),
  EPDR_ParametersVoting: require('./EPDR_ParametersVoting'),

  EPQFI_Membership: require('./EPQFI_Membership'),
  EPQFI_MembershipVoting: require('./EPQFI_MembershipVoting'),
  EPQFI_Parameters: require('./EPQFI_Parameters'),
  EPQFI_ParametersVoting: require('./EPQFI_ParametersVoting'),

  GeneralUpdateVoting: require('./GeneralUpdateVoting'),
  GovernedEpdrQethQusdOracle: require('./FxPriceFeed'),
  GovernedEpdrQbtcQusdOracle: require('./FxPriceFeed'),
  GovernedEpdrQethAddress: require('./StableCoin'),
  GovernedEpdrQbtcAddress: require('./StableCoin'),

  LiquidationAuction: require('./LiquidationAuction'),
  QPiggyBank: require('./PiggyBank'),
  QHolderRewardPool: require('./QHolderRewardPool'),

  RootNodeRewardProxy: require('./RootNodeRawardProxy'),
  RootNodesSlashingVoting: require('./RootNodesSlashingVoting'),
  RootNodesSlashingEscrow: require('./RootNodeSlashingEscrow'),
  Root: require('./Roots'),
  RootsVoting: require('./RootsVoting'),

  SavingQUSD: require('./Saving'),
  StableCoinQUSD: require('./StableCoin'),
  SystemBalance: require('./SystemBalance'),
  SystemDebtAuction: require('./SystemDebtAuction'),
  SystemReserve: require('./SystemReserve'),
  SystemSurplusAuction: require('./SystemSurplusAuction'),

  ValidationRewardPools: require('./ValidationRewardPools'),
  ValidationRewardProxy: require('./ValidationRewardProxy'),
  Validators: require('./Validators'),
  ValidatorsSlashingEscrow: require('./ValidatorSlashingEscrow'),
  ValidatorsSlashingVoting: require('./ValidatorsSlashingVoting'),
};
