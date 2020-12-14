import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/rootnodes-slashing-voting";
import {
    getRootNodesSlashingVotingProposalsSuccess, getRootNodesSlashingVotingProposalsError,
    createProposalSuccess, createProposalError
} from "store/actions/action-creaters/voting/rootnodes-slashing-voting";

function* getRootNodesSlashingVotingProposals({contract}) {
    try {
        const data = yield contract.getProposals();
        console.log("GET_ROOTNODES_SLASHING_VOTING_PROPOSALS", data);

        yield put(getRootNodesSlashingVotingProposalsSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getRootNodesSlashingVotingProposalsError(err.message));
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
    takeEvery(actionTypes.GET_ROOTNODES_SLASHING_VOTING_PROPOSALS, getRootNodesSlashingVotingProposals),

    takeEvery(actionTypes.CREATE_ROOTNODES_SLASHING_VOTING_PROPOSAL, createProposal),
]
