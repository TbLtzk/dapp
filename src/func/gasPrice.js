import { ethers, utils } from 'ethers'

const provider = new ethers.providers.Web3Provider(window.ethereum)

function fromCache () {
  const cache = {}
  return (instance, instanceName) => {
    if (!cache[instanceName]) {
      cache[instanceName] = new ethers.Contract(instance.address, instance.instance._jsonInterface, provider)
    }
    return cache[instanceName]
  }
}

export function fromQ (value) {
  return utils.parseUnits(String(value))
}

export function toQ (value) {
  return utils.formatEther(String(value))
}

export const getEthersQVaultInstance = fromCache()

export function calculateGas (data) {
  return Number((utils.formatUnits(data, 'gwei') * 50).toFixed(6))
}
