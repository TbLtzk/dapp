import { remainDateTimeSince } from 'func/convertDate'
import {
  getCompoundRateKeeperQVaultInstance,
  getValidationRewardProxyInstance,
  getDefaultAllocationProxyInstance,
  getRootNodeRewardProxyInstance
} from 'contracts/contract-instance'
import { fN } from 'func/useful'
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

  async getDefaultAllocationProxy (stateSetter, stateLoading, isAllocate) {
    const contract = await getDefaultAllocationProxyInstance()
    if (isAllocate) {
      await this.allocateValue(contract, stateSetter, stateLoading)
    } else {
      const balance = await contract.getBalance()
      stateSetter(fN(balance))
    }
  }

  async getRootNodeRewardProxy (stateSetter, stateLoading, isAllocate) {
    const contract = await getRootNodeRewardProxyInstance()
    if (isAllocate) {
      await this.allocateValue(contract, stateSetter, stateLoading)
    } else {
      const balance = await contract.getBalance()
      stateSetter(fN(balance))
    }
  }

  async getValidationRewardProxy (stateSetter, stateLoading, isAllocate) {
    const contract = await getValidationRewardProxyInstance()
    if (isAllocate) {
      await contract.allocate({ from: this.userAddress })
      const balance = await contract.getBalance()
      console.log(balance)
      stateSetter(fN(balance))
    } else {
      const balance = await contract.getBalance()
      stateSetter(fN(balance))
    }
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
