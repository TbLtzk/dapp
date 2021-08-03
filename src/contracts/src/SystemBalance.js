import { contracts } from '../config/config'
import { fromWei } from 'func/balance'

export default class SystemBalance {
  constructor () {
    this.contract = contracts.SystemBalance
  }

  async getSurplus () {
    return fromWei(
      await this.contract.methods.getSurplus()
        .call()
    )
  }

  async getDebt () {
    return fromWei(
      await this.contract.methods.getDebt()
        .call()
    )
  }

  async getBalance () {
    return fromWei(
      await this.contract.methods.getBalance()
        .call()
    )
  }

  async performNetting (address) {
    return await this.contract.methods.performNetting()
      .send({ from: address })
  }
}
