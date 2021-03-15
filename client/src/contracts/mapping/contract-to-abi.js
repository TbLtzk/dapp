import { netWork, NETWORK_TYPES } from 'contracts/config/network-config';
import { contractsAbiTestnet } from 'contracts/abi-testnet/abiImports';
import { contractsAbiDevnet } from 'contracts/abi-devnet/abiImports';

let objContractsAbi = {};
if (netWork === NETWORK_TYPES.devnet) {
  objContractsAbi = contractsAbiDevnet;
} else if (netWork === NETWORK_TYPES.testnet) {
  objContractsAbi = contractsAbiTestnet;
}

export const contractsToAbi = {
  ...objContractsAbi
};
