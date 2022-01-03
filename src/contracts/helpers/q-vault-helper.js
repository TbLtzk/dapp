import { getQVaultInstance } from 'contracts/contract-instance'
import { calculateGas, fromWei, toWei } from 'func/balance'
import { BN } from 'func/useful'

export async function getQVaultCompoundRateKeeper () {
  const contract = await getQVaultInstance()
  return await contract.instance.methods.compoundRateKeeper().call()
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

export async function getQVaultDepositAmount (address, transferMax) {
  const contract = await getQVaultInstance()

  const fee = await contract.instance.methods.deposit().estimateGas({ value: toWei(transferMax), from: address })
  const gas = calculateGas(fee)
  const result = BN(toWei(transferMax)).minus(toWei(gas)).toString()

  return fromWei(result)
}
