import { StakeDelegationInfo } from '@q-dev/q-js-sdk';
import { toBigNumber, transformToPercentage } from '@q-dev/utils';
import { fromWei, toWei } from 'web3-utils';

import { contractRegistryInstance, getQVaultInstance, getValidationRewardPoolsInstance } from 'contracts/contract-instance';

export async function getQHolderRewardPool () {
  const address = await contractRegistryInstance?.instance.methods.getAddress('tokeneconomics.qHolderRewardPool').call();
  const balance = await window.web3.eth.getBalance(address || '');
  return fromWei(balance);
}

export function countTotalStakeReward (delegationsList: StakeDelegationInfo[]) {
  return delegationsList
    .map((member) => Number(fromWei(member.claimableReward)))
    .reduce((acc, curr) => acc + curr, 0);
}

export async function getQVaultDepositAmount (address: string) {
  const amount = await window.web3.eth.getBalance(address);
  if (Number(amount) <= 0) {
    return '0';
  }

  const contract = await getQVaultInstance();
  const fee = await contract.instance.methods.deposit().estimateGas({ value: amount, from: address });
  const gas = fromWei(String(fee * 50), 'gwei');

  const result = toBigNumber(amount).minus(toWei(gas)).toString(10);
  return fromWei(result);
}

export async function getDelegatorsShare (delegation: StakeDelegationInfo) {
  const validatorInstance = await getValidationRewardPoolsInstance();
  const delegatorsShare = await validatorInstance.getDelegatorsShare(delegation.validator);
  return {
    ...delegation,
    claimableReward: fromWei(delegation.claimableReward),
    actualStake: fromWei(delegation.actualStake),
    idealStake: fromWei(delegation.idealStake),
    normalizedStake: fromWei(delegation.normalizedStake),
    delegatorsShare: transformToPercentage(delegatorsShare)
  };
}
