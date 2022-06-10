import { getEpdrParametersInstance } from 'contracts/contract-instance';

import { fromWei } from 'func/balance';

export async function getEPDRUint (key, stateSetter) {
  const contract = await getEpdrParametersInstance();
  const amount = await contract.getUint(key);
  stateSetter(fromWei(amount));
}
