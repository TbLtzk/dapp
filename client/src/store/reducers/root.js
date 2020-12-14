import { combineReducers } from 'redux'

import UserAuth from './userAuth';
import userInf from './userInf';
import rootContract from './rootContract';
import qPiggyBank from './qPiggyBank'
import rootsVoting from './voting/rootsVoting';
import constitutionVoting from './voting/constitutionVoting';
import validatorsSlashingVoting from './voting/validatorsSlashingVoting';
import rootnodesSlashingVoting from './voting/rootnodesSlashingVoting';
import EPQFIMembershipVoting from './voting/EPQFIMembershipVoting';
import EPDRMembershipVoting from './voting/EPDRMembershipVoting';
import qProposals from 'store/reducers/voting/qProposals';

const RootReducer = combineReducers({
    userAuth: UserAuth,
    userInf: userInf,
    rootContract: rootContract,
    qPiggyBank: qPiggyBank,

    rootsVoting: rootsVoting,
    constitutionVoting: constitutionVoting,

    validatorsSlashingVoting: validatorsSlashingVoting,
    rootnodesSlashingVoting: rootnodesSlashingVoting,

    EPQFIMembershipVoting: EPQFIMembershipVoting,
    EPDRMembershipVoting: EPDRMembershipVoting,

    qProposals: qProposals,
});

export default RootReducer
