import { put, select, takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/expert-proposals';

import {
  getExpertEndedProposalsError, getExpertEndedProposalsSuccess,
  getExpertProposalsListError, getExpertProposalsListSuccess,
  getProposalSuccess, getEmptyProposalSuccess, getProposalError,
  getProposalEndedSuccess, getEmptyProposalEndedSuccess, getExpertProposalEnded,
  getProposalEndedError
} from 'store/actions/action-creaters/voting/expert-proposals';
import {
  creationExpertContractObj, creationExpertContractsObjArray
} from 'contracts/handler/VotingHandler';

function* getProposalsList() {

  try {
    const contracts = creationExpertContractsObjArray();
    let result = [];
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getProposals()));
      result = [].concat.apply([], data);
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
  const { pageType } = yield select(state => state.proposals);
  try {
    if (pageType === 'ended') {
      yield put(getExpertProposalEnded());
    }
    const contract = creationExpertContractObj(contractName);
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

function* getEndedProposals() {
  try {
    const contracts = creationExpertContractsObjArray();
    let result = [];
    if (Array.isArray(contracts)) {
      const data = yield Promise.all(contracts.map(item => item.getEndedProposals()));
      result = [].concat.apply([], data);
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
  takeEvery(actionTypes.GET_EXPERT_ENDED_PROPOSALS, getEndedProposals),
  takeEvery(actionTypes.GET_EXPERT_PROPOSALS_LIST, getProposalsList),
  takeEvery(actionTypes.GET_EXPERT_PROPOSAL, getProposal),
];
