import { contractRegistryInstance } from 'contracts/contracts'
import { contractsToAbi } from 'contracts/mapping/contract-to-abi'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { ValidatorMetrics } from '@q-dev/q-js-sdk/lib/utils/validator-metrics'

let qVaultContract = null
let validatorsContract = null
let validatorMetricsInstance = null

export const getQVaultContract = async () => {
  if (qVaultContract === null) {
    qVaultContract = new window.web3.eth.Contract(contractsToAbi.QVault, contractsToAddresses.QVault)
  }
  return qVaultContract
}

export const getValidatorsContract = async () => {
  console.log(contractRegistryInstance)
  if (validatorsContract === null) {
    console.log(contractRegistryInstance)
    validatorsContract = new window.web3.eth.Contract(contractsToAbi.Validators, contractsToAddresses.Validators)
  }
  return validatorsContract
}

export const getValidatorMetricsInstance = async () => {
  if (validatorMetricsInstance === null) {
    validatorMetricsInstance = new ValidatorMetrics()
  }
  return validatorMetricsInstance
}

function getInstance (instance, QUSD) {
  const cache = {}
  return async () => {
    if (!cache[instance]) {
      cache[instance] = await contractRegistryInstance[instance](QUSD ? 'QUSD' : null)
    }
    return cache[instance]
  }
}

function getInstance2 (instance, QUSD) {
  const cache = {}
  return async () => {
    if (!cache[instance]) {
      cache[instance] = await contractRegistryInstance[instance](QUSD ? 'QUSD' : null)
    }
    return cache[instance]
  }
}

function getInstance3 (instance, QUSD) {
  const cache = {}
  return async () => {
    if (!cache[instance]) {
      cache[instance] = await contractRegistryInstance[instance](QUSD ? 'QUSD' : null)
    }
    return cache[instance]
  }
}

function getInstance4 (instance, QUSD) {
  const cache = {}
  return async () => {
    if (!cache[instance]) {
      cache[instance] = await contractRegistryInstance[instance](QUSD ? 'QUSD' : null)
    }
    return cache[instance]
  }
}

export const getGeneralUpdateVotingInstance = getInstance('generalUpdateVoting')
export const getEmergencyUpdateVotingInstance = getInstance('emergencyUpdateVoting')
export const getPiggyBankInstance = getInstance('piggyBank')
export const getVotingWeightProxyInstance = getInstance('votingWeightProxy')
export const getValidationRewardProxyInstance = getInstance('validationRewardProxy')
export const getSystemSurplusAuctionInstance = getInstance('systemSurplusAuctionInstance', true)
export const getSystemDebtAuctionInstance = getInstance('systemDebtAuction', true)
export const getSystemBalanceInstance = getInstance('systemBalance', true)
export const getStableCoinInstance = getInstance('stableCoin', true)

export const getSavingInstance = getInstance2('saving', true)
export const getRootNodesMembershipVotingInstance = getInstance2('rootNodesMembershipVoting')
export const getLiquidationAuctionInstance = getInstance2('liquidationAuction', true)
export const getRootNodeRewardProxyInstance = getInstance2('rootNodeRewardProxy')
export const getEpqfiParametersVotingInstance = getInstance2('epqfiParametersVoting')
export const getEpqfiParametersInstance = getInstance2('epqfiParameters')
export const getEpdrParametersVotingInstance = getInstance2('epdrParametersVoting')
export const getEpdrParametersInstance = getInstance2('epdrParameters')

export const getConstitutionVotingInstance = getInstance3('constitutionVoting')
export const getConstitutionInstance = getInstance3('constitution')
export const getBorrowingCoreInstance = getInstance3('borrowingCore', true)
export const getQVaultInstance = getInstance3('qVault')
export const getRootNodesInstance = getInstance3('rootNodes')
export const getValidatorsInstance = getInstance3('validators')
export const getValidationRewardPoolsInstance = getInstance3('validationRewardPools')
export const getVestingInstance = getInstance3('vesting')
export const getValidatorsSlashingVotingInstance = getInstance3('validatorsSlashingVoting')
export const getValidatorSlashingEscrowInstance = getInstance3('validatorSlashingEscrow')

export const getSystemReserveInstance = getInstance4('systemReserve')
export const getRootNodesSlashingVotingInstance = getInstance4('rootNodesSlashingVoting')
export const getRootNodeSlashingEscrowInstance = getInstance4('rootNodeSlashingEscrow')
export const getGetSystemContractsAndBalances = getInstance4('getSystemContractsAndBalances')
export const getEpqfiMembershipVotingInstance = getInstance4('epqfiMembershipVoting')
export const getEpqfiMembershipInstance = getInstance4('epqfiMembership')
export const getDefaultAllocationProxyInstance = getInstance4('defaultAllocationProxy')
export const getEpdrMembershipVotingInstance = getInstance4('epdrMembershipVoting')
export const getEpdrMembershipInstance = getInstance4('epdrMembership')
