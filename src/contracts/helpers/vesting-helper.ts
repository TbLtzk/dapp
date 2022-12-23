import { toWei } from 'web3-utils';

import { getVestingInstance } from 'contracts/contract-instance';

export async function withdrawVesting (address: string, amount: string) {
  const contract = await getVestingInstance();
  return contract.withdraw(toWei(amount), { from: address });
}
