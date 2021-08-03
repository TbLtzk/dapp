import { ContractRegistryInstance } from '@q-dev/q-js-sdk'

export const CONTRACT_REGISTRY_ADDRESS = '0xc3E589056Ece16BCB88c6f9318e9a7343b663522'

export let contractRegistryInstance = {}

export let validatorsInstance = {}
export let validationRewardPoolsInstance = {}
export let constitutionVotingInstance = {}

export let epqfiParametersVoting = {}
export let epdrParametersVoting = {}

export async function initInstances () {
  contractRegistryInstance = new ContractRegistryInstance(window.web3, CONTRACT_REGISTRY_ADDRESS)
  validatorsInstance = await contractRegistryInstance.validators()
  validationRewardPoolsInstance = await contractRegistryInstance.validationRewardPools()
  constitutionVotingInstance = await contractRegistryInstance.constitutionVoting()
  epqfiParametersVoting = await contractRegistryInstance.epqfiParametersVoting()
  epdrParametersVoting = await contractRegistryInstance.epdrParametersVoting()
  // console logging of the versions should be removed, when we display the information in the app
}
