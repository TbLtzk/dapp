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

const baseContracts = {
  ContractRegistry: require('./ContractRegistry'),
  CompoundRateKeeper: require('./CompoundRateKeeper'),
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
  QHolderRewardProxy: require('./QHolderRewardProxy'),
  WrappedQ: require('./WrappedQ'),
}

const customContracts = {
  CompoundRateKeeperPiggyBank: require('./CompoundRateKeeper'),
  CompoundRateKeeperSaving: require('./CompoundRateKeeper'),
  CompoundRateKeeperBorrowing: require('./CompoundRateKeeper'),
  GovernedEpdrQethQusdOracle: require('./FxPriceFeed'),
  GovernedEpdrQbtcQusdOracle: require('./FxPriceFeed'),
  GovernedEpdrQethAddress: require('./StableCoin'),
  GovernedEpdrQbtcAddress: require('./StableCoin'),
}

export const contractsAbiTestnet = {
  ...baseContracts,
  ...dynamicContracts,
  ...customContracts,
};
