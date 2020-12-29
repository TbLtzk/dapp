import {call, put, takeEvery, all} from "redux-saga/effects";

import * as actionTypes from "store/actions/action-types/voting/expert-voting";
import {
    getQExpertProposalsError, getQExpertProposalsSuccess,
    getQExpertProposalSuccess, getQExpertProposalError
} from "store/actions/action-creaters/voting/expert-voting";
import {chooseExpertContractDependsOnType} from "api/contracts/Voting/handler/QExpertVotingHandler";

export const arrContracts = [
    {
        // EPQFI_MembershipVoting
        typeContract: "member",
        type: "q-fees-&-incentives-expert-panel",
    },
    {
        // EPDR_MembershipVoting
        typeContract: "member",
        type: "q-defi-(decentralized-finance)-expert-panel",
    },
    {
       // EPQFI_ParametersVoting
        typeContract: "parameters",
        type: "q-fees-&-incentives-expert-panel",
    },
    {
        // EPDR_ParametersVoting
        typeContract: "parameters",
        type: "q-defi-(decentralized-finance)-expert-panel",
    }
];

function* getQExpertProposals({drizzle}) {
    try {
        let result = [];
        let contracts = [];
        for (let contract of arrContracts) {
            contracts.push(chooseExpertContractDependsOnType(drizzle, contract.typeContract, contract.type));
        }
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

function* getProposal({contract, id}) {
    try {
        const data = yield contract.getOneProposal(id);
        console.log("GET_QEXPERT_PROPOSAL", data);

        yield put(getQExpertProposalSuccess(data));
    } catch (err) {
        console.log('err', err);
        yield put(getQExpertProposalError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_QEXPERT_PROPOSALS, getQExpertProposals),
    takeEvery(actionTypes.GET_QEXPERT_PROPOSAL, getProposal),
]
