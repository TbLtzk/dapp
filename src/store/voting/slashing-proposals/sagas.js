import { put, takeEvery, select, all } from 'redux-saga/effects'

import * as actionTypes from 'store/voting/slashing-proposals/action-types'
import { setErrorMessage, setTransactionCounter } from 'store/transaction-handler/action-creators'

import {
  setSlashingProposalsCount,
  setSlashingEndedProposals,
  setSlashingActiveProposals
} from 'store/voting/slashing-proposals/action-creators'
import { creationSlashingContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper'

import SlashingEscrow from 'contracts/helpers/voting-helpers/slashing-escrow-helper'

import ErrorHandler from 'func/ErrorHandler'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful'

let lastActiveBlock

function * getSlashingProposalsCountGenerator () {
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

    yield put(setSlashingProposalsCount(proposalsCounter))
    yield put(setSlashingActiveProposals(activeProposalsArray))
    yield put(setSlashingEndedProposals(endedProposalsArray))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * onEscrowCastObjectionGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow
    const contract = new SlashingEscrow(SlashingEscrowContractName)
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
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow
    const contract = new SlashingEscrow(SlashingEscrowContractName)
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
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const appealConfirmed = data.appealConfirmed === 'yes'
    yield contract.setProposerRemark(proposalId, data['proposer-remark'], appealConfirmed, userAddress)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * onEscrowRecallProposeDecisionGenerator ({ contractName, proposalId }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    yield contract.recallProposedDecision(proposalId, userAddress)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * onEscrowConfirmProposeDecisionGenerator ({ contractName, proposalId }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    yield contract.confirmDecision(proposalId, userAddress)
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
  takeEvery(actionTypes.ESCROW_RECALL_PROPOSE_DECISION, onEscrowRecallProposeDecisionGenerator),
  takeEvery(actionTypes.ESCROW_CONFIRM_DECISION, onEscrowConfirmProposeDecisionGenerator),
  takeEvery(actionTypes.ESCROW_PROPOSER_REMARK, onEscrowProposerRemarkGenerator),
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS_COUNT, getSlashingProposalsCountGenerator)
]
