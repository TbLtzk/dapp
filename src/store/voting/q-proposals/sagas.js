import { put, takeEvery } from 'redux-saga/effects'

import * as actionTypes from './action-types'

import { setQProposalsCount, setQEndedProposals, setQActiveProposals } from './action-creators'
import { creationQContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'

import ErrorHandler from 'func/ErrorHandler'
import { getLatestBlockNumber, sortAndCountProposals } from 'func/useful'


function * getQProposalsCountGenerator () {
  try {
    const contracts = creationQContractsObjArray()
    const latestBlockNumber = yield getLatestBlockNumber()
    const proposals = yield Promise.all(
      contracts.map((contract) => contract.getProposalsCount(latestBlockNumber))
    )

    const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposals(proposals)

    yield put(setQProposalsCount(proposalsCount))
    yield put(setQActiveProposals(activeProposalsIds))
    yield put(setQEndedProposals(endedProposalsIds))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_Q_PROPOSALS_COUNT, getQProposalsCountGenerator)]
