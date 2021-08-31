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
