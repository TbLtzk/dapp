import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/constitution-voting";
import {
    getConstitutionVotingProposalsSuccess, getConstitutionVotingProposalsError,
    createProposalSuccess, createProposalError
} from "store/actions/action-creaters/voting/constitution-voting";

function* getConstitutionVotingProposals({contract}) {
    try {
        let result = [];
        for (let contractName of contract) {
            const data = yield contractName.getProposals();
            result = [...result, ...data];
        }
        // const data = yield contract.getProposals();
        console.log("GET_CONSTITUTION_VOTING_PROPOSALS", result);

        yield put(getConstitutionVotingProposalsSuccess(result));
    } catch (err) {
        console.log('err',err);
        yield put(getConstitutionVotingProposalsError(err.message));
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
    takeEvery(actionTypes.GET_CONSTITUTION_VOTING_PROPOSALS, getConstitutionVotingProposals),

    takeEvery(actionTypes.CREATE_CONSTITUTION_VOTING_PROPOSAL, createProposal),
]
