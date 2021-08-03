import { contractsToAbi } from '../mapping/contract-to-abi'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'

const getContracts = () => {
  const contracts = {}
  // eslint-disable-next-line no-restricted-syntax
  for (const contractName in contractsToAddresses) {
    if (contractName in contractsToAddresses && contractName in contractsToAbi) {
      contracts[contractName] = new window.web3.eth.Contract(contractsToAbi[contractName], contractsToAddresses[contractName])
    } else {
      // console.warn(`${contractName} missing in mapping when creating drizzle config!`);
    }
  }
  return contracts
}

export const contracts = getContracts()
