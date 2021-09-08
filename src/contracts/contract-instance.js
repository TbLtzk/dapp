import { contractRegistryInstance } from 'contracts/contracts'
import { contractsToAbi } from 'contracts/mapping/contract-to-abi'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'

let qVaultInstance = null

export const getQVaultInstance = async () => {
  if (qVaultInstance === null) {
    qVaultInstance = await contractRegistryInstance.qVault()
  }
  return qVaultInstance
}

let qVaultContract = null

export const getQVaultContract = async () => {
  if (qVaultContract === null) {
    qVaultContract = new window.web3.eth.Contract(contractsToAbi.QVault, contractsToAddresses.QVault)
  }
  return qVaultContract
}

let rootNodesInstance = null

export const getRootNodesInstance = async () => {
  if (rootNodesInstance === null) {
    rootNodesInstance = await contractRegistryInstance.rootNodes()
  }
  return rootNodesInstance
}

let validatorsInstance = null

export const getValidatorsInstance = async () => {
  if (validatorsInstance === null) {
    validatorsInstance = await contractRegistryInstance.validators()
  }
  return validatorsInstance
}

let vestingInstance = null

export const getVestingInstance = async () => {
  if (vestingInstance === null) {
    vestingInstance = await contractRegistryInstance.vesting()
  }
  return vestingInstance
}
