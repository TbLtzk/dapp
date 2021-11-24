import { contractsToAbi } from 'contracts/mapping/contract-to-abi'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { ValidatorMetrics } from '@q-dev/q-js-sdk/lib/utils/validator-metrics'
import { ContractRegistryInstance } from '@q-dev/q-js-sdk'

export const CONTRACT_REGISTRY_ADDRESS = '0xc3E589056Ece16BCB88c6f9318e9a7343b663522'

export let contractRegistryInstance = null

export const getContractRegistryInstance = async () => {
  if (!contractRegistryInstance) {
    contractRegistryInstance = new ContractRegistryInstance(window.web3, CONTRACT_REGISTRY_ADDRESS)
  }
  return contractRegistryInstance
}

const cache = {}

function getInstance (instance, QUSD) {
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
export const getSavingInstance = getInstance('saving', true)
export const getRootNodesMembershipVotingInstance = getInstance('rootNodesMembershipVoting')
export const getLiquidationAuctionInstance = getInstance('liquidationAuction', true)
export const getRootNodeRewardProxyInstance = getInstance('rootNodeRewardProxy')
export const getEpqfiParametersVotingInstance = getInstance('epqfiParametersVoting')
export const getEpqfiParametersInstance = getInstance('epqfiParameters')
export const getEpdrParametersVotingInstance = getInstance('epdrParametersVoting')
export const getEpdrParametersInstance = getInstance('epdrParameters')
export const getConstitutionVotingInstance = getInstance('constitutionVoting')
export const getConstitutionInstance = getInstance('constitution')
export const getBorrowingCoreInstance = getInstance('borrowingCore', true)
export const getQVaultInstance = getInstance('qVault')
export const getRootNodesInstance = getInstance('rootNodes')
export const getValidatorsInstance = getInstance('validators')
export const getValidationRewardPoolsInstance = getInstance('validationRewardPools')
export const getVestingInstance = getInstance('vesting')
export const getValidatorsSlashingVotingInstance = getInstance('validatorsSlashingVoting')
export const getValidatorSlashingEscrowInstance = getInstance('validatorSlashingEscrow')
export const getSystemReserveInstance = getInstance('systemReserve')
export const getRootNodesSlashingVotingInstance = getInstance('rootNodesSlashingVoting')
export const getRootNodeSlashingEscrowInstance = getInstance('rootNodeSlashingEscrow')
export const getGetSystemContractsAndBalances = getInstance('getSystemContractsAndBalances')
export const getEpqfiMembershipVotingInstance = getInstance('epqfiMembershipVoting')
export const getEpqfiMembershipInstance = getInstance('epqfiMembership')
export const getDefaultAllocationProxyInstance = getInstance('defaultAllocationProxy')
export const getEpdrMembershipVotingInstance = getInstance('epdrMembershipVoting')
export const getEpdrMembershipInstance = getInstance('epdrMembership')

let qVaultContract = null
let validatorsContract = null
let validatorMetricsInstance = null
let compoundRateKeeperBorrowingInstance = null
let compoundRateKeeperSavingInstance = null
let compoundRateKeeperQVaultInstance = null

export async function getCompoundRateKeeperBorrowingInstance () {
  if (!compoundRateKeeperBorrowingInstance) {
    const contract = await getBorrowingCoreInstance()
    compoundRateKeeperBorrowingInstance = await contract.getCompoundRateKeeper('QBTC')
  }
  return compoundRateKeeperBorrowingInstance
}

export async function getCompoundRateKeeperSavingInstance () {
  if (!compoundRateKeeperSavingInstance) {
    const contract = await getSavingInstance()
    compoundRateKeeperSavingInstance = await contract.getCompoundRateKeeper()
  }
  return compoundRateKeeperSavingInstance
}
export async function getCompoundRateKeeperQVaultInstance () {
  if (!compoundRateKeeperQVaultInstance) {
    const contract = await getQVaultInstance()
    compoundRateKeeperQVaultInstance = await contract.getCompoundRateKeeper()
  }
  return compoundRateKeeperQVaultInstance
}

export const getQVaultContract = async () => {
  if (!qVaultContract) {
    qVaultContract = new window.web3.eth.Contract(contractsToAbi.QVault, contractsToAddresses.QVault)
  }
  return qVaultContract
}

export const getValidatorsContract = async () => {
  if (!validatorsContract) {
    validatorsContract = new window.web3.eth.Contract(contractsToAbi.Validators, contractsToAddresses.Validators)
  }
  return validatorsContract
}

export const getValidatorMetricsInstance = async () => {
  if (!validatorMetricsInstance) {
    validatorMetricsInstance = new ValidatorMetrics()
  }
  return validatorMetricsInstance
}
