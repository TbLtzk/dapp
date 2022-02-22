import { contractRegistryInstance, getQVaultInstance } from 'contracts/contract-instance'
import { calculateGas, fromWei, toWei } from 'func/balance'
import { BN } from 'func/useful'

export async function getQVaultCompoundRateKeeper () {
  const contract = await getQVaultInstance()
  return await contract.instance.methods.compoundRateKeeper().call()
}

export async function getQHolderRewardPool () {
  const address = await contractRegistryInstance.instance.methods.getAddress('tokeneconomics.qHolderRewardPool').call()
  const balance = await window.web3.eth.getBalance(address)
  return fromWei(balance)
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
  if (!Number(transferMax)) {
    return 0
  } else {
    const contract = await getQVaultInstance()
    const fee = await contract.instance.methods.deposit().estimateGas({ value: toWei(transferMax), from: address })
    const gas = calculateGas(fee)
    const result = BN(toWei(transferMax)).minus(toWei(gas)).toString()
    return fromWei(result)
  }
}
