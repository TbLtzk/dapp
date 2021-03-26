import EPDR_Parameters from '../src/parameters/EPDR_Parameters';
import QPiggyBank from '../src/QPiggyBank';
import { BorrowingCoreQUSD } from '../src/BorrowingCore';
import { SavingQUSD } from '../src/Saving';
import { ContractRegistry } from '../src/ContractRegistry';
import { contractsToContractsRegistryKey as contToKey } from './contract-to-contractRegistryKey';

export const contractsToAddressesBase = {
  ContractRegistry: '0xc3E589056Ece16BCB88c6f9318e9a7343b663522',
};

const contractsToAddressesDynamic = {
  FxPriceFeed: '0x0000000000000000000000000000000000000000',
};

const contractsToAddressesCustom = {

  // Deprecated
  GovernedEpdrQethQusdOracle: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5',
  GovernedEpdrQethAddress: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5',
};

export const contractsToAddresses = {
  ...contractsToAddressesBase,
  ...contractsToAddressesDynamic,
  ...contractsToAddressesCustom,
};

export async function initAddresses() {
  const contractRegistry = new ContractRegistry();

  async function getAddress(objectKey) {
    contractsToAddresses[objectKey] = await contractRegistry.getAddress(contToKey[objectKey]);
  }

  await Promise.all(Object.keys(contToKey)
    .map(i => getAddress(i)));

  // EPDR_Parameters
  const epdrParametersContract = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);
  contractsToAddresses['GovernedEpdrQbtcAddress'] = await epdrParametersContract.getAddr(contToKey['GovernedEpdrQbtcAddress']);
  contractsToAddresses['GovernedEpdrQbtcQusdOracle'] = await epdrParametersContract.getAddr(contToKey['GovernedEpdrQbtcQusdOracle']);

  // BorrowingCoreQUSD
  const borrowingCoreQUSDContract = new BorrowingCoreQUSD(contractsToAddresses['BorrowingCoreQUSD']);
  contractsToAddresses['CompoundRateKeeperBorrowing'] = await borrowingCoreQUSDContract.compoundRateKeeper('QBTC');

  // SavingQUSD
  const savingQUSDContract = new SavingQUSD(contractsToAddresses['SavingQUSD']);
  contractsToAddresses['CompoundRateKeeperSaving'] = await savingQUSDContract.compoundRateKeeper();

  // QPiggyBank
  const qPiggyBankContract = new QPiggyBank(contractsToAddresses['QPiggyBank']);
  contractsToAddresses['CompoundRateKeeperPiggyBank'] = await qPiggyBankContract.compoundRateKeeper();
}
