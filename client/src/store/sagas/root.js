import {all} from "redux-saga/effects";

import userAuth from "./user-auth";
import userInf from "./user-inf";
import rootContract from "./root-contract";

export default function* rootSaga() {
    yield all([...userAuth, ...userInf, ...rootContract])
}
