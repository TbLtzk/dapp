import EPDR_Parameters from '../src/parameters/EPDR_Parameters'
import QVault from '../src/QVault'
import { BorrowingCoreQUSD } from '../src/BorrowingCore'
import { SavingQUSD } from '../src/Saving'
import { contractsToContractsRegistryKey as contToKey } from './contract-to-contractRegistryKey'
import {
  CONTRACT_REGISTRY_ADDRESS,
  contractRegistryInstance
} from '../contracts'

export const contractsToAddressesBase = {
  ContractRegistry: CONTRACT_REGISTRY_ADDRESS
}

const contractsToAddressesDynamic = {
  FxPriceFeed: '0x0000000000000000000000000000000000000000'
}

const contractsToAddressesCustom = {

  // Deprecated
  GovernedEpdrQethQusdOracle: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5',
  GovernedEpdrQethAddress: '0x62BD936432C97cD2A2908Bf1973e3ec3a68F81B5'
}

export const contractsToAddresses = {
  ...contractsToAddressesBase,
  ...contractsToAddressesDynamic,
  ...contractsToAddressesCustom
}

export async function initAddresses () {
  async function getAddress (objectKey) {
    contractsToAddresses[objectKey] = await contractRegistryInstance.instance.methods.getAddress(contToKey[objectKey])
      .call()
  }

  await Promise.all(Object.keys(contToKey)
    .map(i => getAddress(i)))

  // EPDR_Parameters
  const epdrParametersContract = new EPDR_Parameters(contractsToAddresses.EPDR_Parameters)
  contractsToAddresses.GovernedEpdrQbtcAddress = await epdrParametersContract.getAddr(contToKey.GovernedEpdrQbtcAddress)
  contractsToAddresses.GovernedEpdrQbtcQusdOracle = await epdrParametersContract.getAddr(contToKey.GovernedEpdrQbtcQusdOracle)

  // BorrowingCoreQUSD
  const borrowingCoreQUSDContract = new BorrowingCoreQUSD(contractsToAddresses.BorrowingCoreQUSD)
  contractsToAddresses.CompoundRateKeeperBorrowing = await borrowingCoreQUSDContract.compoundRateKeeper('QBTC')

  // SavingQUSD
  const savingQUSDContract = new SavingQUSD(contractsToAddresses.SavingQUSD)
  contractsToAddresses.CompoundRateKeeperSaving = await savingQUSDContract.compoundRateKeeper()

  // QVault
  const qVaultContract = new QVault(contractsToAddresses.QVault)
  contractsToAddresses.CompoundRateKeeperQVault = await qVaultContract.compoundRateKeeper()
}
