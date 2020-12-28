import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/roots-voting";
import {
    getRootsVotingProposalsSuccess, getRootsVotingProposalsError,
    getRootsVotingProposalSuccess, getRootsVotingProposalError
} from "store/actions/action-creaters/voting/roots-voting";
import RootsVotingService from "api/contracts/Voting/RootsVotingService";

function* getRootVotingProposals({drizzle}) {
    try {
        const rootsVotingService = new RootsVotingService(drizzle, "RootsVoting");
        const data = yield rootsVotingService.getProposals();
        console.log("GET_ROOT_VOTING_PROPOSALS", data);

        yield put(getRootsVotingProposalsSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getRootsVotingProposalsError(err.message));
    }
}

function* getProposal({contract, id}) {
    try {
        const data = yield contract.getOneProposal(id);
        console.log("GET_ROOT_VOTING_PROPOSAL", data);

        yield put(getRootsVotingProposalSuccess(data));
    } catch (err) {
        console.log('err', err);
        yield put(getRootsVotingProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_ROOT_VOTING_PROPOSALS, getRootVotingProposals),
    takeEvery(actionTypes.GET_ROOT_VOTING_PROPOSAL, getProposal),
]
