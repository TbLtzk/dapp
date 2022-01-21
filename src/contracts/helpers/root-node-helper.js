import { fromWei } from 'func/balance'
import { orderBy } from 'lodash'

export const prepareRootMembersTable = (members, membersWithStakes) => {
  const convertStake = membersWithStakes.map((member) => ({
    address: member.root,
    stakeAmount: Number(fromWei(member.value))
  }))

  const totalStake = convertStake.reduce((sum, current) => sum + current.stakeAmount, 0)

  const arrayAddresses = membersWithStakes.map((member) => member.root)

  const membersWithoutStakes = members
    .filter((address) => !arrayAddresses.includes(address))
    .map((address) => ({ address, stakeAmount: 0 }))

  const addShare = [...convertStake, ...membersWithoutStakes].map((member) => ({
    ...member,
    share: totalStake ? Math.round(((member.stakeAmount * 100) / totalStake + Number.EPSILON) * 100) / 100 : 0
  }))

  return { table: orderBy(addShare, ['stakeAmount'], ['desc', 'asc']), totalStake }
}
