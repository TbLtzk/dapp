import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import DefaultAllocationProxy from 'contracts/src/proxy/DefaultAllocationProxy'
import RootNodeRewardProxy from 'contracts/src/proxy/RootNodeRewardProxy'
import ValidationRewardProxy from 'contracts/src/proxy/ValidationRewardProxy'
import QVault from 'contracts/src/QVault'
import CompoundRateKeeper from 'contracts/src/CompoundRateKeeper'
import ContractBalance from 'contracts/handler/ContractBalance'

import { remainDateTimeSince } from 'func/convertDate'
import { fromWei } from 'func/balance'

export default class Handler {
  constructor (userAddress) {
    this.userAddress = userAddress
    this.DefaultAllocationProxy = new DefaultAllocationProxy('DefaultAllocationProxy')
    this.RootNodeRewardProxy = new RootNodeRewardProxy('RootNodeRewardProxy')
    this.ValidationRewardProxy = new ValidationRewardProxy('ValidationRewardProxy')
    this.QVault = new QVault(contractsToAddresses.QVault)
    this.CompoundRateKeeperQVault = new CompoundRateKeeper('CompoundRateKeeperQVault')
    this.ContractBalance = new ContractBalance(this.userAddress)
  }

  allocateValue (contract, stateSetter, stateLoading) {
    contract.allocate(this.userAddress)
      .then(val => {
        this.ContractBalance.getBalanceValue(contract.contractName, stateSetter)
        stateLoading(false)
      })
      .catch(e => {
        console.error('e', e)
        stateSetter(0)
        stateLoading(false)
      })
  }

  getDefaultAllocationProxy (stateSetter, stateLoading, isAllocate, allocateStateSetters) {
    stateLoading(true)
    if (isAllocate) {
      this.allocateValue(this.DefaultAllocationProxy, stateSetter, stateLoading)
    } else {
      this.ContractBalance.getBalanceValue('DefaultAllocationProxy', stateSetter)
    }
  }

  getRootNodeRewardProxy (stateSetter, stateLoading, isAllocate) {
    stateLoading(true)
    if (isAllocate) {
      this.allocateValue(this.RootNodeRewardProxy, stateSetter, stateLoading)
    } else {
      this.ContractBalance.getBalanceValue('RootNodeRewardProxy', stateSetter)
    }
  }

  getValidationRewardProxy (stateSetter, stateLoading, isAllocate) {
    stateLoading(true)
    if (isAllocate) {
      this.ValidationRewardProxy.allocate(this.userAddress)
        .then(val => {
          window.web3.eth.getBalance(contractsToAddresses.ValidationRewardProxy)
            .then(
              res => {
                const transf = fromWei(res)
                stateSetter(transf)
                stateLoading(false)
              }
            )
            .catch(e => {
              console.error('e', e)
              stateSetter(0)
              stateLoading(false)
            })
        })
        .catch(e => {
          console.error('e', e)
          stateSetter(0)
          stateLoading(false)
        })
    } else {
      window.web3.eth.getBalance(contractsToAddresses.ValidationRewardProxy)
        .then(
          res => {
            const transf = fromWei(res)
            stateSetter(transf)
            stateLoading(false)
          }
        )
        .catch(e => {
          console.error('e', e)
          stateSetter(0)
          stateLoading(false)
        })
    }
  }

  getQHolderRewardPool (stateSetter) {
    this.ContractBalance.getBalanceValue('QHolderRewardPool', stateSetter)
  }

  getSystemReserve (stateSetter) {
    this.ContractBalance.getBalanceValue('SystemReserve', stateSetter)
  }

  getValidationRewardPools (stateSetter) {
    this.ContractBalance.getBalanceValue('ValidationRewardPools', stateSetter)
  }

  getTimeSinceQHolderRewardUpdate (stateSetter, stateSetterUnixTimestamp) {
    this.CompoundRateKeeperQVault.getLastUpdate()
      .then(
        res => {
          stateSetterUnixTimestamp(res)
          const transformTime = remainDateTimeSince(res)
          stateSetter(transformTime)
        }
      )
      .catch(e => {
        stateSetter(0)
        stateSetterUnixTimestamp(0)
      })
  }

  refreshTimeSinceQHolderRewardUpdate (stateSetter, stateLoading, stateSetterUnixTimestamp) {
    stateLoading(true)
    this.QVault.updateCompoundRate(this.userAddress)
      .then(
        res => {
          this.getTimeSinceQHolderRewardUpdate(stateSetter, stateSetterUnixTimestamp)
          stateLoading(false)
        }
      )
      .catch(e => {
        stateSetter(0)
        stateLoading(false)
      })
  }
}
