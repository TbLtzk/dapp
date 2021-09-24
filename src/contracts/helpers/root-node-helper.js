import { getRootNodesInstance } from 'contracts/contract-instance'
import { fromWei } from 'func/balance'

const getRootNodeStake = async (node) => {
  const contract = await getRootNodesInstance()
  const balance = await contract.getRootNodeStake(node)
  return fromWei(balance)
}

const getRootMembers = async () => {
  const contract = await getRootNodesInstance()
  return await contract.getMembers()
}

const getRootNodeAllData = async () => {
  const rootStakes = []
  const members = await getRootMembers()
  if (members) {
    for (const member of members) {
      await getRootNodeStake(member).then((nodeStake) => {
        rootStakes.push({
          address: member,
          stakeAmount: Number(nodeStake)
        })
      })
    }
  }
  return rootStakes
}

export const getRootCalc = async () => {
  let rootNodeData
  let totalStakes
  return await getRootNodeAllData().then((data) => {
    if (data.length) {
      totalStakes = data.reduce((sum, current) => {
        return sum + current.stakeAmount
      }, 0)
      rootNodeData = data.map((member, i) => {
        let share = 0
        if (totalStakes !== 0) {
          share = Math.ceil((member.stakeAmount * 100) / totalStakes)
        }
        return {
          ...member,
          share: share
        }
      })
      return {
        rootNodeData: rootNodeData.map((i, index) => {
          return { ...i, rank: index + 1 }
        }),
        totalStakes
      }
    }
  })
}
