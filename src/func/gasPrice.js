import { toWei } from 'func/balance'
import { getQVaultInstance } from 'contracts/contract-instance'
import { ethers, utils } from 'ethers'

const provider = new ethers.providers.Web3Provider(window.ethereum)

export async function getQVaultWithrawMax (address, transferMax) {
  const contract = await getQVaultInstance()
  const ethersQVaultInstance = getEthersQVaultInstance(contract, 'qVaultInstance')

  const obj = await ethersQVaultInstance.estimateGas.deposit({ value: toWei(transferMax), from: address })
  const gas = calculateGas(obj)
  const obj2 = await ethersQVaultInstance.estimateGas.deposit({ value: toWei(transferMax - gas), from: address })

  return Number(transferMax) - calculateGas(obj2)
}

const calculateGas = (data) => {
  return Number((utils.formatUnits(data, 'gwei') * 50).toFixed(6))
}

function fromCache () {
  const cache = {}
  return (instance, instanceName) => {
    if (!cache[instanceName]) {
      cache[instanceName] = new ethers.Contract(instance.address, instance.instance._jsonInterface, provider)
    }
    return cache[instanceName]
  }
}

const getEthersQVaultInstance = fromCache()
