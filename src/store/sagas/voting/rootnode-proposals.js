import { put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/root-node-proposals';

import {
  getRootNodeProposalsListError, getRootNodeProposalsListSuccess,
  getRootNodeEndedProposalsError, getRootNodeEndedProposalsSuccess,
  getEmptyProposalSuccess, getProposalError, getProposalSuccess,
  getProposalEndedSuccess, getEmptyProposalEndedSuccess, getRootNodeProposalEnded,
  getProposalEndedError, getOneProposalSuccess
} from 'store/actions/action-creaters/voting/root-node-proposals';
import {
  creationRootContractObj,
} from 'contracts/handler/VotingHandler';

function* getProposalsList() {
  try {
    const contracts = creationRootContractObj();
    let result = [];
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getProposals()));
      result = [].concat.apply([], data);
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
      const data = yield Promise.all(contracts.map(item => item.getEndedProposals()));
      result = [].concat.apply([], data);
    } else {
      result = yield contracts?.getEndedProposals();
    }
    yield put(getRootNodeEndedProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
    yield put(getRootNodeEndedProposalsError(err.message));
  }
}

function* getRootNodeProposal({ contractName, id, activeProposal }) {
  const { pageType } = yield select(state => state.proposals);
  try {
    if (pageType === 'ended') {
      yield put(getRootNodeProposalEnded());
    }
    const contract = creationRootContractObj();

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
      } else {
        yield put(getOneProposalSuccess(data));
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

export default [
  takeEvery(actionTypes.GET_ROOT_NODE_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_ROOT_NODE_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_ROOT_NODE_PROPOSAL, getRootNodeProposal),
];
