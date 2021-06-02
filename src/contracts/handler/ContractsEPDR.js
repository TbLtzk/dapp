import EPDR_Parameters from 'contracts/src/parameters/EPDR_Parameters'
import { fromWei } from 'func/balance';

import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { BN, fN } from 'func/useful';

const EPDR_Class = new EPDR_Parameters(contractsToAddresses['EPDR_Parameters']);

export function getEPDRUint(key, stateSetter) {
    EPDR_Class.getUint(key).then (
        res => {
            let result = fromWei(res);
            result = fN(BN(result).toFixed());
            stateSetter(result);
        }
    )
}