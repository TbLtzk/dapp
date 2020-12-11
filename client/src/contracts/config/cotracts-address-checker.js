import { contractsToContractsRegistryKey as contToKey } from '../mapping/contract-to-contractRegistryKey';
import { contractsToAddresses } from '../mapping/contract-to-address';

import { drizzleRegistry } from './drizzle-config';

export default async function validateContractsAddress() {
  console.log('Begin upload contracts address...');

  let address = '';
  const contractsAddressLoc = {};

  for (const contractName in contToKey) {
    // eslint-disable-next-line no-await-in-loop
    address = await drizzleRegistry
      .contracts.ContractRegistry.methods.getAddress(contToKey[contractName]).call();
    console.log('.');
    contractsAddressLoc[contractName] = address;
  }
  // console.log(contractsAddressLoc);

  console.log('Upload complete. Contract address up to date check.');

  let needToUpdate = false;
  for (const contractName in contToKey) {
    if (!(contractName in contractsToAddresses)) {
      console.warn(`Contract "${contractName}" not exist in 'contractsAddress'.`);
      needToUpdate = true;
    } else if (contractsAddressLoc[contractName] !== contractsToAddresses[contractName]) {
      console.warn(`Contract "${contractName}" changed address, from ${contractsToAddresses[contractName]} to ${contractsAddressLoc[contractName]}.`);
      needToUpdate = true;
    }
  }

  if (needToUpdate === true) {
    console.error("'contractsAddress' need to updates!", '');
  } else {
    console.log('Data is actual!');
  }

  return needToUpdate;
}
