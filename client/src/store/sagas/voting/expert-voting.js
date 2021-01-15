import { call, put, takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/expert-voting';
import {
  getQExpertProposalsError, getQExpertProposalsSuccess,
  getQExpertProposalSuccess, getQExpertProposalError,
  getEmptyQExpertProposalSuccess
} from 'store/actions/action-creaters/voting/expert-voting';
import { chooseExpertContractDependsOnType } from 'api/contracts/Voting/handler/QExpertVotingHandler';
import MembershipVotingService from '../../../api/contracts/Voting/MembershipVotingService';
import ParametersVotingService from '../../../api/contracts/Voting/ParametersVotingService';

export const arrContracts = [
  {
    // EPQFI_MembershipVoting
    typeContract: 'member',
    type: 'q-fees-&-incentives-expert-panel',
  },
  {
    // EPDR_MembershipVoting
    typeContract: 'member',
    type: 'q-defi-(decentralized-finance)-expert-panel',
  },
  {
    // EPQFI_ParametersVoting
    typeContract: 'parameters',
    type: 'q-fees-&-incentives-expert-panel',
  },
  {
    // EPDR_ParametersVoting
    typeContract: 'parameters',
    type: 'q-defi-(decentralized-finance)-expert-panel',
  }
];

function* getQExpertProposals({ drizzle }) {
  try {
    let result = [];
    let contracts = [];
    for (let contract of arrContracts) {
      contracts.push(chooseExpertContractDependsOnType(drizzle, contract.typeContract, contract.type));
    }
    for (let contract of contracts) {
      const data = yield contract.getProposals();
      result = [...result, ...data];
    }
    console.log('GET_QEXPERT_PROPOSALS', result);
    yield put(getQExpertProposalsSuccess(result));

  } catch (err) {
    console.log('err', err);
    yield put(getQExpertProposalsError(err.message));
  }
}

function* getProposal({ contractName, id, drizzle }) {
  try {
    let contract = null;
    switch (contractName) {
      case 'EPQFI_MembershipVoting':
      case 'EPDR_MembershipVoting':
        contract = new MembershipVotingService(drizzle, contractName);
        break;
      case 'EPQFI_ParametersVoting':
      case 'EPDR_ParametersVoting':
        contract = new ParametersVotingService(drizzle, contractName);
        break;
    }
    if (contract) {
      const data = yield contract.getOneProposal(id);
      console.log('GET_QEXPERT_PROPOSAL', data);
      if (data){
        yield put(getQExpertProposalSuccess(data));
      }else {
        yield put(getEmptyQExpertProposalSuccess(id));
      }
    }
  } catch (err) {
    console.log('err', err);
    yield put(getQExpertProposalError(err.message));
  }
}

export default [
  takeEvery(actionTypes.GET_QEXPERT_PROPOSALS, getQExpertProposals),
  takeEvery(actionTypes.GET_QEXPERT_PROPOSAL, getProposal),
];
