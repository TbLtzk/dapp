import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/roots-voting";
import {
    getRootsVotingProposalsSuccess, getRootsVotingProposalsError
} from "store/actions/action-creaters/voting/roots-voting";

function* getRootVotingProposals({contract}) {
    try {
        const data = yield contract.getProposals();
        console.log("GET_ROOT_VOTING_PROPOSALS", data);

        yield put(getRootsVotingProposalsSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getRootsVotingProposalsError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_ROOT_VOTING_PROPOSALS, getRootVotingProposals),
]
