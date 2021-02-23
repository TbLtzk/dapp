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
  getProposalError, getEmptyProposalSuccess, getProposalSuccess
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
      for (let contractName of contracts) {
        const data = yield contractName.getProposals();
        result = [...result, ...data];
      }
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
      for (let contractName of contracts) {
        const data = yield contractName.getEndedProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getEndedProposals();
    }

    yield put(getSlashingEndedProposalsSuccess(result));

  } catch (err) {
    yield put(getSlashingEndedProposalsError(err));
  }
}

function* getProposal({ contractName, id, activeProposal }) {
  try {
    const contract = creationSlashingContractObj(contractName);
    if (contract) {
      let data = null;
      if (activeProposal) {
        data = yield contract.getOneProposal(id);
      } else {
        data = yield contract.getProposalWithoutStatusChecked(id);
      }
      console.log('data', data);
      console.log('id', id);
      // const data = null;
      if (data) {
        yield put(getProposalSuccess(data));
      } else {
        if (id) {
          yield put(getEmptyProposalSuccess(id));
        }
      }
    }
  } catch (err) {
    console.log('err', err);
    yield put(getProposalError(id));
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
  takeEvery(actionTypes.GET_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_PROPOSAL, getProposal),

  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjection),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecision),
  takeEvery(actionTypes.ESCROW_RECALL_PROPOSE_DECISION, onEscrowRecallProposeDecision),
  takeEvery(actionTypes.ESCROW_CONFIRM_DECISION, onEscrowConfirmProposeDecision),

];
