import {all} from "redux-saga/effects";

import userAuth from "./user-auth";
import userInf from "./user-inf";
import rootContract from "./root-contract";
import qPiggyBank from "./q-piggy-bank";
import rootsVoting from "./voting/roots-voting";
import constitutionVoting from "./voting/constitution-voting";

export default function* rootSaga() {
    yield all([...userAuth, ...userInf, ...rootContract, ...rootsVoting, ...qPiggyBank, ...constitutionVoting])
}
