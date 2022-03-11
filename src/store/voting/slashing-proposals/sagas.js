import { put, takeEvery, select, all } from 'redux-saga/effects'

import * as actionTypes from 'store/voting/slashing-proposals/action-types'
import { setErrorMessage, setTransactionCounter } from 'store/transaction-handler/action-creators'

import { setSlashingProposals } from 'store/voting/slashing-proposals/action-creators'
import { creationSlashingContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'

import SlashingEscrow from 'contracts/helpers/voting-helpers/slashing-escrow-helper'

import ErrorHandler from 'func/ErrorHandler'
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful'
import { escrowTypes } from 'pages/UserPages/Proposals/components/ProposalsList/components/SlashingObjection/ModalSlashingObjection/CreateStep1/constants'
import { getRootNodesInstance, getValidatorsInstance } from 'contracts/contract-instance'
import { CONTRACT_TYPES } from 'constants/contracts'

let lastActiveBlock

function * getSlashingProposalsGenerator () {
  try {
    const contracts = creationSlashingContractsObjArray()
    const { minimalActiveBlockHeight, lastBlockHeight } = yield getMinimalActiveBlockHeight()

    let proposalsCounter
    let activeProposalsArray
    let endedProposalsArray

    if (lastActiveBlock) {
      const { activeProposals, endedProposals, slashingEndedProposalsCount } = yield select(
        (state) => state.slashingProposals
      )
      const proposals = yield all(
        contracts.map((contract) => contract.getNewProposalsAndCheckActive(activeProposals, lastActiveBlock))
      )
      const [newProposalsCount, newActiveProposals, newEndedProposalsIds] = sortAndCountProposalsByType(proposals)

      proposalsCounter = {
        active: newProposalsCount.active,
        ended: slashingEndedProposalsCount + newProposalsCount.ended
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
    yield put(setSlashingProposals(activeProposalsArray, endedProposalsArray, proposalsCounter))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * onEscrowCastObjectionGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)

    const contract = new SlashingEscrow(contractName)
    yield contract.castObjection(proposalId, data['external-link'], userAddress)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * onEscrowProposeDecisionGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const contract = new SlashingEscrow(contractName)
    const notAppealed = data['target-slashing-appeal'] === 'yes'
    yield contract.proposeDecision(proposalId, data['%-value'], notAppealed, data['external-link'], userAddress)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * onEscrowProposerRemarkGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const contract = new SlashingEscrow(contractName)
    const appealConfirmed = data.appealConfirmed === 'yes'
    yield contract.setProposerRemark(proposalId, data['proposer-remark'], appealConfirmed, userAddress)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * setEscrowActionGenerator ({ contractName, proposalId, escrowType }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const contract = new SlashingEscrow(contractName)

    switch (escrowType) {
      case escrowTypes.confirm: {
        yield contract.confirmDecision(proposalId, userAddress)
        break
      }
      case escrowTypes.recall: {
        yield contract.recallProposedDecision(proposalId, userAddress)
        break
      }
      case escrowTypes.execute: {
        yield contract.execute(proposalId, userAddress)
        break
      }
    }
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * setPurgeSlashingGenerator ({ slashingAddress, contractType }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const contract =
      contractType === CONTRACT_TYPES.rootNodes ? yield getRootNodesInstance() : yield getValidatorsInstance()
    yield contract.purgePendingSlashings(slashingAddress, { from: userAddress })
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

export default [
  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjectionGenerator),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecisionGenerator),
  takeEvery(actionTypes.ESCROW_PROPOSER_REMARK, onEscrowProposerRemarkGenerator),
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS, getSlashingProposalsGenerator),

  takeEvery(actionTypes.SET_ESCROW_ACTION, setEscrowActionGenerator),
  takeEvery(actionTypes.SET_PURGE_SLASHING, setPurgeSlashingGenerator)
]
