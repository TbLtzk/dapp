import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/slashing-proposals';
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler';

import {
  getLockedAssets
} from 'store/actions/action-creaters/q-piggy-bank';

import {
  createProposalSuccess, voteForProposalSuccess,
  executeProposalSuccess, executeProposalError,
  getProposalsListError, getProposalsListSuccess,
  getProposalSuccess, getEmptyProposalSuccess, getProposalError, getProposalVote,
} from 'store/actions/action-creaters/voting/slashing-proposals';
import {
  creationQContractObj, creationRootContractObj, creationExpertContractObj, creationSlashingContractObj,
  creationQContractsObjArray, creationSlashingContractsObjArray, creationExpertContractsObjArray
} from 'contracts/handler/VotingHandler';

import ConstitutionVotingService from 'contracts/src/voting/ConstitutionVoting';
import EmergencyUpdateVotingService from 'contracts/src/voting/EmergencyUpdateVoting';
import GeneralUpdateVotingService from 'contracts/src/voting/GeneralUpdateVoting';
import RootsVotingService from 'contracts/src/voting/RootsVoting';
import VotingService from 'contracts/src/voting/VotingService';
import SlashingEscrow from 'contracts/src/voting/SlashingEscrow';

function* onEscrowCastObjection({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow' : 'RootNodesSlashingEscrow';
    const contract = new SlashingEscrow(SlashingEscrowContractName);
    const result = yield contract.castObjection(proposalId, data['external-link'], userAddress);
    if (result) {
      yield call(getProposalDependsOnType, contractName, {}, proposalId, false);
    }
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* onEscrowProposeDecision({ data, contractName, proposalId }) {
  try {
    console.log('data', data);
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow' : 'RootNodesSlashingEscrow';
    const contract = new SlashingEscrow(SlashingEscrowContractName);
    const notAppealed = data['target-slashing-appeal'] === 'yes';
    const result = yield contract.proposeDecision(proposalId, data['%-value'], notAppealed,
      data['external-link'], userAddress);
    if (result) {
      yield call(getProposalDependsOnType, contractName, {}, proposalId, false);
    }
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* onEscrowRecallProposeDecision({ contractName, proposalId }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow' : 'RootNodesSlashingEscrow';
    const contract = new SlashingEscrow(SlashingEscrowContractName);
    const result = yield contract.recallProposedDecision(proposalId, userAddress);
    if (result) {
      yield call(getProposalDependsOnType, contractName, {}, proposalId, false);
    }
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* onEscrowConfirmProposeDecision({ contractName, proposalId }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    const SlashingEscrowContractName = contractName === 'ValidatorsSlashingVoting'
      ? 'ValidatorsSlashingEscrow' : 'RootNodesSlashingEscrow';
    const contract = new SlashingEscrow(SlashingEscrowContractName);
    const result = yield contract.confirmDecision(proposalId, userAddress);
    if (result) {
      yield call(getProposalDependsOnType, contractName, {}, proposalId, false);
    }
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

export default [
  takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),
  takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposal),
  takeEvery(actionTypes.EXECUTE_PROPOSAL, executeProposal),
  takeEvery(actionTypes.UPDATE_PROPOSAL, updateProposal),

  takeEvery(actionTypes.GET_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_ONE_PROPOSAL, getOneProposalShared),
  takeEvery(actionTypes.GET_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_PROPOSAL, getProposal),

  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjection),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecision),
  takeEvery(actionTypes.ESCROW_RECALL_PROPOSE_DECISION, onEscrowRecallProposeDecision),
  takeEvery(actionTypes.ESCROW_CONFIRM_DECISION, onEscrowConfirmProposeDecision),

];
