import { all } from 'redux-saga/effects'

import proposals from 'store/sagas/voting/proposals'
import qProposals from 'store/sagas/voting/q-proposals'
import rootNodeProposals from 'store/sagas/voting/rootnode-proposals'
import expertProposals from 'store/sagas/voting/expert-proposals'
import slashingProposals from 'store/sagas/voting/slashing-proposals'

import userAuth from './user-auth'
import rootContract from './root-contract'
import qVault from './q-vault'
import validators from './validators'
import validationRewardPools from './validation-reward-pools'
import auctions from './auctions/auctions'
import stableCoin from './stable-coin'
import membership from './membership'
import parameters from './parameters'
import systemBalance from './system-balance'
import systemReserve from './system-reserve'
import parametersAddresses from './parameters-addresses'

export default function * rootSaga () {
  yield all([...userAuth, ...rootContract, ...qVault,
    ...proposals, ...qProposals, ...rootNodeProposals, ...expertProposals, ...slashingProposals,
    ...validators, ...validationRewardPools, ...auctions, ...stableCoin,
    ...membership, ...parameters, ...systemBalance, ...systemReserve, ...parametersAddresses])
}
