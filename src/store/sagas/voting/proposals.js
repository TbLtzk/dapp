import { call, put, takeEvery, select } from 'redux-saga/effects';

import { PROPOSALS_TYPES } from 'constants/statuses';

import * as actionTypes from 'store/actions/action-types/voting/proposals';
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler';

import {
  getLockedAssets
} from 'store/actions/action-creaters/q-piggy-bank';

import {
  createProposalSuccess, voteForProposalSuccess,
  executeProposalSuccess, executeProposalError,
  getNumberAllProposalsSuccess, getConstitutionHashSuccess,
} from 'store/actions/action-creaters/voting/proposals';
import {
  getProposalQ, getQEndedProposals, getQProposalsList
} from 'store/actions/action-creaters/voting/q-proposals';
import {
  getProposalRootNode, getRootNodeEndedProposals, getRootNodeProposalsList
} from 'store/actions/action-creaters/voting/root-node-proposals';
import {
  getProposalExpert, getExpertEndedProposals, getExpertProposalsList
} from 'store/actions/action-creaters/voting/expert-proposals';
import {
  getProposalSlashing, getSlashingEndedProposals, getSlashingProposalsList
} from 'store/actions/action-creaters/voting/slashing-proposals';

import {
  creationQContractObj, creationRootContractObj,
  creationQContractsObjArray, creationSlashingContractsObjArray, creationExpertContractsObjArray
} from 'contracts/handler/VotingHandler';
import { chooseSlashingContractDependsOnType } from 'contracts/handler/SlashingVotingHandler';
import {
  chooseExpertContractDependsOnType,
  chooseExpertContractNameDependsOnType
} from 'contracts/handler/QExpertVotingHandler';

import ConstitutionVotingService from 'contracts/src/voting/ConstitutionVoting';
import EmergencyUpdateVotingService from 'contracts/src/voting/EmergencyUpdateVoting';
import GeneralUpdateVotingService from 'contracts/src/voting/GeneralUpdateVoting';
import RootsVotingService from 'contracts/src/voting/RootsVoting';
import VotingService from 'contracts/src/voting/VotingService';

