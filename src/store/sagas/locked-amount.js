import { put, select, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/locked-amount';
import Validators from '../../contracts/src/Validators';
import QVault from '../../contracts/src/QVault';
import RootService from 'contracts/src/Root';
import { SET_TRANSACTION_COUNTER } from '../actions/action-types/transaction-handler';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { getUserBalance } from 'store/actions/action-creaters/q-vault';
import {
    setError, setQVaultAmount, setRootNodeAmount, setValidatorAmount
} from 'store/actions/action-creaters/locked-amount';

import { toWei, fromWei } from 'func/balance';

function* getQVaultAmount({ address }) {
    try {
        const contract = new QVault;
        const minQVaultAmount = yield contract.getMinimumLockedAmount(address);
        const lockedQVaultAmounts = yield contract.getTimeLockedAmounts(address);
        yield put(setQVaultAmount({ minQVaultAmount, lockedQVaultAmounts }));
    } catch (err) {
        console.error('getQVaultAmount.Error', err);
        yield put(setError(err.message));
    }
}

function* getRootNodeAmount({ address }) {
    try {
        const contract = new RootService;
        const minRootNodeAmount = yield contract.getMinimumLockedAmount(address);
        const lockedRootNodeAmounts = yield contract.getTimeLockedAmounts(address);
        yield put(setRootNodeAmount({ minRootNodeAmount, lockedRootNodeAmounts }));
    } catch (err) {
        console.error('getRootNodeAmount.Error', err);
        yield put(setError(err.message));
    }
}

function* getValidatorAmount({ address }) {
    try {
        const contract = new Validators;
        const minValidatorAmount = yield contract.getMinimumLockedAmount(address);
        const lockedValidatorAmounts = yield contract.getTimeLockedAmounts(address);
        yield put(setValidatorAmount({ minValidatorAmount, lockedValidatorAmounts }));
    } catch (err) {
        console.error('getValidatorAmount.Error', err);
        yield put(setError(err.message));
    }
}

function* purgeTimeLocksAmount({ address, contract }) {
    try {
        console.log(address, contract)
        yield put();
    } catch (err) {
        console.error('Validators.Error', err);
        yield put(setError(err.message));
    }
}

function* depositLockedAmount({ payload }) {
    try {
        yield put({
            type: SET_TRANSACTION_COUNTER,
            payload: 1
        });
        const contract = new QVault(contractsToAddresses['QVault']);
        const data = yield contract.withdraw(payload.userAddress, toWei(payload.data.amountQ));
        if (data.status === true) {
            yield put(getUserBalance(payload.userAddress));
        }
        // yield contract.depositOnBehalfOf(payload.data.token, payload.data.startDate, payload.data.endDate);
    } catch (err) {
        console.error('depositLockedAmount.Error', err);
        yield put(setError(err.message));
    } finally {
        yield put({
            type: SET_TRANSACTION_COUNTER,
            payload: -1
        });
    }
}



export default [
    takeEvery(actionTypes.GET_QVAULT_AMOUNT, getQVaultAmount),
    takeEvery(actionTypes.GET_ROOTNODE_AMOUNT, getRootNodeAmount),
    takeEvery(actionTypes.GET_VALIDATOR_AMOUNT, getValidatorAmount),

    takeEvery(actionTypes.SET_QVAULT_AMOUNT, setQVaultAmount),
    takeEvery(actionTypes.SET_ROOTNODE_AMOUNT, setRootNodeAmount),
    takeEvery(actionTypes.SET_VALIDATOR_AMOUNT, setValidatorAmount),

    takeEvery(actionTypes.SET_PURGEAMOUNT_CALL, purgeTimeLocksAmount),

    takeEvery(actionTypes.SET_LOCKEDAMOUNT_CALL, depositLockedAmount),

];
