import { getVestingInstance } from 'contracts/contract-instance';

import { toWei } from 'utils/web3';

export async function withdrawVesting (address: string, amount: string) {
  const contract = await getVestingInstance();
  return contract.withdraw(toWei(amount), { from: address });
}
