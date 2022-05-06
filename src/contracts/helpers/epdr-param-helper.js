import { getEpdrParametersInstance } from 'contracts/contract-instance';

import { fromWei } from 'func/balance';
import { BN, fN } from 'func/useful';

export async function getEPDRUint (key, stateSetter) {
  const contract = await getEpdrParametersInstance();
  contract.getUint(key).then(
    res => {
      let result = fromWei(res);
      result = fN(BN(result).toFixed());
      stateSetter(result);
    }
  );
}
