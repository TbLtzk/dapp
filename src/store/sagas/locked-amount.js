import { put, select, takeEvery, call } from 'redux-saga/effects';

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
import { CONTRACT_TYPES } from 'constants/contracts';

import { contractRegistryInstance } from 'contracts/contracts'

const initContract = async (typeContract) => {
    if (typeContract === CONTRACT_TYPES.qVault) {
        return await contractRegistryInstance.qVault();
    } else if (typeContract === CONTRACT_TYPES.root) {
        return await contractRegistryInstance.rootNodes();
    } else if (typeContract === CONTRACT_TYPES.validators) {
        return await contractRegistryInstance.validators();
    } else {
        return null;
    }
}

function getContract(typeContract) {
    if (typeContract === CONTRACT_TYPES.qVault) {
        return new QVault(contractsToAddresses['QVault']);
    } else if (typeContract === CONTRACT_TYPES.root) {
        return new RootService(contractsToAddresses['RootNode']);
    } else if (typeContract === CONTRACT_TYPES.validators) {
        return new Validators();
    } else {
        return null;
    }
}

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

function* purgeTimeLocksAmount({ payload }) {
    try {
        const contract = getContract(payload); //what address do i need to purge ???
        console.log(contract)
        // yield put();
    } catch (err) {
        console.error('Validators.Error', err);
        yield put(setError(err.message));
    }
}

function* depositLockedAmount({ payload }) { //typeContract
    try {
        yield put({
            type: SET_TRANSACTION_COUNTER,
            payload: 1
        });
        const contract = yield call(initContract, payload.data.contract)
        const data = yield contract.instance.methods.withdraw(toWei(payload.data.amountQ)).send({ from: payload.userAddress })
        // const contract = new QVault(contractsToAddresses['QVault']);
        // const data = yield contract.withdraw(payload.userAddress, toWei(payload.data.amountQ));
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


// const { userAddress } = yield select(state => state.userInf);
