import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/slashing-voting";
import {
    getSlashingVotingProposalsSuccess, getSlashingVotingProposalsError,
    getSlashingVotingProposalSuccess, getSlashingVotingProposalError
} from "store/actions/action-creaters/voting/slashing-voting";
import SlashingVotingService from "api/contracts/Voting/SlashingVotingService";

function* getSlashingVotingProposals({drizzle}) {
    try {
        const validatorsSlashingVoting = new SlashingVotingService(drizzle, "ValidatorsSlashingVoting");
        const rootNodesSlashingVoting = new SlashingVotingService(drizzle, "RootNodesSlashingVoting");
        const contracts = [validatorsSlashingVoting, rootNodesSlashingVoting];
        let result = [];
        for (let contractName of contracts) {
            const data = yield contractName.getProposals();
            result = [...result, ...data];
        }
        console.log("GET_SLASHING_VOTING_PROPOSALS", result);

        yield put(getSlashingVotingProposalsSuccess(result));
    } catch (err) {
        console.log('err',err);
        yield put(getSlashingVotingProposalsError(err.message));
    }
}

function* getProposal({contract, id}) {
    try {
        const data = yield contract.getOneProposal(id);
        console.log("GET_SLASHING_PROPOSAL", data);

        yield put(getSlashingVotingProposalSuccess(data));
    } catch (err) {
        console.log('err', err);
        yield put(getSlashingVotingProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_SLASHING_VOTING_PROPOSALS, getSlashingVotingProposals),
    takeEvery(actionTypes.GET_SLASHING_VOTING_PROPOSAL, getProposal),
]
