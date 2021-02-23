import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/root-node-proposals';

import {
  getRootNodeProposalsListError, getRootNodeProposalsListSuccess,
  getRootNodeEndedProposalsError, getRootNodeEndedProposalsSuccess,
  getEmptyProposalSuccess, getProposalError, getProposalSuccess
} from 'store/actions/action-creaters/voting/root-node-proposals';
import {
  creationRootContractObj,
} from 'contracts/handler/VotingHandler';

function* getProposalsList() {

  try {
    const contracts = creationRootContractObj();
    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getProposals();
    }
    yield put(getRootNodeProposalsListSuccess(result));
  } catch (e) {
    console.log('e', e);
    yield put(getRootNodeProposalsListError(e));
  }
}

function* getEndedProposals() {
  try {
    const contracts = creationRootContractObj();
    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getEndedProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getEndedProposals();
    }
    yield put(getRootNodeEndedProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
    yield put(getRootNodeEndedProposalsError(err.message));
  }
}

function* getProposal({ contractName, id, activeProposal }) {
  try {
    const contract = creationRootContractObj();

    console.log('contract', contract);
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

export default [
  takeEvery(actionTypes.GET_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_PROPOSAL, getProposal),
];
