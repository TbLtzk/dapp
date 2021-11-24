import { remainDateTimeSince } from 'func/convertDate'
import { fromWei } from 'func/balance'
import {
  getSystemReserveInstance,
  getValidationRewardPoolsInstance,
  getCompoundRateKeeperQVaultInstance,
  getValidationRewardProxyInstance,
  getDefaultAllocationProxyInstance,
  getRootNodeRewardProxyInstance,
  contractRegistryInstance
} from 'contracts/contract-instance'
import { BN, fN } from 'func/useful'
import ErrorHandler from 'func/ErrorHandler'
import { setErrorMessage } from 'store/transaction-handler/action-creators'

export default class Handler {
  constructor (userAddress, dispatch) {
    this.userAddress = userAddress
    this.dispatch = dispatch
  }

  async allocateValue (contract, stateSetter, stateLoading) {
    try {
      stateLoading(true)
      await contract.allocate({ from: this.userAddress })
      const balance = await contract.getBalance()
      stateSetter(fN(balance))
    } catch (error) {
      const errorMsg = ErrorHandler.process(error)
      this.dispatch(setErrorMessage(errorMsg))
    } finally {
      stateLoading(false)
    }
  }

  async getDefaultAllocationProxy (stateSetter, stateLoading, isAllocate, allocateStateSetters) {
    try {
      stateLoading(true)
      const contract = await getDefaultAllocationProxyInstance()
      if (isAllocate) {
        await this.allocateValue(contract, stateSetter, stateLoading)
      } else {
        const balance = await contract.getBalance()
        stateSetter(fN(balance))
      }
    } catch (error) {
      const errorMsg = ErrorHandler.process(error)
      this.dispatch(setErrorMessage(errorMsg))
    } finally {
      stateLoading(false)
    }
  }

  async getRootNodeRewardProxy (stateSetter, stateLoading, isAllocate) {
    try {
      stateLoading(true)
      const contract = await getRootNodeRewardProxyInstance()
      if (isAllocate) {
        await this.allocateValue(contract, stateSetter, stateLoading)
      } else {
        const balance = await contract.getBalance()
        stateSetter(fN(balance))
      }
    } catch (error) {
      const errorMsg = ErrorHandler.process(error)
      this.dispatch(setErrorMessage(errorMsg))
    } finally {
      stateLoading(false)
    }
  }

  async getValidationRewardProxy (stateSetter, stateLoading, isAllocate) {
    try {
      stateLoading(true)
      const contract = await getValidationRewardProxyInstance()
      if (isAllocate) {
        await contract.allocate({ from: this.userAddress })
        const balance = await contract.getBalance()
        stateSetter(fN(balance))
      } else {
        const balance = await contract.getBalance()
        stateSetter(fN(balance))
      }
    } catch (error) {
      const errorMsg = ErrorHandler.process(error)
      this.dispatch(setErrorMessage(errorMsg))
    } finally {
      stateLoading(false)
    }
  }

  async getQHolderRewardPool (stateSetter) {
    const address = await contractRegistryInstance.instance.methods
      .getAddress('tokeneconomics.qHolderRewardPool')
      .call()
    const balance = await window.web3.eth.getBalance(address)
    stateSetter(this.transformValue(fromWei(balance)))
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
    try {
      const contract = await getCompoundRateKeeperQVaultInstance()
      const result = await contract.getLastUpdate()
      stateSetterUnixTimestamp(result)
      const transformTime = remainDateTimeSince(result)
      stateSetter(transformTime)
    } catch {
      stateSetterUnixTimestamp(0)
    }
  }
}
