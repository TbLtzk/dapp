import {call, put, takeEvery, select} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/qproposals";
import {
    setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from "store/actions/action-creaters/transaction-handler";

import {
    getQExpertProposalsSuccess, getQExpertProposalsError, createProposalSuccess
} from "store/actions/action-creaters/voting/qproposals";
import ConstitutionVotingService from "api/contracts/Voting/ConstitutionVotingService";
import EmergencyUpdateVotingService from "api/contracts/Voting/EmergencyUpdateVotingService";
import GeneralUpdateVotingService from "api/contracts/Voting/GeneralUpdateVotingService";
import RootsVotingService from "api/contracts/Voting/RootsVotingService";
import RootNodesSlashingVotingService from "api/contracts/Voting/RootNodesSlashingVotingService";

function* getQExpertProposals({contracts}) {
    try {
        let result = [];
        for (let contract of contracts) {
            const data = yield contract.getProposals();
            result = [...result, ...data];
        }
        console.log("GET_QEXPERT_PROPOSALS", result);
        yield put(getQExpertProposalsSuccess(result));

    } catch (err) {
        console.log('err', err);
        yield put(getQExpertProposalsError(err.message));
    }
}

function* createProposal({drizzle, data}) {
    try {
        yield put(setTransactionLoading());
        const {userAddress} = yield select(state => state.userInf);
        console.log("createProposal drizzle", drizzle);
        console.log("createProposal data", data);
        console.log("createProposal userAddress", userAddress);

        let result = null;
        if (data && drizzle) {
            switch (data?.first) {
                case "constitution-update":
                    const constitutionVoting = new ConstitutionVotingService(drizzle, "ConstitutionVoting");
                    result = yield constitutionVoting.createProposal(data, userAddress);
                    console.log("RESULT, constitution-update", result);
                    break;
                case "general-q-update":
                    const generalUpdateVoting = new GeneralUpdateVotingService(drizzle, "GeneralUpdateVoting");
                    result = yield generalUpdateVoting.createProposal(data, userAddress);
                    console.log("RESULT, general-q-update");
                    break;
                case "emergency-update":
                    const emergencyUpdateVoting = new EmergencyUpdateVotingService(drizzle, "EmergencyUpdateVoting");
                    result = yield emergencyUpdateVoting.createProposal(data, userAddress);
                    console.log("RESULT, emergency-update");
                    break;
                case "add-a-new-root-node":
                case "remove-a-current-root-node":
                    const rootsVoting = new RootsVotingService(drizzle, "RootsVoting");
                    result = yield rootsVoting.createProposal(data, userAddress);
                    break;
                case "root-node-slashing":
                case "validator-node-slashing":
                    const rootNodesSlashingVoting = new RootNodesSlashingVotingService(drizzle, "RootNodesSlashingVoting");
                    result = yield rootNodesSlashingVoting.createProposal(data, userAddress);
                    break;
                default:
                    return null;
            }
        }
        yield put(createProposalSuccess(result));
        yield put(setTransactionLoadingSuccess());
    } catch (err) {
        console.log('err', err.message);
        yield put(setTransactionLoadingError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_QEXPERT_PROPOSALS, getQExpertProposals),
    takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),
]
