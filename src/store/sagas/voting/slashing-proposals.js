import { call, put, takeEvery, select } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/voting/slashing-proposals'
import {
  setErrorMessage,
  setTransactionLoading,
  setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler'

import {
  getSlashingProposalsListSuccess,
  getSlashingProposalsListError,
  getSlashingEndedProposalsSuccess,
  getSlashingEndedProposalsError,
  getProposalError,
  getOneProposalSuccess
} from 'store/actions/action-creaters/voting/slashing-proposals'
import { creationSlashingContractObj, creationSlashingContractsObjArray } from 'contracts/handler/VotingHandler'

import SlashingEscrow from 'contracts/src/voting/SlashingEscrow'

import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { CONTRACTS_NAMES } from 'constants/contracts'

function * getProposalsList ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active }) {
  try {
    const contracts = creationSlashingContractsObjArray()
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        const pending = yield Promise.all(contracts.map((contract) => contract.getProposals()))
        yield put(getSlashingProposalsListSuccess([].concat.apply([], pending)))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        const ended = yield Promise.all(contracts.map((contract) => contract.getEndedProposals()))
        yield put(getSlashingEndedProposalsSuccess([].concat.apply([], ended)))
        break
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active:
        yield put(getSlashingProposalsListError(error))
        break
      case PROPOSAL_STATUS_TYPES.ended:
        yield put(getSlashingEndedProposalsError(error))
        break
    }
  }
}

function * getProposal ({ contractName, id, activeProposal }) {
  try {
    const contract = creationSlashingContractObj(contractName)
    if (contract) {
      let data = null
      if (activeProposal) {
        data = yield contract.getOneProposal(id)
      } else {
        data = yield contract.getProposalWithoutStatusChecked(id)
      }
      yield put(getOneProposalSuccess(data))
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getProposalError(id))
  }
}

function * onEscrowCastObjection ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const result = yield contract.castObjection(proposalId, data['external-link'], userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * onEscrowProposeDecision ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const notAppealed = data['target-slashing-appeal'] === 'yes'
    const result = yield contract.proposeDecision(
      proposalId,
      data['%-value'],
      notAppealed,
      data['external-link'],
      userAddress
    )
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * onEscrowProposerRemark ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const appealConfirmed = data.appealConfirmed === 'yes'
    const result = yield contract.setProposerRemark(proposalId, data['proposer-remark'], appealConfirmed, userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * onEscrowRecallProposeDecision ({ contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const result = yield contract.recallProposedDecision(proposalId, userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * onEscrowConfirmProposeDecision ({ contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const SlashingEscrowContractName =
      contractName === CONTRACTS_NAMES.validatorsSlashingVoting
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    yield contract.confirmDecision(proposalId, userAddress)
    yield call(() => {}, contractName, {}, proposalId, false)
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

export default [
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_SLASHING_PROPOSAL, getProposal),

  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjection),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecision),
  takeEvery(actionTypes.ESCROW_RECALL_PROPOSE_DECISION, onEscrowRecallProposeDecision),
  takeEvery(actionTypes.ESCROW_CONFIRM_DECISION, onEscrowConfirmProposeDecision),
  takeEvery(actionTypes.ESCROW_PROPOSER_REMARK, onEscrowProposerRemark)
]
