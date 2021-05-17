import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/slashing-proposals';
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler';

import {
  getSlashingProposalsListSuccess,
  getSlashingProposalsListError,
  getSlashingEndedProposalsSuccess,
  getSlashingEndedProposalsError,
  getProposalError, getEmptyProposalSuccess, getProposalSuccess,
  getEmptyProposalEndedSuccess,
  getProposalEndedSuccess, getSlashingProposalEnded, getProposalEndedError
} from 'store/actions/action-creaters/voting/slashing-proposals';
import {
  creationSlashingContractObj,
  creationSlashingContractsObjArray
} from 'contracts/handler/VotingHandler';

import SlashingEscrow from 'contracts/src/voting/SlashingEscrow';

function* getProposalsList() {
  try {
    const contracts = creationSlashingContractsObjArray();
    let result = [];
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getProposals()));
      result = [].concat.apply([], data);
    } else {
      result = yield contracts?.getProposals();
    }
    yield put(getSlashingProposalsListSuccess(result));

  } catch (e) {
    console.log('e', e);
    yield put(getSlashingProposalsListError(e));
  }
}

function* getEndedProposals() {
  try {
    let contracts = creationSlashingContractsObjArray();
    let result = [];
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getEndedProposals()));
      result = [].concat.apply([], data);
    } else {
      result = yield contracts?.getEndedProposals();
    }

    yield put(getSlashingEndedProposalsSuccess(result));

  } catch (err) {
    yield put(getSlashingEndedProposalsError(err));
  }
}

function* getProposal({ contractName, id, activeProposal }) {
  const { pageType } = yield select(state => state.proposals);
  try {
    if (pageType === 'ended') {
      yield put(getSlashingProposalEnded());
    }
    const contract = creationSlashingContractObj(contractName);
    if (contract) {
      let data = null;
      if (activeProposal) {
        data = yield contract.getOneProposal(id);
      } else {
        data = yield contract.getProposalWithoutStatusChecked(id);
      }
      if (pageType === 'ended') {
        if (data) {
          yield put(getProposalEndedSuccess(data));
        } else {
          if (id) {
            yield put(getEmptyProposalEndedSuccess({
              id,
              contractName
            }));
          }
        }
      } else if (pageType === 'active') {
        if (data) {
          yield put(getProposalSuccess(data));
        } else {
          if (id) {
            yield put(getEmptyProposalSuccess({
              id,
              contractName
            }));
          }
        }
      }

    }
  } catch (err) {
    console.log('err', err);
    if (pageType === 'ended') {
      yield put(getProposalEndedError(id));
    } else {
      yield put(getProposalError(id));
    }
  }
}

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
  takeEvery(actionTypes.GET_SLASHING_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_SLASHING_PROPOSAL, getProposal),

  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjection),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecision),
  takeEvery(actionTypes.ESCROW_RECALL_PROPOSE_DECISION, onEscrowRecallProposeDecision),
  takeEvery(actionTypes.ESCROW_CONFIRM_DECISION, onEscrowConfirmProposeDecision),

];
