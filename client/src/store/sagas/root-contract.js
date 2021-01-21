import {call, put, takeEvery, all} from "redux-saga/effects";

import {detectMetamask} from "contracts/handler/metamaskAccount"
import * as actionTypes from "store/actions/action-types/root-contract";
import {
    getRootMembersDataSuccess, getRootMembersDataError,
    stakeToPanelSuccess, stakeToPanelError,
    checkIsUserRootNodeSuccess, checkIsUserRootNodeError,
    getRootNodeStakesSuccess, getRootNodeStakesError,
    announceWithdrawalSuccess, announceWithdrawalError,
    withdrawSuccess, withdrawError
} from "store/actions/action-creaters/root-contract";
import RootService from "contracts/src/Root";

function* getRootMembersData({contract}) {
    try {
        const data = yield contract.getRootCalc();
        yield put(getRootMembersDataSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getRootMembersDataError(err.message));
    }
}

function* stakeToPanel({contract, data}) {
    try {
        const res = yield contract.stakeToPanel(data);

        yield put(stakeToPanelSuccess(res));
    } catch (err) {
        console.log('err',err);
        yield put(stakeToPanelError(err.message));
    }
}

function* announceWithdrawal({contract, amount, paymentInf}) {
    try {
        const data = yield contract.announceWithdrawal(amount, paymentInf);

        yield put(announceWithdrawalSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(announceWithdrawalError(err.message));
    }
}

function* withdraw({contract, amount, payTo, paymentInf}) {
    try {
        const data = yield contract.withdraw(amount, payTo, paymentInf);

        yield put(withdrawSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(withdrawError(err.message));
    }
}

function* checkIsUserRootNode({contract, address}) {
    try {
        const data = yield contract.checkMemberIsRoot(address);
        // console.log("checkMemberIsRoot", data);

        yield put(checkIsUserRootNodeSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(checkIsUserRootNodeError(err.message));
    }
}

function* getRootNodeStakes({contract, address}) {
    try {
        const data = yield contract.getRootNodeStake(address);

        yield put(getRootNodeStakesSuccess(data));
    } catch (err) {
        console.log('err',err);
        yield put(getRootNodeStakesError(err.message));
    }
}

export default [
    takeEvery(actionTypes.GET_ROOT_MEMBERS_DATA, getRootMembersData),
    takeEvery(actionTypes.STAKE_TO_PANEL, stakeToPanel),
    takeEvery(actionTypes.ANNOUNCE_WITHDRAWAL, announceWithdrawal),
    takeEvery(actionTypes.WITHDRAW, withdraw),

    takeEvery(actionTypes.CHECK_IS_USER_ROOT_NODE, checkIsUserRootNode),
    takeEvery(actionTypes.GET_ROOT_NODE_STAKES, getRootNodeStakes),
]
