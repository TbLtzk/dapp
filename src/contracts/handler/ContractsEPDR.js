import EPDRParameters from 'contracts/src/parameters/EPDR_Parameters'
import { fromWei } from 'func/balance'

import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { BN, fN } from 'func/useful'

const EPDRClass = new EPDRParameters(contractsToAddresses.EPDRParameters)

export function getEPDRUint (key, stateSetter) {
  EPDRClass.getUint(key).then(
    res => {
      let result = fromWei(res)
      result = fN(BN(result).toFixed())
      stateSetter(result)
    }
  )
}
