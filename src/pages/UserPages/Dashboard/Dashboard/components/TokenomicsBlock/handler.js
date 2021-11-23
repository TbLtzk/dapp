import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import DefaultAllocationProxy from 'contracts/src/proxy/DefaultAllocationProxy'
import RootNodeRewardProxy from 'contracts/src/proxy/RootNodeRewardProxy'
import ValidationRewardProxy from 'contracts/src/proxy/ValidationRewardProxy'
import CompoundRateKeeper from 'contracts/src/CompoundRateKeeper'
import ContractBalance from 'contracts/handler/ContractBalance'

import { remainDateTimeSince } from 'func/convertDate'
import { fromWei } from 'func/balance'
import { getSystemReserveInstance, getValidationRewardPoolsInstance } from 'contracts/contract-instance'
import { BN, fN } from 'func/useful'

export default class Handler {
  constructor (userAddress) {
    this.userAddress = userAddress
    this.DefaultAllocationProxy = new DefaultAllocationProxy('DefaultAllocationProxy')
    this.RootNodeRewardProxy = new RootNodeRewardProxy('RootNodeRewardProxy')
    this.ValidationRewardProxy = new ValidationRewardProxy('ValidationRewardProxy')
    this.CompoundRateKeeperQVault = new CompoundRateKeeper('CompoundRateKeeperQVault')
    this.ContractBalance = new ContractBalance(this.userAddress)
  }

  allocateValue (contract, stateSetter, stateLoading) {
    contract
      .allocate(this.userAddress)
      .then((val) => {
        this.ContractBalance.getBalanceValue(contract.contractName, stateSetter)
        stateLoading(false)
      })
      .catch((e) => {
        console.error('e', e)
        stateLoading(false)
      })
  }

  getDefaultAllocationProxy (stateSetter, stateLoading, isAllocate, allocateStateSetters) {
    stateLoading(true)
    try {
      if (isAllocate) {
        this.allocateValue(this.DefaultAllocationProxy, stateSetter, stateLoading)
      } else {
        this.ContractBalance.getBalanceValue('DefaultAllocationProxy', stateSetter)
      }
    } catch {
      stateLoading(false)
    }
  }

  getRootNodeRewardProxy (stateSetter, stateLoading, isAllocate) {
    try {
      stateLoading(true)
      if (isAllocate) {
        this.allocateValue(this.RootNodeRewardProxy, stateSetter, stateLoading)
      } else {
        this.ContractBalance.getBalanceValue('RootNodeRewardProxy', stateSetter)
      }
    } catch {
      stateLoading(false)
    }
  }

  getValidationRewardProxy (stateSetter, stateLoading, isAllocate) {
    stateLoading(true)
    if (isAllocate) {
      this.ValidationRewardProxy.allocate(this.userAddress)
        .then((val) => {
          window.web3.eth
            .getBalance(contractsToAddresses.ValidationRewardProxy)
            .then((res) => {
              const transf = fromWei(res)
              stateSetter(transf)
              stateLoading(false)
            })
            .catch((e) => {
              stateLoading(false)
            })
        })
        .catch((e) => {
          stateLoading(false)
        })
    } else {
      window.web3.eth
        .getBalance(contractsToAddresses.ValidationRewardProxy)
        .then((res) => {
          const transf = fromWei(res)
          stateSetter(transf)
          stateLoading(false)
        })
        .catch((e) => {
          console.error('e', e)
          stateLoading(false)
        })
    }
  }

  async getQHolderRewardPool (stateSetter) {
    this.ContractBalance.getBalanceValue('QHolderRewardPool', stateSetter)
  }

  async getSystemReserve (setSystemReserve) {
    const contract = await getSystemReserveInstance()
    const amount = await contract.getBalance()
    setSystemReserve(this.transformValue(amount))
  }

  async getValidationRewardPools (setValidationRewardPools) {
    const contract = await getValidationRewardPoolsInstance()
    const amount = await contract.getBalance()
    setValidationRewardPools(this.transformValue(amount))
  }

  transformValue (value) {
    const transformed = BN(value).toFixed()
    return fN(transformed)
  }

  async getTimeSinceQHolderRewardUpdate (stateSetter, stateSetterUnixTimestamp) {
    this.CompoundRateKeeperQVault.getLastUpdate()
      .then((res) => {
        stateSetterUnixTimestamp(res)
        const transformTime = remainDateTimeSince(res)
        stateSetter(transformTime)
      })
      .catch((e) => {
        stateSetterUnixTimestamp(0)
      })
  }
}
