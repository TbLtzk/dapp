import { getQVaultInstance } from 'contracts/contract-instance'
import { fromWei, toWei } from 'func/balance'
import { calculateGas, fromQ, getEthersQVaultInstance, toQ } from 'func/gasPrice'

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

export function getMaxQVaultWithdrawAmount (userQVaultBalance, qVaultLockedAmount) {
  const result = toQ(fromQ(userQVaultBalance).sub(fromQ(qVaultLockedAmount)))
  return result
}

export function getMaxQVaultVotingWeight (userQVaultBalance, userVotingWeight) {
  const result = toQ(fromQ(userQVaultBalance).sub(fromQ(userVotingWeight)))
  return result
}

export async function getQVaultDepositAmount (address, transferMax) {
  const contract = await getQVaultInstance()
  const ethersQVaultInstance = getEthersQVaultInstance(contract, 'qVaultInstance')
  const obj = await ethersQVaultInstance.estimateGas.deposit({ value: toWei(transferMax), from: address })
  const gas = calculateGas(obj)
  return toQ(fromQ(transferMax).sub(fromQ(gas)))
}
