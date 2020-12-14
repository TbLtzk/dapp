import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/EPQFI-membership-voting";
import {
    getEPQFIMembershipVotingProposalsSuccess, getEPQFIMembershipVotingProposalsError,
    createProposalSuccess, createProposalError
} from "store/actions/action-creaters/voting/EPQFI-membership-voting";

function* getEPQFIMembershipVotingProposals({contract}) {
    try {
        const data = yield contract.getProposals();
        console.log("GET_EPQFI_MEMBERSHIP_VOTING_PROPOSALS", data);

        yield put(getEPQFIMembershipVotingProposalsSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getEPQFIMembershipVotingProposalsError(err.message));
    }
}

function* createProposal({contract, remark, userAddress, anyAddress}) {
    try {
        const data = yield contract.createProposal(remark, userAddress, anyAddress);
        console.log("CREATE_EPQFI_MEMBERSHIP_VOTING_PROPOSAL", data);

        yield put(createProposalSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(createProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_EPQFI_MEMBERSHIP_VOTING_PROPOSALS, getEPQFIMembershipVotingProposals),

    takeEvery(actionTypes.CREATE_EPQFI_MEMBERSHIP_VOTING_PROPOSAL, createProposal),
]
