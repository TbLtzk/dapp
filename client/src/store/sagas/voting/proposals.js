import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/proposals';
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler';

import {
  createProposalSuccess, voteForProposalSuccess,
  getEndedProposalsSuccess, getEndedProposalsError,
  executeProposalSuccess, executeProposalError,
  getProposalsListError, getProposalsListSuccess,
  getProposalSuccess, getEmptyProposalSuccess, getProposalError, getProposalVote,
  getNumberAllProposalsSuccess
} from 'store/actions/action-creaters/voting/proposals';
import {
  creationQContractObj, creationRootContractObj, creationExpertContractObj, creationSlashingContractObj,
  creationQContractsObjArray, creationSlashingContractsObjArray, creationExpertContractsObjArray
} from 'contracts/handler/VotingHandler';

import ConstitutionVotingService from 'contracts/src/voting/ConstitutionVoting';
import EmergencyUpdateVotingService from 'contracts/src/voting/EmergencyUpdateVoting';
import GeneralUpdateVotingService from 'contracts/src/voting/GeneralUpdateVoting';
import RootsVotingService from 'contracts/src/voting/RootsVoting';
import VotingService from 'contracts/src/voting/VotingService';

import {
  chooseExpertContractDependsOnType,
  chooseExpertContractNameDependsOnType
} from 'contracts/handler/QExpertVotingHandler';

import { chooseSlashingContractDependsOnType } from 'contracts/handler/SlashingVotingHandler';

