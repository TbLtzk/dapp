import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/EPDR-membership-voting";
import {
    getEPDRMembershipVotingProposalsSuccess, getEPDRMembershipVotingProposalsError,
    createProposalSuccess, createProposalError
} from "store/actions/action-creaters/voting/EPDR-membership-voting";

function* getEPDRMembershipVotingProposals({contract}) {
    try {
        const data = yield contract.getProposals();
        console.log("GET_EPDR_MEMBERSHIP_VOTING_PROPOSALS", data);

        yield put(getEPDRMembershipVotingProposalsSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getEPDRMembershipVotingProposalsError(err.message));
    }
}

function* createProposal({contract, remark, userAddress, anyAddress}) {
    try {
        const data = yield contract.createProposal(remark, userAddress, anyAddress);
        console.log("CREATE_EPDR_MEMBERSHIP_VOTING_PROPOSAL", data);

        yield put(createProposalSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(createProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_EPDR_MEMBERSHIP_VOTING_PROPOSALS, getEPDRMembershipVotingProposals),

    takeEvery(actionTypes.CREATE_EPDR_MEMBERSHIP_VOTING_PROPOSAL, createProposal),
]
