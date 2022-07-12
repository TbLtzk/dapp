import { getEpdrParametersInstance } from 'contracts/contract-instance';

import { fromWei } from 'func/balance';

export async function getEPDRUint (key) {
  try {
    const contract = await getEpdrParametersInstance();
    const amount = await contract.getUint(key);
    return fromWei(amount);
  } catch (error) {
    return 0;
  }
}
