import {all} from "redux-saga/effects";

import userAuth from "./user-auth";
import userInf from "./user-inf";
import rootContract from "./root-contract";
import qPiggyBank from "./q-piggy-bank";
import rootsVoting from "./voting/roots-voting";
import constitutionVoting from "./voting/constitution-voting";

import validatorsSlashingVoting from "./voting/validators-slashing-voting";
import rootNodesSlashingVoting from "./voting/rootnodes-slashing-voting";

import EPQFIMembershipVoting from "./voting/EPQFI-membership-voting";
import EPDRMembershipVoting from "./voting/EPDR-membership-voting";

import qproposals from "./voting/qproposals";

export default function* rootSaga() {
    yield all([...userAuth, ...userInf, ...rootContract, ...rootsVoting, ...qPiggyBank,
        ...constitutionVoting, ...validatorsSlashingVoting, ...rootNodesSlashingVoting,
        ...EPQFIMembershipVoting, ...EPDRMembershipVoting, ...qproposals])
}
