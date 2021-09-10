import { call, put, takeEvery, select } from 'redux-saga/effects'

import * as actionTypes from 'store/actions/action-types/voting/slashing-proposals'
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler'

import {
  getSlashingProposalsListSuccess,
  getSlashingProposalsListError,
  getSlashingEndedProposalsSuccess,
  getSlashingEndedProposalsError,
  getProposalError, getEmptyProposalSuccess, getProposalSuccess,
  getEmptyProposalEndedSuccess,
  getProposalEndedSuccess, getSlashingProposalEnded, getProposalEndedError, getOneProposalSuccess
} from 'store/actions/action-creaters/voting/slashing-proposals'
import {
  creationSlashingContractObj,
  creationSlashingContractsObjArray
} from 'contracts/handler/VotingHandler'

import SlashingEscrow from 'contracts/src/voting/SlashingEscrow'

import ErrorHandler from 'func/ErrorHandler'

function * getProposalsList () {
  try {
    const contracts = creationSlashingContractsObjArray()
    let result = []
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getProposals()))
      result = [].concat.apply([], data)
    } else {
      result = yield contracts?.getProposals()
    }
    yield put(getSlashingProposalsListSuccess(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(getSlashingProposalsListError(error))
  }
}

function * getEndedProposals () {
  try {
    const contracts = creationSlashingContractsObjArray()
    let result = []
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getEndedProposals()))
      result = [].concat.apply([], data)
    } else {
      result = yield contracts?.getEndedProposals()
    }

    yield put(getSlashingEndedProposalsSuccess(result))
  } catch (error) {
    yield put(getSlashingEndedProposalsError(error))
  }
}

function * getProposal ({ contractName, id, activeProposal }) {
  const { pageType } = yield select(state => state.proposals)
  try {
    if (pageType === 'ended') {
      yield put(getSlashingProposalEnded())
    }
    const contract = creationSlashingContractObj(contractName)
    if (contract) {
      let data = null
      if (activeProposal) {
        data = yield contract.getOneProposal(id)
      } else {
        data = yield contract.getProposalWithoutStatusChecked(id)
      }
      if (pageType === 'ended') {
        if (data) {
          yield put(getProposalEndedSuccess(data))
        } else {
          if (id) {
            yield put(getEmptyProposalEndedSuccess({
              id,
              contractName
            }))
          }
        }
      } else if (pageType === 'active') {
        if (data) {
          yield put(getProposalSuccess(data))
        } else {
          if (id) {
            yield put(getEmptyProposalSuccess({
              id,
              contractName
            }))
          }
        }
      } else {
        yield put(getOneProposalSuccess(data))
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    if (pageType === 'ended') {
      yield put(getProposalEndedError(id))
    } else {
      yield put(getProposalError(id))
    }
  }
}

function * onEscrowCastObjection ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow'
      : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const result = yield contract.castObjection(proposalId, data['external-link'], userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setTransactionLoadingError(error.message))
  }
}

function * onEscrowProposeDecision ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow'
      : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const notAppealed = data['target-slashing-appeal'] === 'yes'
    const result = yield contract.proposeDecision(proposalId, data['%-value'], notAppealed,
      data['external-link'], userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setTransactionLoadingError(error.message))
  }
}

function * onEscrowProposerRemark ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
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
    ErrorHandler.processWithoutFeedback(error)
    yield put(setTransactionLoadingError(error.message))
  }
}

function * onEscrowRecallProposeDecision ({ contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow'
      : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const result = yield contract.recallProposedDecision(proposalId, userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setTransactionLoadingError(error.message))
  }
}

function * onEscrowConfirmProposeDecision ({ contractName, proposalId }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select(state => state.userInf)
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow'
      : 'RootNodesSlashingEscrow'
    const contract = new SlashingEscrow(SlashingEscrowContractName)
    const result = yield contract.confirmDecision(proposalId, userAddress)
    if (result) {
      yield call(() => {}, contractName, {}, proposalId, false)
    }
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
    yield put(setTransactionLoadingError(error.message))
  }
}

export default [
  takeEvery(actionTypes.GET_SLASHING_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_SLASHING_PROPOSAL, getProposal),

  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjection),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecision),
  takeEvery(actionTypes.ESCROW_RECALL_PROPOSE_DECISION, onEscrowRecallProposeDecision),
  takeEvery(actionTypes.ESCROW_CONFIRM_DECISION, onEscrowConfirmProposeDecision),
  takeEvery(actionTypes.ESCROW_PROPOSER_REMARK, onEscrowProposerRemark)

]
