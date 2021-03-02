import EPDR_Parameters from '../src/parameters/EPDR_Parameters';
import { ContractRegistry } from '../src/ContractRegistry';
import { contractsToContractsRegistryKey as contToKey } from './contract-to-contractRegistryKey';

export const contractsToAddressesBase = {
  ContractRegistry: '0xc3E589056Ece16BCB88c6f9318e9a7343b663522',
};

const contractsToAddressesDynamic = {
  FxPriceFeed: '0x0000000000000000000000000000000000000000',
};

const contractsToAddressesCustom = {
  CompoundRateKeeperPiggyBank: '0x9f8cEE0e0fa33b5537f47e44bd682C881ff1847f', // compoundRateKeeper
  CompoundRateKeeperSaving: '0xDbD3A62aAe37b07ecfaccd2B4fc772F0666dc132', // compoundRateKeeper
  CompoundRateKeeperBorrowing: '0x314b63b7Beabe501642a197e5970e64C602b2D44', //borrowing compoundRateKeeper

  // Deprecated
  GovernedEpdrQethQusdOracle: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5',
  GovernedEpdrQethAddress: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5',
};

export const contractsToAddresses = {
  ...contractsToAddressesBase,
  ...contractsToAddressesDynamic,
  ...contractsToAddressesCustom,
};

export async function initAddresses () {
  console.log('------------')
  const contractRegistry = new ContractRegistry()
  for (const contractName in contToKey) {
    contractsToAddresses[contractName] = await contractRegistry.getAddress(contToKey[contractName])
  }

  // EPDR_Parameters
  const epdrParametersContract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters'])
  contractsToAddresses['GovernedEpdrQbtcAddress'] = await epdrParametersContract.getAddr(contToKey['GovernedEpdrQbtcAddress'])
  contractsToAddresses['GovernedEpdrQbtcQusdOracle'] = await epdrParametersContract.getAddr(contToKey['GovernedEpdrQbtcQusdOracle'])

  // const keys = await constitutionParametersContract.getAddrKeys()
  // console.log('keys', keys)
  // console.log(keys.forEach(i => console.log(i)))


  console.log('contractsToAddresses', contractsToAddresses)
  console.log('------------')
}
