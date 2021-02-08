import { combineReducers } from 'redux';

import validators from 'store/reducers/validators';
import UserAuth from './userAuth';
import userInf from './userInf';
import rootContract from './rootContract';
import qPiggyBank from './qPiggyBank';
import proposals from './voting/proposals';
import validationRewardPools from './validationRewardPools';
import auctions from './auctions/auctions';
import modalHandler from './auctions/modalHandler';
import stableCoin from './stableCoin';
import membership from './membership';
import parameters from './parameters';

import transactionHandler from 'store/reducers/transactionHandler';

const RootReducer = combineReducers({
  userAuth: UserAuth,
  userInf,
  rootContract,
  qPiggyBank,

  proposals,
  auctions,
  modalHandler,

  transactionHandler,

  membership,
  parameters,
  validators,
  validationRewardPools,
  stableCoin,
});

export default RootReducer;
