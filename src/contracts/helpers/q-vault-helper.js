import { contractRegistryInstance, getQVaultInstance } from 'contracts/contract-instance';

import { calculateGas, fromWei, toWei } from 'func/balance';
import { BN } from 'func/useful';

export async function getQHolderRewardPool () {
  const address = await contractRegistryInstance.instance.methods.getAddress('tokeneconomics.qHolderRewardPool').call();
  const balance = await window.web3.eth.getBalance(address);
  return fromWei(balance);
}

export function getOutstandingDelegationRewardsList (delegationsList) {
  return delegationsList.map((member) => Number(fromWei(member?.claimableReward))).reduce((acc, curr) => acc + curr, 0);
}

export async function getQVaultDepositAmount (address) {
  const amount = await window.web3.eth.getBalance(address);
  if (Number(amount) <= 0) {
    return '0';
  }

  const contract = await getQVaultInstance();
  const fee = await contract.instance.methods.deposit().estimateGas({ value: amount, from: address });
  const gas = calculateGas(fee);

  const result = BN(amount).minus(toWei(gas)).toString();
  return fromWei(result);
}
