import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/qproposals";
import {
    getQProposalsSuccess, getQProposalsError,
    getQProposalSuccess,
    getQProposalError
} from "store/actions/action-creaters/voting/qproposals";

function* getConstitutionVotingProposals({contract}) {
    try {
        let result = [];
        for (let contractName of contract) {
            const data = yield contractName.getProposals();
            result = [...result, ...data];
        }
        // const data = yield contract.getProposals();
        console.log("GET_CONSTITUTION_VOTING_PROPOSALS", result);

        yield put(getQProposalsSuccess(result));
    } catch (err) {
        console.log('err', err);
        yield put(getQProposalsError(err.message));
    }
}

function* getProposal({contract, id}) {
    try {
        const data = yield contract.getOneProposal(id);
        console.log("GET_Q_PROPOSAL", data);

        yield put(getQProposalSuccess(data));
    } catch (err) {
        console.log('err', err);
        yield put(getQProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_Q_PROPOSALS, getConstitutionVotingProposals),
    takeEvery(actionTypes.GET_Q_PROPOSAL, getProposal),
]
