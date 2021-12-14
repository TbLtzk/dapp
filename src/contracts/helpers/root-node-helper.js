import { fromWei } from 'func/balance'

export const getMemberStake = async (contract, member) => {
  const rootNodeStake = await contract.getRootNodeStake(member)
  return {
    address: member,
    stakeAmount: Number(fromWei(rootNodeStake))
  }
}

export const getRootCalc = (rootStakes) => {
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
