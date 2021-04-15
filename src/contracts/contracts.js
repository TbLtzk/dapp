import { ContractRegistryInstance, Web3Adapter } from '@q-dev/q-js-sdk';
import pkg from '../../package.json'

export const CONTRACT_REGISTRY_ADDRESS = '0xc3E589056Ece16BCB88c6f9318e9a7343b663522'

export let contractRegistryInstance = {}

export let validatorsInstance = {}
export let validationRewardPoolsInstance = {}
export let web3Adapter

export async function initInstances() {
  web3Adapter = new Web3Adapter(window.web3)
  contractRegistryInstance = new ContractRegistryInstance(window.web3, CONTRACT_REGISTRY_ADDRESS)
  validatorsInstance = await contractRegistryInstance.validators()
  validationRewardPoolsInstance = await contractRegistryInstance.validationRewardPools()

  // console logging of the versions should be removed, when we display the information in the app
  const versionInfo = await getVersionInfo()
  console.log('versionInfo', versionInfo)
}

const versionInfoGroups = {
  main: 'Main',
  modules: 'Modules',
  client: 'Q client'
}

export async function getVersionInfo() {
  if(!web3Adapter) return undefined // not initialized

  const connectionInfo = await web3Adapter.getConnectionInfo()

  const versionInfo = [
    {
      group: versionInfoGroups.main,
      name: 'Your HQ',
      value: pkg.version,
    },
    {
      group: versionInfoGroups.modules,
      name: 'Web3.js',
      value: web3Adapter.web3.version,
    },
    {
      group: versionInfoGroups.modules,
      name: 'Q.js SDK',
      value: web3Adapter.SDK_VERSION,
    },
    {
      group: versionInfoGroups.client,
      name: 'RPC URL',
      value: connectionInfo.rpcUrl,
    },
    {
      group: versionInfoGroups.client,
      name: 'Network ID',
      value: connectionInfo.networkId,
    },
    {
      group: versionInfoGroups.client,
      name: 'Node Info',
      value: connectionInfo.nodeInfo,
    },
  ]

  return versionInfo
}
