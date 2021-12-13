import { getRootNodesInstance } from 'contracts/contract-instance'
import { fromWei } from 'func/balance'

const getRootNodeAllData = async () => {
  const contract = await getRootNodesInstance()
  const members = await contract.getMembers()
  const rootStakes = []
  for (const member of members) {
    const rootNodeStake = await contract.getRootNodeStake(member)
    rootStakes.push({
      address: member,
      stakeAmount: Number(fromWei(rootNodeStake))
    })
  }
  return rootStakes
}

export const getRootCalc = async () => {
  const rootStakes = await getRootNodeAllData()

  const totalStakes = rootStakes.reduce((sum, current) => sum + current.stakeAmount, 0)
  const rootNodeData = rootStakes.map((member, idx) => ({
    ...member,
    rank: idx + 1,
    share: totalStakes ? Math.round(((member.stakeAmount * 100) / totalStakes + Number.EPSILON) * 100) / 100 : 0
  }))

  return {
    rootNodeData,
    totalStakes
  }
}
