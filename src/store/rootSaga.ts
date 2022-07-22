import { all } from 'redux-saga/effects';

import accountAliases from './account-aliases/sagas';
import auctions from './auctions/sagas';
import borrowingAssets from './borrow-assets/sagas';
import borrowingCore from './borrowing-core/sagas';
import lockedAmount from './locked-amount/sagas';
import membership from './membership/sagas';
import parametersAddresses from './parameters-addresses/sagas';
import qVault from './q-vault/sagas';
import rootContract from './root-node/sagas';
import savingAssets from './saving-assets/sagas';
import systemBalance from './system-balance/sagas';
import tokenomics from './tokenomics/sagas';
import validationRewardPools from './validation-reward-pools/sagas';
import validators from './validators/sagas';
import vesting from './vesting/sagas';
import proposals from './voting/proposals/sagas';
import slashing from './voting/slashing/sagas';

export default function* rootSaga () {
  yield all([
    ...qVault,
    ...rootContract,
    ...borrowingCore,
    ...proposals,
    ...slashing,
    ...validators,
    ...validationRewardPools,
    ...auctions,
    ...membership,
    ...systemBalance,
    ...parametersAddresses,
    ...lockedAmount,
    ...vesting,
    ...savingAssets,
    ...borrowingAssets,
    ...accountAliases,
    ...tokenomics,
  ]);
}
