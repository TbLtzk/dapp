import {call, put, takeEvery, select} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/qproposals";
import {
    getQExpertProposalsSuccess, getQExpertProposalsError, createProposalSuccess
} from "store/actions/action-creaters/voting/qproposals";
import ConstitutionVotingService from "api/contracts/Voting/ConstitutionVotingService";

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
                    console.log("SWITCH, constitution-update", result);
                    break;
                case "general-q-update":
                    console.log("SWITCH, general-q-update");
                    break;
                case "emergency-update":
                    console.log("SWITCH, emergency-update");
                    break;
                default:
                    return null;
            }
        }


        // for (let contract of contracts) {
        //     const data = yield contract.getProposals();
        //     result = [...result, ...data];
        // }
        // console.log("GET_QEXPERT_PROPOSALS", result);
        yield put(createProposalSuccess(result));

    } catch (err) {
        console.log('err', err);
        // yield put(getQExpertProposalsError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_QEXPERT_PROPOSALS, getQExpertProposals),
    takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),
]
