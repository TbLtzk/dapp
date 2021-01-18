import { all } from 'redux-saga/effects';

import proposals from 'store/sagas/voting/proposals';
import userAuth from './user-auth';
import userInf from './user-inf';
import rootContract from './root-contract';
import qPiggyBank from './q-piggy-bank';
import validators from './validators';
import validationRewardPools from './validation-reward-pools';

export default function* rootSaga() {
  yield all([...userAuth, ...userInf, ...rootContract, ...qPiggyBank,
    ...proposals, ...validators, ...validationRewardPools]);
}
