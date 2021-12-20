import { all } from 'redux-saga/effects'

import proposals from './voting/proposals/sagas'
import qProposals from './voting/q-proposals/sagas'
import rootNodeProposals from './voting/root-node-proposals/sagas'
import expertProposals from './voting/expert-proposals/sagas'
import slashingProposals from './voting/slashing-proposals/sagas'

import userAuth from './user-auth/sagas'
import rootContract from './root-node/sagas'
import qVault from './q-vault/sagas'
import validators from './validators/sagas'
import validationRewardPools from './validation-reward-pools/sagas'
import auctions from './auctions/sagas'
import stableCoin from './stable-coin/sagas'
import membership from './membership/sagas'
import parameters from './parameters/sagas'
import systemBalance from './system-balance/sagas'
import systemReserve from './system-reserve/sagas'
import parametersAddresses from './parameters-addresses/sagas'
import lockedAmount from './locked-amount/sagas'
import vesting from './vesting/sagas'
import borrowingCore from './borrowing-core/sagas'
import savingAssets from './saving-assets/sagas'
import borrowingAssets from './borrow-assets/sagas'

export default function * rootSaga () {
  yield all([
    ...qVault,
    ...userAuth,
    ...rootContract,
    ...borrowingCore,
    ...proposals,
    ...qProposals,
    ...rootNodeProposals,
    ...expertProposals,
    ...slashingProposals,
    ...validators,
    ...validationRewardPools,
    ...auctions,
    ...stableCoin,
    ...membership,
    ...parameters,
    ...systemBalance,
    ...systemReserve,
    ...parametersAddresses,
    ...lockedAmount,
    ...vesting,
    ...savingAssets,
    ...borrowingAssets
  ])
}
