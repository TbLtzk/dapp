import {all} from "redux-saga/effects";

import userAuth from "./user-auth";
import userInf from "./user-inf";
import rootContract from "./root-contract";
import qPiggyBank from "./q-piggy-bank";
import rootsVoting from "./voting/roots-voting";
import qproposals from "store/sagas/voting/qproposals";

import slashingVoting from "./voting/slashing-voting";

import EPQFIMembershipVoting from "./voting/EPQFI-membership-voting";
import EPDRMembershipVoting from "./voting/EPDR-membership-voting";

import proposals from "store/sagas/voting/proposals";

export default function* rootSaga() {
    yield all([...userAuth, ...userInf, ...rootContract, ...rootsVoting, ...qPiggyBank,
        ...qproposals, ...slashingVoting,
        ...EPQFIMembershipVoting, ...EPDRMembershipVoting, ...proposals])
}
