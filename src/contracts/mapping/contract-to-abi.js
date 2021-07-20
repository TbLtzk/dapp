import { getAbi } from '@q-dev/q-js-sdk/lib/abi/AbiImporter'

const baseContracts = {
  ContractRegistry: getAbi('ContractRegistry.json'),
}
const dynamicContracts = {
  BorrowingCoreQUSD: getAbi('BorrowingCore.json'),
  ConstitutionParameters: getAbi('Constitution.json'),
  ConstitutionVoting: getAbi('ConstitutionVoting.json'),
  DefaultAllocationProxy: getAbi('DefaultAllocationProxy.json'),
  EPDR_Membership: getAbi('EPDR_Membership.json'),
  EPDR_MembershipVoting: getAbi('EPDR_MembershipVoting.json'),
  EPDR_Parameters: getAbi('EPDR_Parameters.json'),
  EPDR_ParametersVoting: getAbi('EPDR_ParametersVoting.json'),
  EPQFI_Membership: getAbi('EPQFI_Membership.json'),
  EPQFI_MembershipVoting: getAbi('EPQFI_MembershipVoting.json'),
  EPQFI_Parameters: getAbi('EPQFI_Parameters.json'),
  EPQFI_ParametersVoting: getAbi('EPQFI_ParametersVoting.json'),
  EmergencyUpdateVoting: getAbi('EmergencyUpdateVoting.json'),
  GeneralUpdateVoting: getAbi('GeneralUpdateVoting.json'),
  LiquidationAuction: getAbi('LiquidationAuction.json'),
  QHolderRewardPool: getAbi('QHolderRewardPool.json'),
  QVault: getAbi('QVault.json'),
  RootNodeRewardProxy: getAbi('RootNodeRewardProxy.json'),
  Root: getAbi('Roots.json'),
  RootsVoting: getAbi('RootsVoting.json'),
  RootNodesSlashingVoting: getAbi('RootNodesSlashingVoting.json'),
  RootNodesSlashingEscrow: getAbi('RootNodeSlashingEscrow.json'),
  SavingQUSD: getAbi('Saving.json'),
  StableCoinQUSD: getAbi('StableCoin.json'),
  SystemBalance: getAbi('SystemBalance.json'),
  SystemDebtAuction: getAbi('SystemDebtAuction.json'),
  SystemReserve: getAbi('SystemReserve.json'),
  SystemSurplusAuction: getAbi('SystemSurplusAuction.json'),
  ValidationRewardPools: getAbi('ValidationRewardPools.json'),
  ValidationRewardProxy: getAbi('ValidationRewardProxy.json'),
  Validators: getAbi('Validators.json'),
  ValidatorsSlashingVoting: getAbi('ValidatorsSlashingVoting.json'),
  ValidatorsSlashingEscrow: getAbi('ValidatorSlashingEscrow.json'),
}

const customContracts = {
  GovernedEpdrQethQusdOracle: getAbi('FxPriceFeed.json'),
  GovernedEpdrQbtcQusdOracle: getAbi('FxPriceFeed.json'),
  GovernedEpdrQethAddress: getAbi('StableCoin.json'),
  GovernedEpdrQbtcAddress: getAbi('StableCoin.json'),

  CompoundRateKeeperQVault: getAbi('CompoundRateKeeper.json'),
  CompoundRateKeeperSaving: getAbi('CompoundRateKeeper.json'),
  CompoundRateKeeperBorrowing: getAbi('CompoundRateKeeper.json'),
}

export const contractsToAbi = {
  ...baseContracts,
  ...dynamicContracts,
  ...customContracts
};
