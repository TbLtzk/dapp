import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/locked-amount'
import Validators from '../../contracts/src/Validators'
import QVault from '../../contracts/src/QVault'
import RootService from 'contracts/src/Root'

import {
  setError, setQVaultAmount, setRootNodeAmount, setValidatorAmount
} from 'store/actions/action-creaters/locked-amount'

function * getQVaultAmount ({ address }) {
  try {
    const contract = new QVault()
    const data = yield contract.getTimeLockedAmounts(address)
    yield put(setQVaultAmount(data))
  } catch (err) {
    console.error('Validators.Error', err)
    yield put(setError(err.message))
  }
}

function * getRootNodeAmount ({ address }) {
  try {
    const contract = new RootService()
    const data = yield contract.getTimeLockedAmounts(address)
    yield put(setRootNodeAmount(data))
  } catch (err) {
    console.error('Validators.Error', err)
    yield put(setError(err.message))
  }
}

function * getValidatorAmount ({ address }) {
  try {
    const contract = new Validators()
    const data = yield contract.getTimeLockedAmounts(address)
    yield put(setValidatorAmount(data))
  } catch (err) {
    console.error('Validators.Error', err)
    yield put(setError(err.message))
  }
}

export default [
  takeEvery(actionTypes.GET_QVAULT_AMOUNT, getQVaultAmount),
  takeEvery(actionTypes.GET_ROOTNODE_AMOUNT, getRootNodeAmount),
  takeEvery(actionTypes.GET_VALIDATOR_AMOUNT, getValidatorAmount),

  takeEvery(actionTypes.SET_QVAULT_AMOUNT, setQVaultAmount),
  takeEvery(actionTypes.SET_ROOTNODE_AMOUNT, setRootNodeAmount),
  takeEvery(actionTypes.SET_VALIDATOR_AMOUNT, setValidatorAmount)
]
