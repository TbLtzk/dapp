import { getEpdrParametersInstance } from 'contracts/contract-instance';

import { fromWei } from 'utils/web3';

export async function getEPDRUint (key: string) {
  try {
    const contract = await getEpdrParametersInstance();
    const amount = await contract.getUint(key);
    return fromWei(amount);
  } catch (error) {
    return 0;
  }
}
