import { fromWei } from 'func/balance'
import { getQVaultInstance } from 'contracts/contract-instance'

export async function getQVaultCompoundRateKeeper () {
  const contract = await getQVaultInstance()
  return await contract.instance.methods.compoundRateKeeper().call()
}

export function handleLockedAssetsResponse (data) {
  const resp = {
    votingWeight: 0,
    votingLockingEnd: 0
  }
  resp.votingWeight = data.lockedAmount ? Number(fromWei(data.lockedAmount)) : 0
  resp.votingLockingEnd = data.lockedUntil ? data.lockedUntil : 0
  return resp
}

export function handleDelegationsList (delegationsList) {
  const resultArr = []
  if (delegationsList === 0) {
    return []
  } else {
    for (const member of delegationsList) {
      resultArr.push({
        validator: member.validator,
        actualStake: fromWei(member.actualStake),
        claimableReward: fromWei(member.claimableReward)
      })
    }
    return resultArr
  }
}

export function getOutstandingDelegationRewardsList (delegationsList) {
  const sumArr = []
  if (delegationsList.length === 0) {
    return 0
  } else {
    for (const member of delegationsList) {
      sumArr.push(+fromWei(member?.claimableReward))
    }
    if (sumArr?.length !== 0) {
      const result = sumArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
      return result
    } else {
      return 0
    }
  }
}
