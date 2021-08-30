import { getAbi } from '@q-dev/q-js-sdk/lib/abi/AbiImporter'

const baseContracts = {
  ContractRegistry: getAbi('ContractRegistry.json')
}
const dynamicContracts = {
  BorrowingCoreQUSD: getAbi('BorrowingCore.json'),
  ConstitutionParameters: getAbi('Constitution.json'),
  ConstitutionVoting: getAbi('ConstitutionVoting.json'),
  DefaultAllocationProxy: getAbi('DefaultAllocationProxy.json'),
  EPDRMembership: getAbi('EPDR_Membership.json'),
  EPDRMembershipVoting: getAbi('EPDR_MembershipVoting.json'),
  EPDRParameters: getAbi('EPDR_Parameters.json'),
  EPDRParametersVoting: getAbi('EPDR_ParametersVoting.json'),
  EPQFIMembership: getAbi('EPQFI_Membership.json'),
  EPQFIMembershipVoting: getAbi('EPQFI_MembershipVoting.json'),
  EPQFIParameters: getAbi('EPQFI_Parameters.json'),
  EPQFIParametersVoting: getAbi('EPQFI_ParametersVoting.json'),
  EmergencyUpdateVoting: getAbi('EmergencyUpdateVoting.json'),
  GeneralUpdateVoting: getAbi('GeneralUpdateVoting.json'),
  LiquidationAuction: getAbi('LiquidationAuction.json'),
  QHolderRewardPool: getAbi('QHolderRewardPool.json'),
  QVault: getAbi('QVault.json'), // removed
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
  ValidatorsSlashingEscrow: getAbi('ValidatorSlashingEscrow.json')
}

const customContracts = {
  GovernedEpdrQethQusdOracle: getAbi('FxPriceFeed.json'),
  GovernedEpdrQbtcQusdOracle: getAbi('FxPriceFeed.json'),
  GovernedEpdrQethAddress: getAbi('StableCoin.json'),
  GovernedEpdrQbtcAddress: getAbi('StableCoin.json'),

  CompoundRateKeeperQVault: getAbi('CompoundRateKeeper.json'),
  CompoundRateKeeperSaving: getAbi('CompoundRateKeeper.json'),
  CompoundRateKeeperBorrowing: getAbi('CompoundRateKeeper.json')
}

export const contractsToAbi = {
  ...baseContracts,
  ...dynamicContracts,
  ...customContracts
}
