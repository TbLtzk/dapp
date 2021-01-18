import { combineReducers } from 'redux';

import validators from 'store/reducers/validators';
import UserAuth from './userAuth';
import userInf from './userInf';
import rootContract from './rootContract';
import qPiggyBank from './qPiggyBank';
import proposals from 'store/reducers/voting/proposals';
import validationRewardPools from './validationRewardPools';

import transactionHandler from 'store/reducers/transactionHandler';

const RootReducer = combineReducers({
  userAuth: UserAuth,
  userInf,
  rootContract,
  qPiggyBank,

  proposals,

  transactionHandler,

  validators,
  validationRewardPools,
});

export default RootReducer;
