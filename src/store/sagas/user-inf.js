import {call, put, takeEvery, all} from "redux-saga/effects";

import {getAccountData} from "api/metamaskAccount"
import * as actionTypes from "store/actions/action-types/user-inf";
import {
    getUserInfSuccess,
    getUserInfError,
} from "store/actions/action-creaters/user-inf";

function* getUserInf() {
    try {
        const data = yield call(getAccountData);

        console.log(data);

        yield put(getUserInfSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getUserInfError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_USER_INF, getUserInf),
]
