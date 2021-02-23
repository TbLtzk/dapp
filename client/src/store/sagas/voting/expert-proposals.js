import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/expert-proposals';

import {
  getExpertEndedProposalsError, getExpertEndedProposalsSuccess,
  getExpertProposalsListError, getExpertProposalsListSuccess,
  getProposalSuccess, getEmptyProposalSuccess, getProposalError,
} from 'store/actions/action-creaters/voting/expert-proposals';
import {
  creationExpertContractObj, creationExpertContractsObjArray
} from 'contracts/handler/VotingHandler';

function* getProposalsList() {

  try {
    const contracts = creationExpertContractsObjArray();
    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getProposals();
    }

    yield put(getExpertProposalsListSuccess(result));
  } catch (e) {
    console.log('e', e);
    yield put(getExpertProposalsListError(e));
  }
}

function* getProposal({ contractName, id, activeProposal }) {
  try {
    const contract = creationExpertContractObj(contractName);
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
    const contracts = creationExpertContractsObjArray();
    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getEndedProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getEndedProposals();
    }

    yield put(getExpertEndedProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
    yield put(getExpertEndedProposalsError(err.message));
  }
}

export default [
  takeEvery(actionTypes.GET_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_PROPOSAL, getProposal),
];
