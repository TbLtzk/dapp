import { netWork } from 'contracts/config/network-config';
import { contractsAbiTestnet } from 'contracts/abi-testnet/abiImports';
import { contractsAbiDevnet } from 'contracts/abi-devnet/abiImports';

let objContractsAbi = {};
if (netWork === 'devnet') {
  objContractsAbi = contractsAbiDevnet;
} else if (netWork === 'testnet') {
  objContractsAbi = contractsAbiTestnet;
}

export const contractsToAbi = {
  ...objContractsAbi
};
