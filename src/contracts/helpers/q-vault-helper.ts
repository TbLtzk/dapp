import { StakeDelegationInfo } from '@q-dev/q-js-sdk';
import { transformToPercentage } from '@q-dev/utils';

import { contractRegistryInstance, currentProvider, getQVaultInstance, getValidationRewardPoolsInstance } from 'contracts/contract-instance';

import { fromWei, toWei } from 'utils/web3';

export async function getQHolderRewardPool () {
  const address = await contractRegistryInstance?.instance.getAddress('tokeneconomics.qHolderRewardPool');
  const balance = await currentProvider?.getBalance(address || '');
  return fromWei(balance || '0');
}

export function countTotalStakeReward (delegationsList: StakeDelegationInfo[]) {
  return delegationsList
    .map((member) => Number(fromWei(member.claimableReward)))
    .reduce((acc, curr) => acc + curr, 0);
}

export async function getQVaultDepositAmount (address: string) {
  const amount = await currentProvider?.getBalance(address);
  if (!amount || amount.isZero()) return '0';

  const contract = await getQVaultInstance();
  const fee = await contract.instance.estimateGas.deposit({ value: amount, from: address });
  const gas = fromWei(fee.mul(50), 'gwei');

  const result = amount.sub(toWei(gas)).toString();
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
