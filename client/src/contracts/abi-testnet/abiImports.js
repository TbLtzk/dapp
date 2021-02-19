// const filesName = ['./Consitution', './ConstitutionVoting'];

// export async function getDataAsync(apiClientModuleName) {
//   const ApiClient = require('./Consitution.json');
//   return await ApiClient;
// }
// export const res = getDataAsync('contracts/abi-testnet/Consitution.json')
//   .then(res => {
//     console.log('getDataAsync', res);
//   });

// getDataAsync('./Consitution')
//   .then(res => {
//     console.log('getDataAsync', res);
//   });

export const contractsAbiTestnet = {
  BorrowingCoreQUSD: require('./BorrowingCore'),
  CompoundRateKeeper: require('./CompoundRateKeeper'),
  CompoundRateKeeperSaving: require('./CompoundRateKeeper'),
  CompoundRateKeeperBorrowing: require('./CompoundRateKeeper'),
  CompoundRateKeeperPiggyBank: require('./CompoundRateKeeper'),
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
