import { fromWei } from 'func/balance'
import { contractsToAbi } from '../../contracts/mapping/contract-to-abi'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'

let contract = null

export function getContract () {
  if (contract === null) {
    contract = new window.web3.eth.Contract(contractsToAbi.QVault, contractsToAddresses.QVault)
  }
  return contract
}

export async function updateCompoundRate (address) {
  const contract = getContract()
  return await contract.methods.updateCompoundRate().send({ from: address })
}

export async function getBalanceDetails () {
  const contract = getContract()
  return await contract.methods.getBalanceDetails().call()
}

export async function getQVaultCompoundRateKeeper () {
  const contract = getContract()
  return await contract.methods.compoundRateKeeper().call()
}

export async function claimStakeDelegatorReward (address) {
  const contract = getContract()
  return await contract.methods.claimStakeDelegatorReward().send({ from: address })
}

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
