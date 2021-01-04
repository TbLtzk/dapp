import { combineReducers } from 'redux';

import validators from 'store/reducers/validators';
import UserAuth from './userAuth';
import userInf from './userInf';
import rootContract from './rootContract';
import qPiggyBank from './qPiggyBank';
import rootsVoting from './voting/rootsVoting';
import qProposals from 'store/reducers/voting/qproposals';
import slashingVoting from './voting/slashingVoting';
import expertVoting from './voting/expertVoting';
import proposals from 'store/reducers/voting/proposals';
import validationRewardPools from './validationRewardPools';

import transactionHandler from 'store/reducers/transactionHandler';

const RootReducer = combineReducers({
  userAuth: UserAuth,
  userInf,
  rootContract,
  qPiggyBank,

  rootsVoting,
  qProposals,
  slashingVoting,
  expertVoting,
  proposals,

  transactionHandler,

  validators,
  validationRewardPools,
});

export default RootReducer;
