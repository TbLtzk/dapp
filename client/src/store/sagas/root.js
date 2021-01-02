import { all } from 'redux-saga/effects';

import qproposals from 'store/sagas/voting/qproposals';
import proposals from 'store/sagas/voting/proposals';
import userAuth from './user-auth';
import userInf from './user-inf';
import rootContract from './root-contract';
import qPiggyBank from './q-piggy-bank';
import rootsVoting from './voting/roots-voting';
import validators from './validators';
import validationRewardPools from './validation-reward-pools';

import slashingVoting from './voting/slashing-voting';

import expertVoting from './voting/expert-voting';

export default function* rootSaga() {
  yield all([...userAuth, ...userInf, ...rootContract, ...rootsVoting, ...qPiggyBank,
    ...qproposals, ...slashingVoting, ...expertVoting, ...proposals, ...validators, ...validationRewardPools]);
}
