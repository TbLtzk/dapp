import {call, put, takeEvery, all} from "redux-saga/effects";
import QPiggyBank from "../../contracts/QPiggyBank";
import * as actionTypes from "store/actions/action-types/q-piggy-bank";
import {setError, setUserBalanceSuccess} from "store/actions/action-creaters/q-piggy-bank";


let contractInstance = null;

function getContractInstance() {
    if (null === contractInstance) {
        contractInstance = new QPiggyBank;
    }
    return contractInstance;
}

function* getUserBalance({userAddress}) {
    try {
        yield put({type: actionTypes.SET_PB_DATA_IS_LOADING});

        const contractInstance = getContractInstance();
        const data = yield contractInstance.getUserBalance(userAddress);

        yield put(setUserBalanceSuccess(data));
    } catch (err) {
        console.error('QPB.Error', err);
        yield put(setError(err.message));
    }
}

function* getLockedAssets({who}) {
    try {
        yield put({type: actionTypes.SET_PB_DATA_IS_LOADING});

        const contractInstance = getContractInstance();
        const data = yield contractInstance.getLockedAssets(who);

        yield put(setUserBalanceSuccess(data));
    } catch (err) {
        console.error('QPB.Error', err);
        yield put(setError(err.message));
    }
}

export default [
    takeEvery(actionTypes.SET_PB_USER_BALANCE, getUserBalance),
]
