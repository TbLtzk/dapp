import { contractRegistryInstance } from 'contracts/contracts'
import { contractsToAbi } from 'contracts/mapping/contract-to-abi'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { ValidatorMetrics } from '@q-dev/q-js-sdk/lib/utils/validator-metrics'

let qVaultInstance = null
let qVaultContract = null

let rootNodesInstance = null

let validatorsInstance = null
let validatorsContract = null

let validationRewardPoolsInstance = null

let vestingInstance = null

let borrowingCoreInstance = null
let constitutionInstance = null
let constitutionVotingInstance = null
let epdrParametersInstance = null
let epdrParametersVotingInstance = null
let epqfiParametersInstance = null
let epqfiParametersVotingInstance = null
let liquidationAuctionInstance = null
let rootNodeRewardProxyInstance = null
let rootNodesMembershipVotingInstance = null
let savingInstance = null
let stableCoinInstance = null
let systemBalanceInstance = null
let systemDebtAuctionInstance = null
let systemSurplusAuctionInstance = null
let validationRewardProxyInstance = null
let votingWeightProxyInstance = null
let piggyBankInstance = null

let validatorMetricsInstance = null

function getInstance (instance) {
  const cache = {}
  return async () => {
    if (!cache[instance]) {
      cache[instance] = await contractRegistryInstance[instance]()
    }
    return cache[instance]
  }
}

export const validatorSlashingEscrowInstance = getInstance('validatorSlashingEscrow')
export const rootNodeSlashingEscrowInstance = getInstance('rootNodeSlashingEscrow')

export const getValidatorMetricsInstance = async () => {
  if (validatorMetricsInstance === null) {
    validatorMetricsInstance = new ValidatorMetrics()
  }
  return validatorMetricsInstance
}

export const getPiggyBankInstance = async () => {
  if (piggyBankInstance === null) {
    piggyBankInstance = await contractRegistryInstance.piggyBank()
  }
  return piggyBankInstance
}

export const getVotingWeightProxyInstance = async () => {
  if (votingWeightProxyInstance === null) {
    votingWeightProxyInstance = await contractRegistryInstance.votingWeightProxy()
  }
  return votingWeightProxyInstance
}

export const getValidationRewardProxyInstance = async () => {
  if (validationRewardProxyInstance === null) {
    validationRewardProxyInstance = await contractRegistryInstance.validationRewardProxy()
  }
  return validationRewardProxyInstance
}

export const getSystemSurplusAuctionInstance = async () => {
  if (systemSurplusAuctionInstance === null) {
    systemSurplusAuctionInstance = await contractRegistryInstance.systemSurplusAuction('QUSD')
  }
  return systemSurplusAuctionInstance
}

export const getSystemDebtAuctionInstance = async () => {
  if (systemDebtAuctionInstance === null) {
    systemDebtAuctionInstance = await contractRegistryInstance.systemDebtAuction('QUSD')
  }
  return systemDebtAuctionInstance
}

export const getSystemBalanceInstance = async () => {
  if (systemBalanceInstance === null) {
    systemBalanceInstance = await contractRegistryInstance.systemBalance('QUSD')
  }
  return systemBalanceInstance
}

export const getStableCoinInstance = async () => {
  if (stableCoinInstance === null) {
    stableCoinInstance = contractRegistryInstance.stableCoin('QUSD')
  }
  return stableCoinInstance
}

export const getSavingInstance = async () => {
  if (savingInstance === null) {
    savingInstance = await contractRegistryInstance.saving('QUSD')
  }
  return savingInstance
}

export const getRootNodesMembershipVotingInstance = async () => {
  if (rootNodesMembershipVotingInstance === null) {
    rootNodesMembershipVotingInstance = await contractRegistryInstance.rootNodesMembershipVoting()
  }
  return rootNodesMembershipVotingInstance
}

export const getLiquidationAuctionInstance = async () => {
  if (liquidationAuctionInstance === null) {
    liquidationAuctionInstance = await contractRegistryInstance.liquidationAuction('QUSD')
  }
  return liquidationAuctionInstance
}

export const getRootNodeRewardProxyInstance = async () => {
  if (rootNodeRewardProxyInstance === null) {
    rootNodeRewardProxyInstance = await contractRegistryInstance.rootNodeRewardProxy()
  }
  return rootNodeRewardProxyInstance
}

export const getEpqfiParametersVotingInstance = async () => {
  if (epqfiParametersVotingInstance === null) {
    epqfiParametersVotingInstance = await contractRegistryInstance.epqfiParametersVoting()
  }
  return epqfiParametersVotingInstance
}

export const getEpqfiParametersInstance = async () => {
  if (epqfiParametersInstance === null) {
    epqfiParametersInstance = await contractRegistryInstance.epqfiParameters()
  }
  return epqfiParametersInstance
}

export const getEpdrParametersVotingInstance = async () => {
  if (epdrParametersVotingInstance === null) {
    epdrParametersVotingInstance = await contractRegistryInstance.epdrParametersVoting()
  }
  return epdrParametersVotingInstance
}

export const getEpdrParametersInstance = async () => {
  if (epdrParametersInstance === null) {
    epdrParametersInstance = await contractRegistryInstance.epdrParameters()
  }
  return epdrParametersInstance
}

export const getConstitutionVotingInstance = async () => {
  if (constitutionVotingInstance === null) {
    constitutionVotingInstance = await contractRegistryInstance.constitutionVoting()
  }
  return constitutionVotingInstance
}

export const getConstitutionInstance = async () => {
  if (constitutionInstance === null) {
    constitutionInstance = await contractRegistryInstance.constitution()
  }
  return constitutionInstance
}

export const getBorrowingCoreInstance = async () => {
  if (borrowingCoreInstance === null) {
    borrowingCoreInstance = await contractRegistryInstance.borrowingCore('QUSD')
  }
  return borrowingCoreInstance
}

export const getQVaultInstance = async () => {
  if (qVaultInstance === null) {
    qVaultInstance = await contractRegistryInstance.qVault()
  }
  return qVaultInstance
}

export const getQVaultContract = async () => {
  if (qVaultContract === null) {
    qVaultContract = new window.web3.eth.Contract(contractsToAbi.QVault, contractsToAddresses.QVault)
  }
  return qVaultContract
}

export const getRootNodesInstance = async () => {
  if (rootNodesInstance === null) {
    rootNodesInstance = await contractRegistryInstance.rootNodes()
  }
  return rootNodesInstance
}

export const getValidatorsInstance = async () => {
  if (validatorsInstance === null) {
    validatorsInstance = await contractRegistryInstance.validators()
  }
  return validatorsInstance
}

export const getValidatorsContract = async () => {
  if (validatorsContract === null) {
    validatorsContract = new window.web3.eth.Contract(contractsToAbi.Validators, contractsToAddresses.Validators)
  }
  return validatorsContract
}

export const getValidationRewardPoolsInstance = async () => {
  if (validationRewardPoolsInstance === null) {
    validationRewardPoolsInstance = await contractRegistryInstance.validationRewardPools()
  }
  return validationRewardPoolsInstance
}

export const getVestingInstance = async () => {
  if (vestingInstance === null) {
    vestingInstance = await contractRegistryInstance.vesting()
  }
  return vestingInstance
}
