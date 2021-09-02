import { contractRegistryInstance } from 'contracts/contracts'
import { contractsToAbi } from 'contracts/mapping/contract-to-abi'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'

let qVaultInstance = null
let qVaultContract = null

let validatorsInstance = null
let validatorsContract = null

let validationRewardPoolsInstance = null

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
