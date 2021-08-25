import { fromWei } from 'func/balance'

export function handleLockedAssetsResponse (data) {
  const resp = {
    votingWeight: 0,
    votingLockingEnd: 0
  }
  if (undefined !== data[0]) {
    resp.votingWeight = fromWei(data.lockedAmount)
  }
  if (undefined !== data[1]) {
    // eslint-disable-next-line prefer-destructuring
    resp.votingLockingEnd = data.lockedUntil
  }
  return resp
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