function* createProposal({ data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);

    let result = null;
    let idProposal = null;
    let contractName = null;
    if (data) {
      switch (data?.first) {
        case 'constitution-update':
          const constitutionVoting = new ConstitutionVotingService();
          result = yield constitutionVoting.createProposal(data, userAddress);
          contractName = 'ConstitutionVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'general-q-update':
          const generalUpdateVoting = new GeneralUpdateVotingService();
          result = yield generalUpdateVoting.createProposal(data, userAddress);
          contractName = 'GeneralUpdateVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'emergency-update':
          const emergencyUpdateVoting = new EmergencyUpdateVotingService();
          result = yield emergencyUpdateVoting.createProposal(data, userAddress);
          contractName = 'EmergencyUpdateVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'add-a-new-root-node':
        case 'remove-a-current-root-node':
          const rootsVoting = new RootsVotingService();
          result = yield rootsVoting.createProposal(data, userAddress);
          contractName = 'RootsVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          break;
        case 'root-node-slashing':
        case 'validator-node-slashing':
          const chosenContract = chooseSlashingContractDependsOnType(data?.first);
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
          const contract = chooseExpertContractDependsOnType(typeContract, data['type-proposal']);
          result = yield contract.createProposal(data, userAddress);
          contractName = chooseExpertContractNameDependsOnType(typeContract, data['type-proposal']);
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
    yield call(getProposalDependsOnType, contractName, data, idProposal, true);
    yield put(createProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.error('err', err);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* voteForProposal({ data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);

    let result = null;
    if (data) {
      const contract = new VotingService(data?.contract);
      if (data?.first === 'basic-vote-on-proposal') {
        if (data['vote-proposal'] === 'yes') {
          result = yield contract.voteFor(data?.idProposal, userAddress);
        } else if (data['vote-proposal'] === 'no') {
          result = yield contract.voteAgainst(data?.idProposal, userAddress);
        }
      } else if (data?.first === 'constitution-check') {
        result = yield contract.veto(data?.idProposal, userAddress);
      } else if (data?.first === 'q-community-veto') {
        //TODO: when backenders do it
      }
    }
    yield call(getProposalDependsOnType, data?.contract, data, data?.idProposal, true);
    yield put(voteForProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());
    yield put(getLockedAssets(userAddress));

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* executeProposal({ data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);
    let result = null;
    if (data) {
      const contract = new VotingService(data?.contract);
      const execute = yield contract.execute(data?.idProposal, userAddress);
    }
    yield call(getProposalDependsOnType, data?.contract, data, data?.idProposal, false);
    yield put(executeProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());
  } catch (err) {
    console.log('err', err.message);
    yield put(executeProposalError(err.message));
    yield put(setTransactionLoadingError(err.message));
  }
}

function* updateProposal({ data }) {
  yield call(getProposalDependsOnType, data?.contract, data, data?.idProposal, false);
}

function* getProposalDependsOnType(contractName, data, id, activeProposal) {
  try {
    switch (contractName) {
      case 'ConstitutionVoting':
      case 'EmergencyUpdateVoting':
      case 'GeneralUpdateVoting':
        yield put(getProposalQ(contractName, id, activeProposal));
        break;
      case 'RootsVoting':
        yield put(getProposalRootNode(contractName, id, activeProposal));
        break;
      case 'RootNodesSlashingVoting':
      case 'ValidatorsSlashingVoting':
        yield put(getProposalSlashing(contractName, id, activeProposal));
        break;
      case 'EPQFI_MembershipVoting':
      case 'EPDR_MembershipVoting':
      case 'EPQFI_ParametersVoting':
      case 'EPDR_ParametersVoting':
        yield put(getProposalExpert(contractName, id, activeProposal));
        break;
    }
  } catch (e) {
    console.log('e', e);
  }
}

function* getOneProposalShared({ data }) {
  yield call(getProposalDependsOnType, data?.contract, data, data?.id, false);
}

function* getProposalsList({ activeTab }) {
  try {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        yield put(getQProposalsList());
        break;
      case PROPOSALS_TYPES.rootNodePanel:
        yield put(getRootNodeProposalsList());
        break;
      case PROPOSALS_TYPES.slashingProposals:
        yield put(getSlashingProposalsList());
        break;
      case PROPOSALS_TYPES.expertProposals:
        yield put(getExpertProposalsList());
        break;
    }
  } catch (e) {
    console.log('e', e);
  }
}

function* getEndedProposals({ activeTab }) {
  try {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        yield put(getQEndedProposals());
        break;
      case PROPOSALS_TYPES.rootNodePanel:
        yield put(getRootNodeEndedProposals());
        break;
      case PROPOSALS_TYPES.expertProposals:
        yield put(getExpertEndedProposals());
        break;
      case PROPOSALS_TYPES.slashingProposals:
        yield put(getSlashingEndedProposals());
        break;
    }
  } catch (err) {
    console.log('err', err.message);
  }
}

function* getNumberAllProposals() {
  try {
    const contracts = [...creationQContractsObjArray(), creationRootContractObj(),
      ...creationExpertContractsObjArray(), ...creationSlashingContractsObjArray()];
    let result = {
      ended: 0,
      active: 0
    };
    for (let contractName of contracts) {
      const data = yield contractName.getProposalsCount();
      result = {
        ended: data?.ended + result?.ended,
        active: data?.active + result?.active
      };
    }
    yield put(getNumberAllProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
  }
}

function* getConstitutionHash() {
  try {
    const contract = creationQContractObj('ConstitutionVoting');
    const data = yield contract.getConstitutionHash();

    yield put(getConstitutionHashSuccess(data));

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

  takeEvery(actionTypes.GET_NUMBER_ALL_PROPOSALS, getNumberAllProposals),
  takeEvery(actionTypes.GET_CONSTITUTION_HASH, getConstitutionHash),
];
