import { put, takeEvery, all, select } from 'redux-saga/effects'

import * as actionTypes from './action-types'
import { setQProposalsCount, setQEndedProposals, setQActiveProposals } from './action-creators'
import { creationQContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ErrorHandler from 'func/ErrorHandler'
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful'

let lastActiveBlock

function * getQProposalsCountGenerator () {
  try {
    const contracts = creationQContractsObjArray()
    const { minimalActiveBlockHeight, lastBlockHeight } = yield getMinimalActiveBlockHeight()

    let proposalsCounter
    let activeProposalsArray
    let endedProposalsArray

    if (lastActiveBlock) {
      const { activeProposals, endedProposals, qEndedProposalsCount } = yield select((state) => state.qProposals)

      const proposals = yield all(
        contracts.map((contract) => contract.getNewProposalsAndCheckActive(activeProposals, lastActiveBlock))
      )
      const [newProposalsCount, newActiveProposals, newEndedProposalsIds] = sortAndCountProposalsByType(proposals)
      proposalsCounter = {
        active: newProposalsCount.active,
        ended: qEndedProposalsCount + newProposalsCount.ended
      }
      activeProposalsArray = newActiveProposals
      endedProposalsArray = [...endedProposals, ...newEndedProposalsIds]
      lastActiveBlock = lastBlockHeight
    } else {
      const proposals = yield all(contracts.map((contract) => contract.getProposalsCount(minimalActiveBlockHeight)))
      const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposalsByType(proposals)
      proposalsCounter = proposalsCount
      activeProposalsArray = activeProposalsIds
      endedProposalsArray = endedProposalsIds
      lastActiveBlock = lastBlockHeight
    }

    yield put(setQProposalsCount(proposalsCounter))
    yield put(setQActiveProposals(activeProposalsArray))
    yield put(setQEndedProposals(endedProposalsArray))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [takeEvery(actionTypes.GET_Q_PROPOSALS_COUNT, getQProposalsCountGenerator)]
