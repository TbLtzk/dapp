import { combineReducers } from 'redux'

import UserAuth from './userAuth';
import userInf from './userInf';
import rootContract from './rootContract';

import rootsVoting from './voting/rootsVoting';

const RootReducer = combineReducers({
    userAuth: UserAuth,
    userInf: userInf,
    rootContract: rootContract,
    rootsVoting: rootsVoting,
});

export default RootReducer
