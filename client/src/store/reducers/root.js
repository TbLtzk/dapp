import { combineReducers } from 'redux'

import UserAuth from './userAuth';
import userInf from './userInf';
import rootContract from './rootContract';
import qPiggyBank from './qPiggyBank'
import rootsVoting from './voting/rootsVoting';
import qProposals from 'store/reducers/voting/qproposals';
import slashingVoting from './voting/slashingVoting';
import EPQFIMembershipVoting from './voting/EPQFIMembershipVoting';
import EPDRMembershipVoting from './voting/EPDRMembershipVoting';
import proposals from 'store/reducers/voting/proposals';

import transactionHandler from 'store/reducers/transactionHandler';

const RootReducer = combineReducers({
    userAuth: UserAuth,
    userInf: userInf,
    rootContract: rootContract,
    qPiggyBank: qPiggyBank,

    rootsVoting: rootsVoting,
    qProposals: qProposals,

    slashingVoting: slashingVoting,

    EPQFIMembershipVoting: EPQFIMembershipVoting,
    EPDRMembershipVoting: EPDRMembershipVoting,

    proposals: proposals,
    transactionHandler: transactionHandler,
});

export default RootReducer
