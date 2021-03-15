import Web3 from 'web3';
import { Drizzle } from '@drizzle/store';

import { contractsToAbi } from '../mapping/contract-to-abi';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { netWork } from 'contracts/config/network-config';
import validateContractsAddress from './cotracts-address-checker';
export const web3 = new Web3(Web3.givenProvider);
web3.eth.handleRevert = true;

let netWorkRPC = "";
if (netWork === "devnet"){
  netWorkRPC = "54.218.22.38"; //devnet
}else if (netWork === "testnet"){
  netWorkRPC = "18.158.7.68"; //testnet
}

const port = "8545";

const optionsDrizzleBase = {
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://' + netWorkRPC + port,
    },
  },
};

const optionsDrizzleRegistry = {
  contracts: [
    {
      contractName: 'ContractRegistry',
      web3Contract: new web3.eth.Contract(contractsToAbi.ContractRegistry, contractsToAddresses.ContractRegistry),
    },
  ],
  ...optionsDrizzleBase,
};

const optionsDrizzle = () => {
  const contracts = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const contractName in contractsToAddresses) {
    if (contractName in contractsToAddresses && contractName in contractsToAbi) {
      contracts.push({
        contractName,
        web3Contract: new web3.eth.Contract(contractsToAbi[contractName], contractsToAddresses[contractName]),
      });
    } else {
      // console.warn(`${contractName} missing in mapping when creating drizzle config!`);
    }
  }
  return { contracts, ...optionsDrizzleBase };
};

const getContracts = () => {
  const contracts = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const contractName in contractsToAddresses) {
    if (contractName in contractsToAddresses && contractName in contractsToAbi) {
      contracts[contractName] = new web3.eth.Contract(contractsToAbi[contractName], contractsToAddresses[contractName]);
    } else {
      // console.warn(`${contractName} missing in mapping when creating drizzle config!`);
    }
  }
  return contracts;
};

console.log('optionsDrizzle()', optionsDrizzle())

export const drizzleRegistry = new Drizzle(optionsDrizzle());
console.log("drizzleRegistry", drizzleRegistry);
// export const drizzleRegistry = new Drizzle(optionsDrizzleRegistry);
export const contracts = getContracts();
