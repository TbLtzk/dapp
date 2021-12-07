import { put, takeEvery, select } from 'redux-saga/effects'

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
import { getLatestBlockNumber, sortAndCountProposals } from 'func/useful'

let block = 50000
function * getSlashingProposalsCountGenerator () {
  try {
    const contracts = creationSlashingContractsObjArray()
    const latestBlockNumber = yield getLatestBlockNumber()
    const proposals = yield Promise.all(
      contracts.map((contract) => contract.getProposalsCount(latestBlockNumber - block))
    )
    const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposals(proposals)
    yield put(setSlashingProposalsCount(proposalsCount))
    yield put(setSlashingActiveProposals(activeProposalsIds))
    yield put(setSlashingEndedProposals(endedProposalsIds))
    block = 2000
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
