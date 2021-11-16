import { call, put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from './action-types'

import { detectEthereumProviderSuccess, detectEthereumProviderError } from './action-creators'

import { detectMetamask } from 'contracts/handler/metamaskAccount'
import ErrorHandler from 'func/ErrorHandler'

function * detectEthereumProviderRequest () {
  try {
    const data = yield call(detectMetamask)
    yield put(detectEthereumProviderSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(detectEthereumProviderError(error.message))
  }
}

export default [takeEvery(actionTypes.DETECT_ETHEREUM_PROVIDER, detectEthereumProviderRequest)]
