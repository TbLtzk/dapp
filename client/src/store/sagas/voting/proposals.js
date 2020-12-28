import {call, put, takeEvery, select} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/proposals";
import {
    setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from "store/actions/action-creaters/transaction-handler";

import {createProposalSuccess, voteForProposalSuccess} from "store/actions/action-creaters/voting/proposals";
import {getQProposal} from "store/actions/action-creaters/voting/qproposals";
import {getRootsVotingProposal} from "store/actions/action-creaters/voting/roots-voting";
import {getQExpertProposal} from "store/actions/action-creaters/voting/expert-voting";
import {getSlashingVotingProposal} from "store/actions/action-creaters/voting/slashing-voting";

import ConstitutionVotingService from "api/contracts/Voting/ConstitutionVotingService";
import EmergencyUpdateVotingService from "api/contracts/Voting/EmergencyUpdateVotingService";
import GeneralUpdateVotingService from "api/contracts/Voting/GeneralUpdateVotingService";
import RootsVotingService from "api/contracts/Voting/RootsVotingService";

import {chooseExpertContractDependsOnType} from "api/contracts/Voting/handler/QExpertVotingHandler"
import {chooseSlashingContractDependsOnType} from "api/contracts/Voting/handler/SlashingVotingHandler"

function* createProposal({drizzle, data}) {
    try {
        yield put(setTransactionLoading());
        const {userAddress} = yield select(state => state.userInf);

        let result = null;
        if (data && drizzle) {
            switch (data?.first) {
                case "constitution-update":
                    const constitutionVoting = new ConstitutionVotingService(drizzle, "ConstitutionVoting");
                    result = yield constitutionVoting.createProposal(data, userAddress);
                    yield put(getQProposal(constitutionVoting, result?.events?.ProposalCreated?.returnValues?._id));
                    break;
                case "general-q-update":
                    const generalUpdateVoting = new GeneralUpdateVotingService(drizzle, "GeneralUpdateVoting");
                    result = yield generalUpdateVoting.createProposal(data, userAddress);
                    yield put(getQProposal(generalUpdateVoting, result?.events?.ProposalCreated?.returnValues?._id));
                    console.log("RESULT, general-q-update", result);
                    break;
                case "emergency-update":
                    const emergencyUpdateVoting = new EmergencyUpdateVotingService(drizzle, "EmergencyUpdateVoting");
                    result = yield emergencyUpdateVoting.createProposal(data, userAddress);
                    yield put(getQProposal(emergencyUpdateVoting, result?.events?.ProposalCreated?.returnValues?._id));
                    break;
                case "add-a-new-root-node":
                case "remove-a-current-root-node":
                    const rootsVoting = new RootsVotingService(drizzle, "RootsVoting");
                    result = yield rootsVoting.createProposal(data, userAddress);
                    yield put(getRootsVotingProposal(rootsVoting, result?.events?.ProposalCreated?.returnValues?._id));
                    break;
                case "root-node-slashing":
                case "validator-node-slashing":
                    const chosenContract = chooseSlashingContractDependsOnType(drizzle, data?.first);
                    result = yield chosenContract.createProposal(data, userAddress);
                    yield put(getSlashingVotingProposal(chosenContract, result?.events?.ProposalCreated?.returnValues?._id));
                    break;
                case "add-a-new-expert":
                case "remove-a-current-expert":
                case "parameter-vote":
                    const typeContract = data.first !== "parameter-vote" ? "member" : "parameters";
                    const contract = chooseExpertContractDependsOnType(drizzle, typeContract, data["type-proposal"]);
                    result = yield contract.createProposal(data, userAddress);
                    if (data?.first === "remove-a-current-expert"){
                        //TODO: for createRemoveExpertProposal use RemoveProposalCreated event
                        yield put(getQExpertProposal(contract, result?.events?.RemoveProposalCreated?.returnValues?._id));
                    }else {
                        yield put(getQExpertProposal(contract, result?.events?.ProposalCreated?.returnValues?._id));
                    }
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

function* voteForProposal({drizzle, data}) {
    try {
        yield put(setTransactionLoading());
        const {userAddress} = yield select(state => state.userInf);

        let result = null;
        if (data && drizzle) {
            const contract = new ConstitutionVotingService(drizzle, data?.contract);
            console.log("VOTING contract", contract);
            if (data?.first === "basic-vote-on-proposal") {
                if (data["vote-proposal"] === "yes") {
                    // result = yield contract.voteFor(data?.idProposal, userAddress);
                    const execute = yield contract.execute(data?.idProposal, userAddress);
                    console.log("RESULT VOTING voteFor", result);
                    // console.log("RESULT VOTING execute", execute);
                } else if (data["vote-proposal"] === "no") {
                    result = yield contract.voteAgainst(data?.idProposal, userAddress);
                    // const execute = yield contract.execute(data?.idProposal, userAddress);
                    console.log("RESULT VOTING voteAgainst", result);
                    // console.log("RESULT VOTING execute", execute);
                }
            } else if (data?.first === "constitution-check") {
                //TODO: when backenders do it

            } else if (data?.first === "q-community-veto") {
                result = yield contract.veto(data?.idProposal, userAddress);
                console.log("RESULT VETO", result);
            }
        }

        yield put(voteForProposalSuccess(result));
        yield put(setTransactionLoadingSuccess());

    } catch (err) {
        console.log('err', err.message);
        yield put(setTransactionLoadingError(err.message));
    }
}

export default [
    takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),
    takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposal),
]
