import { combineReducers } from 'redux'

import UserAuth from './userAuth';
import userInf from './userInf';

const RootReducer = combineReducers({
    userAuth: UserAuth,
    userInf: userInf,
});

export default RootReducer