function* createProposal({ drizzle, data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);

    let result = null;
    let idProposal = null;
    let contractName = null;
    if (data && drizzle) {
      switch (data?.first) {
        case 'constitution-update':
          const constitutionVoting = new ConstitutionVotingService('ConstitutionVoting');
          result = yield constitutionVoting.createProposal(data, userAddress);
          contractName = 'ConstitutionVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'general-q-update':
          const generalUpdateVoting = new GeneralUpdateVotingService('GeneralUpdateVoting');
          result = yield generalUpdateVoting.createProposal(data, userAddress);
          contractName = 'GeneralUpdateVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'emergency-update':
          const emergencyUpdateVoting = new EmergencyUpdateVotingService('EmergencyUpdateVoting');
          result = yield emergencyUpdateVoting.createProposal(data, userAddress);
          contractName = 'EmergencyUpdateVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'add-a-new-root-node':
        case 'remove-a-current-root-node':
          const rootsVoting = new RootsVotingService('RootsVoting');
          result = yield rootsVoting.createProposal(data, userAddress);
          contractName = 'RootsVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'root-node-slashing':
        case 'validator-node-slashing':
          const chosenContract = chooseSlashingContractDependsOnType(drizzle, data?.first);
          result = yield chosenContract.createProposal(data, userAddress);
          if (data?.first === 'root-node-slashing') {
            contractName = 'RootNodesSlashingVoting';
          } else if (data?.first === 'validator-node-slashing') {
            contractName = 'ValidatorsSlashingVoting';
          }
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'add-a-new-expert':
        case 'remove-a-current-expert':
        case 'parameter-vote':
          const typeContract = data.first !== 'parameter-vote' ? 'member' : 'parameters';
          const contract = chooseExpertContractDependsOnType(drizzle, typeContract, data['type-proposal']);
          result = yield contract.createProposal(data, userAddress);
          contractName = chooseExpertContractNameDependsOnType(drizzle, typeContract, data['type-proposal']);
          if (data?.first === 'remove-a-current-expert') {
            //TODO: for createRemoveExpertProposal use RemoveProposalCreated event
            idProposal = result?.events?.RemoveProposalCreated?.returnValues?._id;
          } else {
            idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          }
          break;
        default:
          return null;
      }
    }
    yield call(getProposalDependsOnType, contractName, drizzle, data, idProposal, true);
    yield put(createProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* voteForProposal({ drizzle, data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);

    let result = null;
    if (data && drizzle) {
      const contract = new VotingService(data?.contract);
      if (data?.first === 'basic-vote-on-proposal') {
        if (data['vote-proposal'] === 'yes') {
          result = yield contract.voteFor(data?.idProposal, userAddress);
          // const execute = yield contract.execute(data?.idProposal, userAddress);
          // console.log("RESULT VOTING execute", execute);
        } else if (data['vote-proposal'] === 'no') {
          result = yield contract.voteAgainst(data?.idProposal, userAddress);
          // const execute = yield contract.execute(data?.idProposal, userAddress);
          // console.log("RESULT VOTING execute", execute);
        }
      } else if (data?.first === 'constitution-check') {
        result = yield contract.veto(data?.idProposal, userAddress);
      } else if (data?.first === 'q-community-veto') {
        //TODO: when backenders do it
      }
    }
    yield call(getProposalDependsOnType, data?.contract, drizzle, data, data?.idProposal, true);
    yield put(voteForProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* executeProposal({ drizzle, data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    let result = null;
    if (data && drizzle) {
      const contract = new VotingService(data?.contract);
      const execute = yield contract.execute(data?.idProposal, userAddress);
    }
    yield call(getProposalDependsOnType, data?.contract, drizzle, data, data?.idProposal, true);
    yield put(executeProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err.message);
    yield put(executeProposalError(err.message));
    yield put(setTransactionLoadingError(err.message));
  }
}

function* updateProposal({ drizzle, data }) {
  yield call(getProposalDependsOnType, data?.contract, drizzle, data, data?.idProposal, false);
}

function* getProposalDependsOnType(contractName, drizzle, data, id, activeProposal) {
  try {
    switch (contractName) {
      case 'ConstitutionVoting':
      case 'EmergencyUpdateVoting':
      case 'GeneralUpdateVoting':
        yield put(getProposalVote(contractName, id, drizzle, 'q-proposals', activeProposal));
        break;
      case 'RootsVoting':
        yield put(getProposalVote(contractName, id, drizzle, 'q-root-node-panel', activeProposal));
        break;
      case 'RootNodesSlashingVoting':
      case 'ValidatorsSlashingVoting':
        yield put(getProposalVote(contractName, id, drizzle, 'slashing-proposals', activeProposal));
        break;
      case 'EPQFI_MembershipVoting':
      case 'EPDR_MembershipVoting':
      case 'EPQFI_ParametersVoting':
      case 'EPDR_ParametersVoting':
        yield put(getProposalVote(contractName, id, drizzle, 'q-expert-proposals', activeProposal));
        break;
      default:
        return null;
    }
  } catch (e) {
    console.log('e', e);
  }
}

function* getOneProposalShared({ drizzle, data }) {
  yield call(getProposalDependsOnType, data?.contract, drizzle, data, data?.id, false);
}

function* getProposalsList({ drizzle, activeTab }) {
  try {
    let contracts = null;
    switch (activeTab) {
      case 'q-proposals':
        contracts = creationQContractsObjArray(drizzle);
        break;
      case 'q-root-node-panel':
        contracts = creationRootContractObj(drizzle);
        break;
      case 'slashing-proposals':
        contracts = creationSlashingContractsObjArray(drizzle);
        break;
      case 'q-expert-proposals':
        contracts = creationExpertContractsObjArray(drizzle);
        break;
    }
    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getProposals();
    }

    yield put(getProposalsListSuccess(result));
  } catch (e) {
    console.log('e', e);
    yield put(getProposalsListError(e));
  }
}

function* getProposal({ contractName, id, drizzle, activeTab, activeProposal }) {
  try {
    let contract = null;
    switch (activeTab) {
      case 'q-proposals':
        contract = creationQContractObj(drizzle, contractName);
        break;
      case 'q-root-node-panel':
        contract = creationRootContractObj(drizzle);
        break;
      case 'slashing-proposals':
        contract = creationSlashingContractObj(drizzle, contractName);
        break;
      case 'q-expert-proposals':
        contract = creationExpertContractObj(drizzle, contractName);
        break;
    }
    if (contract) {
      let data = null;
      if (activeProposal) {
        data = yield contract.getOneProposal(id);
      } else {
        data = yield contract.getProposalWithoutStatusChecked(id);
      }
      // const data = null;
      if (data) {
        yield put(getProposalSuccess(data));
      } else {
        yield put(getEmptyProposalSuccess(id));
      }
    }
  } catch (err) {
    console.log('err', err);
    yield put(getProposalError(id));
  }
}

function* getEndedProposals({ drizzle, activeTab }) {
  try {
    let contracts = null;
    if (drizzle) {
      switch (activeTab) {
        case 'q-proposals':
          contracts = creationQContractsObjArray(drizzle);
          break;
        case 'q-root-node-panel':
          contracts = creationRootContractObj(drizzle);
          break;
        case 'q-expert-proposals':
          contracts = creationExpertContractsObjArray(drizzle);
          break;
        case 'slashing-proposals':
          contracts = creationSlashingContractsObjArray(drizzle);
          break;
      }
    }
    let result = [];
    if (Array.isArray(contracts)) {
      for (let contractName of contracts) {
        const data = yield contractName.getEndedProposals();
        result = [...result, ...data];
      }
    } else {
      result = yield contracts?.getEndedProposals();
    }

    yield put(getEndedProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
    yield put(getEndedProposalsError(err.message));
  }
}

function* getNumberAllProposals() {
  try {
    const contracts = [...creationQContractsObjArray(), creationRootContractObj(),
      ...creationExpertContractsObjArray(), ...creationSlashingContractsObjArray()];
    console.log("contracts", contracts);
    let result = {ended: 0, active: 0};
    for (let contractName of contracts) {
      const data = yield contractName.getProposalsCount();
      console.log("data", data);
      result = {ended: data?.ended + result?.ended, active: data?.active + result?.active};
    }

    console.log("Proposals counter", result);

    yield put(getNumberAllProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
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

  // takeEvery(actionTypes.GET_NUMBER_ALL_ACTIVE_PROPOSALS, getNumberActiveProposals),
  takeEvery(actionTypes.GET_NUMBER_ALL_PROPOSALS, getNumberAllProposals),
];
