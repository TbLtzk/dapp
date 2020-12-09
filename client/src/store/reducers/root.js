import { combineReducers } from 'redux'

import UserAuth from './userAuth';
import userInf from './userInf';
import rootContract from './rootContract';
import qPiggyBank from './qPiggyBank'
import rootsVoting from './voting/rootsVoting';
import constitutionVoting from './voting/constitutionVoting';

const RootReducer = combineReducers({
    userAuth: UserAuth,
    userInf: userInf,
    rootContract: rootContract,
    qPiggyBank: qPiggyBank,
    rootsVoting: rootsVoting,
    constitutionVoting: constitutionVoting,
});

export default RootReducer
