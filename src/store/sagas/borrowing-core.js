import { put, takeEvery, call, select } from 'redux-saga/effects'
import ErrorHandler from 'func/ErrorHandler'

import * as actionTypes from 'store/actions/action-types/borrowing-core'
import { setErrorMessage, setTransactionLoading } from 'store/actions/action-creaters/transaction-handler'

import { getBorrowingCoreInstance } from 'contracts/contract-instance'

function * setCreateQBTCVault () {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)

    const contract = yield call(getBorrowingCoreInstance)
    yield contract.createVault('QBTC', { from: userAddress })
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionLoading())
  }
}

export default [takeEvery(actionTypes.SET_CREATE_QBTC_VAULT, setCreateQBTCVault)]
