const testnetContractsToContractsRegistryKey = {
  ConstitutionParameters: 'governance.constitution.parameters',
  ConstitutionVoting: 'governance.constitution.parametersVoting',
  EPDRMembership: 'governance.experts.EPDR.membership',
  BorrowingCoreQUSD: 'defi.QUSD.borrowing',
  EPDRMembershipVoting: 'governance.experts.EPDR.membershipVoting',
  EPDRParameters: 'governance.experts.EPDR.parameters',
  EPDRParametersVoting: 'governance.experts.EPDR.parametersVoting',
  EPQFIMembership: 'governance.experts.EPQFI.membership',
  EPQFIMembershipVoting: 'governance.experts.EPQFI.membershipVoting',
  EPQFIParameters: 'governance.experts.EPQFI.parameters',
  EPQFIParametersVoting: 'governance.experts.EPQFI.parametersVoting',
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
  ValidatorsSlashingVoting: 'governance.validators.slashingVoting'
}

const devnetContractsToContractsRegistryKey = {
  DefaultAllocationProxy: 'tokeneconomics.defaultAllocationProxy',
  QHolderRewardPool: 'tokeneconomics.qHolderRewardPool',
  QHolderRewardProxy: 'tokeneconomics.qHolderRewardProxy',
  QVault: 'tokeneconomics.qVault',
  RootNodeRewardProxy: 'tokeneconomics.rootNodeRewardProxy',
  RootNodesSlashingEscrow: 'governance.rootNodes.slashingEscrow',
  ValidationRewardPools: 'tokeneconomics.validationRewardPools',
  ValidationRewardProxy: 'tokeneconomics.validationRewardProxy',
  WrappedQ: 'defi.wrappedQ',
  ValidatorsSlashingEscrow: 'governance.validators.slashingEscrow'
}

const contractsToContractsRegistryKeyCustom = {
  GovernedEpdrQbtcAddress: 'governed.EPDR.QBTC_address',
  GovernedEpdrQbtcQusdOracle: 'governed.EPDR.QBTC_QUSD_oracle'
}

export const contractsToContractsRegistryKey = {
  ...testnetContractsToContractsRegistryKey,
  ...devnetContractsToContractsRegistryKey,
  ...contractsToContractsRegistryKeyCustom
  // SystemBalance: 'defi.<STC>.systemBalance',
}
