import { contracts } from '../config/config'

import { fromWei } from 'func/balance'

export default class RootService {
  constructor () {
    this.contract = contracts.Root
    this.contractName = 'Root'
  }

  /**
   * get root members
   * @return array
   */
  async getRootMembers () {
    return await this.contract.methods.getMembers()
      .call()
  }

  /**
   * check is user is root member
   * @param userAddress
   * @return boolean
   */
  async checkMemberIsRoot (userAddress) {
    return await this.contract.methods.isMember(userAddress)
      .call()
  }

  /**
   * get member count
   * @return number
   */
  async getMemberCount () {
    return await this.contract.methods.getCount()
      .call()
  }

  /**
   * get root node stake
   *  @param node
   * @return number
   */
  async getRootNodeStake (node) {
    const balance = await this.contract.methods.getRootNodeStake(node)
      .call()
    return fromWei(balance)
  }

  /**
   * get root node data
   * @return array
   */
  async getRootNodeAllData () {
    const rootStakes = []
    const members = await this.getRootMembers()
    if (members) {
      for (const member of members) {
        await this.getRootNodeStake(member)
          .then((nodeStake) => {
            rootStakes.push(
              {
                address: member,
                stakeAmount: Number(nodeStake)
              }
            )
          })
      }
    }
    return rootStakes
  }

  /**
   * get root node data with calculation of share percents
   * @return array
   */
  async getRootCalc () {
    let rootNodeData
    let totalStakes
    return await this.getRootNodeAllData()
      .then((data) => {
        if (data.length) {
          totalStakes = data.reduce((sum, current) => {
            return sum + current.stakeAmount
          }, 0)
          rootNodeData = data.map((member, i) => {
            let share = 0
            if (totalStakes !== 0) {
              share = Math.ceil(member.stakeAmount * 100 / totalStakes)
            }
            return {
              ...member,
              share: share
            }
          })
          return {
            rootNodeData: rootNodeData.map((i, index) => { return { ...i, rank: index + 1 } }),
            totalStakes
          }
        }
      })
  }

  /**
   * commit stake
   * @return number
   */
  async stakeToPanel (data) {
    try {
      return await this.contract.methods.commitStake()
        .send(data)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * announce withdrawal
   * @param amount
   * @return number
   */
  async announceWithdrawal (amount, paymentInf) {
    try {
      return await this.contract.methods.announceWithdrawal(amount)
        .send(paymentInf)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * announce withdrawal
   * @param amount
   * @param payTo
   * @param paymentInf
   * @return number
   */
  async withdraw (amount, payTo, paymentInf) {
    try {
      return await this.contract.methods.withdraw(amount, payTo)
        .send(paymentInf)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * get withdrawals
   * @param userAddress
   * @return obj
   */
  async withdrawals (userAddress) {
    return await this.contract.methods.withdrawals(userAddress)
      .call()
  }
}
