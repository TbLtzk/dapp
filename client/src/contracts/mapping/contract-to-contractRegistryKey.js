const testnetContractsToContractsRegistryKey = {
  ConstitutionParameters: 'governance.constitution.parameters',
  ConstitutionVoting: 'governance.constitution.parametersVoting',
  EPDR_Membership: 'governance.experts.EPDR.membership',
  BorrowingCoreQUSD: 'defi.QUSD.borrowing',
  EPDR_MembershipVoting: 'governance.experts.EPDR.membershipVoting',
  EPDR_Parameters: 'governance.experts.EPDR.parameters',
  EPDR_ParametersVoting: 'governance.experts.EPDR.parametersVoting',
  EPQFI_Membership: 'governance.experts.EPQFI.membership',
  EPQFI_MembershipVoting: 'governance.experts.EPQFI.membershipVoting',
  EPQFI_Parameters: 'governance.experts.EPQFI.parameters',
  EPQFI_ParametersVoting: 'governance.experts.EPQFI.parametersVoting',
  EmergencyUpdateVoting: 'governance.emergencyUpdateVoting',
  GeneralUpdateVoting: 'governance.generalUpdateVoting',
  LiquidationAuction: 'defi.QUSD.liquidationAuction',
  Root: 'governance.rootNodes',
  RootsVoting: 'governance.rootNodes.membershipVoting',
  RootNodesSlashingVoting: 'governance.rootNodes.slashingVoting',
  SavingQUSD: 'defi.QUSD.saving',
  StableCoinQUSD: 'defi.QUSD.coin',
  SystemBalance: 'defi.QUSD.systemBalance',
  SystemDebtAuction: 'defi.QUSD.systemDebtAuction',
  SystemReserve: 'tokeneconomics.systemReserve',
  SystemSurplusAuction: 'defi.QUSD.systemSurplusAuction',
  Validators: 'governance.validators',
  ValidatorsSlashingVoting: 'governance.validators.slashingVoting',
}

const devnetContractsToContractsRegistryKey = {
  DefaultAllocationProxy: 'tokeneconomics.defaultAllocationProxy',
  QHolderRewardPool: 'tokeneconomics.qHolderRewardPool',
  QHolderRewardProxy: 'tokeneconomics.qHolderRewardProxy',
  QPiggyBank: 'tokeneconomics.qPiggyBank',
  RootNodeRewardProxy: 'tokeneconomics.rootNodeRewardProxy',
  RootNodesSlashingEscrow: 'governance.rootNodes.slashingEscrow',
  ValidationRewardPools: 'tokeneconomics.validationRewardPools',
  ValidationRewardProxy: 'tokeneconomics.validationRewardProxy',
  WrappedQ: 'defi.wrappedQ',
  ValidatorsSlashingEscrow: 'governance.validators.slashingEscrow',
}

const contractsToContractsRegistryKeyCustom = {
  GovernedEpdrQbtcAddress: 'governed.EPDR.QBTC_address',
  GovernedEpdrQbtcQusdOracle: 'governed.EPDR.QBTCQUSD_oracle',
}

export const contractsToContractsRegistryKey = {
  ...testnetContractsToContractsRegistryKey,
  ...devnetContractsToContractsRegistryKey,
  ...contractsToContractsRegistryKeyCustom
  // SystemBalance: 'defi.<STC>.systemBalance',
};

