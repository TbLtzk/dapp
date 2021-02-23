import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/q-proposals';

import {
  getQEndedProposalsError, getQEndedProposalsSuccess,
  getProposalSuccess, getEmptyProposalSuccess, getProposalError,
  getQProposalsListError, getQProposalsListSuccess
} from 'store/actions/action-creaters/voting/q-proposals';
import {
  creationQContractObj,
  creationQContractsObjArray,
} from 'contracts/handler/VotingHandler';

function* getProposalsList() {
  try {
    const contracts = creationQContractsObjArray();

    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getProposals();
    }
    yield put(getQProposalsListSuccess(result));
  } catch (e) {
    console.log('e', e);
    yield put(getQProposalsListError(e));
  }
}

function* getProposal({ contractName, id, activeProposal }) {
  try {
    const contract = creationQContractObj(contractName);
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

function* getEndedProposals() {
  try {
    const contracts = creationQContractsObjArray();

    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getEndedProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getEndedProposals();
    }

    yield put(getQEndedProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
    yield put(getQEndedProposalsError(err.message));
  }
}

export default [
  takeEvery(actionTypes.GET_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_PROPOSAL, getProposal),
];
