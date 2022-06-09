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
import stableCoin from './stable-coin/sagas';
import systemBalance from './system-balance/sagas';
import systemReserve from './system-reserve/sagas';
import tokenomics from './tokenomics/sagas';
import validationRewardPools from './validation-reward-pools/sagas';
import validators from './validators/sagas';
import vesting from './vesting/sagas';
import contractUpdatesProposals from './voting/contract-updates/sagas';
import expertProposals from './voting/expert-proposals/sagas';
import proposals from './voting/proposals/sagas';
import qProposals from './voting/q-proposals/sagas';
import rootNodeProposals from './voting/root-node-proposals/sagas';
import slashingProposals from './voting/slashing-proposals/sagas';

export default function * rootSaga () {
  yield all([
    ...qVault,
    ...rootContract,
    ...borrowingCore,
    ...proposals,
    ...qProposals,
    ...contractUpdatesProposals,
    ...rootNodeProposals,
    ...expertProposals,
    ...slashingProposals,
    ...validators,
    ...validationRewardPools,
    ...auctions,
    ...stableCoin,
    ...membership,
    ...systemBalance,
    ...systemReserve,
    ...parametersAddresses,
    ...lockedAmount,
    ...vesting,
    ...savingAssets,
    ...borrowingAssets,
    ...accountAliases,
    ...tokenomics,
  ]);
}
