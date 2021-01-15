import { call, put, takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/qproposals';
import {
  getQProposalsSuccess, getQProposalsError,
  getQProposalSuccess,
  getQProposalError, getQEmptyProposalSuccess
} from 'store/actions/action-creaters/voting/qproposals';
import ConstitutionVotingService from 'api/contracts/Voting/ConstitutionVotingService';
import EmergencyUpdateVotingService from 'api/contracts/Voting/EmergencyUpdateVotingService';
import GeneralUpdateVotingService from 'api/contracts/Voting/GeneralUpdateVotingService';

function* getQProposals({ drizzle }) {
  try {
    const constitutionVoting = new ConstitutionVotingService(drizzle, 'ConstitutionVoting');
    const emergencyUpdateVoting = new EmergencyUpdateVotingService(drizzle, 'EmergencyUpdateVoting');
    const generalUpdateVoting = new GeneralUpdateVotingService(drizzle, 'GeneralUpdateVoting');
    const contracts = [constitutionVoting, emergencyUpdateVoting, generalUpdateVoting];
    let result = [];
    for (let contractName of contracts) {
      const data = yield contractName.getProposals();
      result = [...result, ...data];
    }
    console.log('GET_CONSTITUTION_VOTING_PROPOSALS', result);

    yield put(getQProposalsSuccess(result));
  } catch (err) {
    console.log('err', err);
    yield put(getQProposalsError(err.message));
  }
}

function* getProposal({ contractName, id, drizzle }) {
  try {
    let contract = null;
    switch (contractName) {
      case 'ConstitutionVoting':
        contract = new ConstitutionVotingService(drizzle, contractName);
        break;
      case 'EmergencyUpdateVoting':
        contract = new EmergencyUpdateVotingService(drizzle, contractName);
        break;
      case 'GeneralUpdateVoting':
        contract = new GeneralUpdateVotingService(drizzle, contractName);
        break;
    }
    if (contract) {
      const data = yield contract.getOneProposal(id);
      // const data = null;

      console.log('GET_Q_PROPOSAL', data);
      if (data) {
        yield put(getQProposalSuccess(data));
      }else {
        yield put(getQEmptyProposalSuccess(id));
      }
    }
  } catch (err) {
    console.log('err', err);
    yield put(getQProposalError(id));
  }
}

export default [
  takeEvery(actionTypes.GET_Q_PROPOSALS, getQProposals),
  takeEvery(actionTypes.GET_Q_PROPOSAL, getProposal),
];
