import { setTransactionCounter } from 'store/actions/action-creaters/transaction-handler'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { fromWei } from 'func/balance'
import QVault from 'contracts/src/QVault'

export default class QVaultHandler {
  constructor (address, dispatch, alert) {
    this.dispatch = dispatch
    this.address = address
    this.alert = alert
    this.qvault = new QVault(contractsToAddresses.QVault)
  }

  async setUserBalance (stateSetter) {
    this.dispatch(setTransactionCounter(1))

    this.qvault.getUserBalance(this.address).then((res) => {
      const resL = fromWei(res)
      stateSetter(resL)
    }).catch((e) => {
      stateSetter(0)
      this.alert.error(e.message)
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1))
    })
  }

  setAccountBalance (stateSetter) {
    this.dispatch(setTransactionCounter(1))

    window.web3.eth.getBalance(this.address).then((res) => {
      const resL = fromWei(res)
      stateSetter(resL)
    }).catch((e) => {
      stateSetter(false)
      this.alert.error(e.message)
    }).finally(() => {
      this.dispatch(setTransactionCounter(-1))
    })
  }
}
