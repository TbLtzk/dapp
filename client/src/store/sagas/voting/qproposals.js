import {call, put, takeEvery, select} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/qproposals";
import {
    setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from "store/actions/action-creaters/transaction-handler";

import {
    getQExpertProposalsSuccess, getQExpertProposalsError, createProposalSuccess, voteForProposalSuccess
} from "store/actions/action-creaters/voting/qproposals";
import ConstitutionVotingService from "api/contracts/Voting/ConstitutionVotingService";
import EmergencyUpdateVotingService from "api/contracts/Voting/EmergencyUpdateVotingService";
import GeneralUpdateVotingService from "api/contracts/Voting/GeneralUpdateVotingService";
import RootsVotingService from "api/contracts/Voting/RootsVotingService";
import SlashingVoting from "api/contracts/Voting/SlashingVoting";
import RootNodesSlashingVotingService from "api/contracts/Voting/RootNodesSlashingVotingService";
import EPQFI_MembershipVotingService from "api/contracts/Voting/EPQFI_MembershipVotingService";
import EPDR_MembershipVotingService from "api/contracts/Voting/EPDR_MembershipVotingService";
import MembershipVoting from "api/contracts/Voting/MembershipVoting";

import {chooseExpertContractDependsOnType} from "api/contracts/Voting/handler/QExpertVotingHandler"
import {getRootsVotingProposals} from "store/actions/action-creaters/voting/roots-voting";
import {getConstitutionVotingProposals} from "store/actions/action-creaters/voting/constitution-voting";
import {getValidatorsSlashingVotingProposals} from "store/actions/action-creaters/voting/validators-slashing-voting";
import {getRootNodesSlashingVotingProposals} from "store/actions/action-creaters/voting/rootnodes-slashing-voting";
import ValidatorsSlashingVotingService from "api/contracts/Voting/ValidatorsSlashingVotingService";

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

        let result = null;
        if (data && drizzle) {
            switch (data?.first) {
                case "constitution-update":
                    const constitutionVoting = new ConstitutionVotingService(drizzle, "ConstitutionVoting");
                    result = yield constitutionVoting.createProposal(data, userAddress);
                    yield put(getConstitutionVotingProposals(constitutionVoting));
                    console.log("RESULT, constitution-update", result);
                    break;
                case "general-q-update":
                    const generalUpdateVoting = new GeneralUpdateVotingService(drizzle, "GeneralUpdateVoting");
                    result = yield generalUpdateVoting.createProposal(data, userAddress);
                    console.log("RESULT, general-q-update", result);
                    break;
                case "emergency-update":
                    const emergencyUpdateVoting = new EmergencyUpdateVotingService(drizzle, "EmergencyUpdateVoting");
                    result = yield emergencyUpdateVoting.createProposal(data, userAddress);
                    console.log("RESULT, emergency-update", result);
                    break;
                case "add-a-new-root-node":
                case "remove-a-current-root-node":
                    const rootsVoting = new RootsVotingService(drizzle, "RootsVoting");
                    result = yield rootsVoting.createProposal(data, userAddress);
                    yield put(getRootsVotingProposals(rootsVoting));

                    break;
                case "root-node-slashing":
                    const rootNodesSlashingVoting = new RootNodesSlashingVotingService(drizzle, "RootNodesSlashingVoting");
                    result = yield rootNodesSlashingVoting.createProposal(data, userAddress);
                    yield put(getRootNodesSlashingVotingProposals(rootNodesSlashingVoting));
                    break;
                case "validator-node-slashing":
                    const validatorsSlashingVoting = new ValidatorsSlashingVotingService(drizzle, "ValidatorsSlashingVoting");
                    result = yield validatorsSlashingVoting.createProposal(data, userAddress);
                    yield put(getValidatorsSlashingVotingProposals(validatorsSlashingVoting));
                    break;
                case "add-a-new-expert":
                case "remove-a-current-expert":
                case "parameter-vote":
                    const typeContract = data.first !== "parameter-vote" ? "member" : "parameters";
                    console.log("typeContract", typeContract);
                    const contract = chooseExpertContractDependsOnType(drizzle, typeContract, data["type-proposal"]);
                    console.log("contract", contract);
                    result = yield contract.createProposal(data, userAddress);

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
                    result = yield contract.voteFor(data?.idProposal, userAddress);
                    // const execute = yield contract.execute(data?.idProposal, userAddress);
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
    takeEvery(actionTypes.GET_QEXPERT_PROPOSALS, getQExpertProposals),
    takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),

    takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposal),
]
