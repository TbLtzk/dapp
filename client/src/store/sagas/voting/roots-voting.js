import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/roots-voting";
import {
    getRootsVotingProposalsSuccess, getRootsVotingProposalsError,
    createProposalSuccess, createProposalError
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

function* createProposal({contract, remark, userAddress, anyAddress}) {
    try {
        const data = yield contract.createProposal(remark, userAddress, anyAddress);
        console.log("CREATE_ROOT_VOTING_PROPOSAL", data);

        yield put(createProposalSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(createProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_ROOT_VOTING_PROPOSALS, getRootVotingProposals),

    takeEvery(actionTypes.CREATE_ROOT_VOTING_PROPOSAL, createProposal),
]
