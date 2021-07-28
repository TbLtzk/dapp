import { call, put, takeEvery } from 'redux-saga/effects'
import * as actionTypes from 'store/actions/action-types/user-auth'
import {
  detectEthereumProviderSuccess,
  detectEthereumProviderError
} from 'store/actions/action-creaters/user-auth'

import { detectMetamask } from 'contracts/handler/metamaskAccount'

function * detectEthereumProviderRequest () {
  try {
    const data = yield call(detectMetamask)
    yield put(detectEthereumProviderSuccess(data))
  } catch (err) {
    console.log('err', err)
    yield put(detectEthereumProviderError(err.message))
  }
}

export default [
  takeEvery(actionTypes.DETECT_ETHEREUM_PROVIDER, detectEthereumProviderRequest)
]
