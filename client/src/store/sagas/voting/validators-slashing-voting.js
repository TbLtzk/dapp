import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/validators-slashing-voting";
import {
    getValidatorsSlashingVotingProposalsSuccess, getValidatorsSlashingVotingProposalsError,
    createProposalSuccess, createProposalError
} from "store/actions/action-creaters/voting/validators-slashing-voting";

function* getValidatorsSlashingVotingProposals({contract}) {
    try {
        const data = yield contract.getProposals();
        console.log("GET_VALIDATORS_SLASHING_VOTING_PROPOSALS", data);

        yield put(getValidatorsSlashingVotingProposalsSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getValidatorsSlashingVotingProposalsError(err.message));
    }
}

function* createProposal({contract, remark, userAddress, anyAddress}) {
    try {
        const data = yield contract.createProposal(remark, userAddress, anyAddress);
        console.log("CREATE_CONSTITUTION_VOTING_PROPOSAL", data);

        yield put(createProposalSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(createProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_VALIDATORS_SLASHING_VOTING_PROPOSALS, getValidatorsSlashingVotingProposals),

    takeEvery(actionTypes.CREATE_VALIDATORS_SLASHING_VOTING_PROPOSAL, createProposal),
]
