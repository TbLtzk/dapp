import { all } from 'redux-saga/effects';

import proposals from 'store/sagas/voting/proposals';
import userAuth from './user-auth';
import userInf from './user-inf';
import rootContract from './root-contract';
import qPiggyBank from './q-piggy-bank';
import validators from './validators';
import validationRewardPools from './validation-reward-pools';
import auctions from './auctions/auctions';
import stableCoin from './stable-coin';
import membership from './membership';
import parameters from './parameters';

export default function* rootSaga() {
  yield all([...userAuth, ...userInf, ...rootContract, ...qPiggyBank,
    ...proposals, ...validators, ...validationRewardPools, ...auctions, ...stableCoin,
    ...membership, ...parameters]);
}
