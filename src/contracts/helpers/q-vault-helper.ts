import { StakeDelegationInfo } from '@q-dev/q-js-sdk';

import { contractRegistryInstance, getQVaultInstance } from 'contracts/contract-instance';

import { fromWei, toWei } from 'utils/balance';
import { BN } from 'utils/useful';

export async function getQHolderRewardPool () {
  const address = await contractRegistryInstance?.instance.methods.getAddress('tokeneconomics.qHolderRewardPool').call();
  const balance = await window.web3.eth.getBalance(address || '');
  return fromWei(balance);
}

export function getOutstandingDelegationRewardsList (delegationsList: StakeDelegationInfo[]) {
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
  const gas = window.web3.utils.fromWei(String(fee * 50), 'gwei');

  const result = BN(amount).minus(toWei(gas)).toString();
  return fromWei(result);
}
