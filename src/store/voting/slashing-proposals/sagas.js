import { call, put, takeEvery, select } from 'redux-saga/effects'

import * as actionTypes from 'store/voting/slashing-proposals/action-types'
import { setErrorMessage, setTransactionCounter } from 'store/transaction-handler/action-creators'

import {
  getSlashingProposalsListSuccess,
  getSlashingProposalsListError,
  getSlashingEndedProposalsSuccess,
  getSlashingEndedProposalsError,
  getProposalError,
  getOneProposalSuccess,
  setSlashingProposalsCount
} from 'store/voting/slashing-proposals/action-creators'
import {
  creationSlashingContractObj,
  creationSlashingContractsObjArray
} from 'contracts/helpers/voting-helpers/base-voting-helper'

import SlashingEscrow from 'contracts/helpers/voting-helpers/slashing-escrow-helper'

import ErrorHandler from 'func/ErrorHandler'
import { PROPOSAL_STATUS_TYPES, PROPOSALS_TYPES } from 'constants/statuses'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { sortByTime } from 'func/useful'

function * getSlashingProposalsCountGenerator () {
  try {
    const contracts = creationSlashingContractsObjArray()
    const result = {
      active: 0,
      ended: 0
    }

    const proposals = yield Promise.all(contracts.map((contract) => contract.getProposalsCount()))
    proposals.forEach((proposal) => {
      if (proposal.ended) {
        result.ended += proposal.ended
      }
      if (proposal.active) {
        result.active += proposal.active
      }
    })

    yield put(setSlashingProposalsCount(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getProposalsListGenerator ({ proposalStatusType = PROPOSAL_STATUS_TYPES.active, range = [0, 3] }) {
  try {
    const contracts = creationSlashingContractsObjArray()
    switch (proposalStatusType) {
      case PROPOSAL_STATUS_TYPES.active: {
        yield put(getSlashingProposalsListSuccess({ proposalsArr: [], loading: true }))
        const active = yield Promise.all(contracts.map((contract) => contract.getProposals()))
        yield put(getSlashingProposalsListSuccess({ proposalsArr: sortByTime(active), loading: false }))
        break
      }
      case PROPOSAL_STATUS_TYPES.ended: {
        yield put(getSlashingEndedProposalsSuccess({ endedProposals: [], loading: true, reset: !range[0] }))
        const ended = yield Promise.all(contracts.map((contract) => contract.getEndedProposals(range)))
        yield put(getSlashingEndedProposalsSuccess({ endedProposals: sortByTime(ended), loading: false }))
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

function * getProposalGenerator ({ contractName, id, activeProposal }) {
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

function * onEscrowCastObjectionGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionCounter(1))
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
    yield put(getProposalsListGenerator(PROPOSALS_TYPES))
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
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const appealConfirmed = data.appealConfirmed === 'yes'
    const result = yield contract.setProposerRemark(proposalId, data['proposer-remark'], appealConfirmed, userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
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
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const result = yield contract.recallProposedDecision(proposalId, userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
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
        ? 'ValidatorsSlashingEscrow'
        : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    yield contract.confirmDecision(proposalId, userAddress)
    yield call(() => {}, contractName, {}, proposalId, false)
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

export default [
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS_LIST, getProposalsListGenerator),
  takeEvery(actionTypes.GET_SLASHING_PROPOSAL, getProposalGenerator),

  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjectionGenerator),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecisionGenerator),
  takeEvery(actionTypes.ESCROW_RECALL_PROPOSE_DECISION, onEscrowRecallProposeDecisionGenerator),
  takeEvery(actionTypes.ESCROW_CONFIRM_DECISION, onEscrowConfirmProposeDecisionGenerator),
  takeEvery(actionTypes.ESCROW_PROPOSER_REMARK, onEscrowProposerRemarkGenerator),
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS_COUNT, getSlashingProposalsCountGenerator)
]
