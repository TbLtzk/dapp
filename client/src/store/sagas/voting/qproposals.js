import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/qproposals";
import {
    getQExpertProposalsSuccess, getQExpertProposalsError,
} from "store/actions/action-creaters/voting/qproposals";

function* getQExpertProposals({contracts}) {
    try {
        let result = [];
        for (let contract of contracts) {
            const data = yield contract.getProposals();
            result = [...result, ...data];
        }
        console.log("GET_QEXPERT_PROPOSALS", result);
        yield put(getQExpertProposalsSuccess(result));

    } catch (err) {
        console.log('err', err);
        yield put(getQExpertProposalsError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_QEXPERT_PROPOSALS, getQExpertProposals),
]
