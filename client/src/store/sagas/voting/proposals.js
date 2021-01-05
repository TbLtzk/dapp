import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/voting/proposals';
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler';

import {
  createProposalSuccess, voteForProposalSuccess,
  getEndedProposalsSuccess, getEndedProposalsError
} from 'store/actions/action-creaters/voting/proposals';
import { getQProposal } from 'store/actions/action-creaters/voting/qproposals';
import { getRootsVotingProposal } from 'store/actions/action-creaters/voting/roots-voting';
import { getQExpertProposal } from 'store/actions/action-creaters/voting/expert-voting';
import { getSlashingVotingProposal } from 'store/actions/action-creaters/voting/slashing-voting';
import { arrContracts } from 'store/sagas/voting/expert-voting';

import ConstitutionVotingService from 'api/contracts/Voting/ConstitutionVotingService';
import EmergencyUpdateVotingService from 'api/contracts/Voting/EmergencyUpdateVotingService';
import GeneralUpdateVotingService from 'api/contracts/Voting/GeneralUpdateVotingService';
import RootsVotingService from 'api/contracts/Voting/RootsVotingService';

import { chooseExpertContractDependsOnType, chooseExpertContractNameDependsOnType } from 'api/contracts/Voting/handler/QExpertVotingHandler';
import { chooseSlashingContractDependsOnType } from 'api/contracts/Voting/handler/SlashingVotingHandler';
import VotingService from 'api/contracts/Voting/VotingService';
import SlashingVotingService from 'api/contracts/Voting/SlashingVotingService';

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
          const constitutionVoting = new ConstitutionVotingService(drizzle, 'ConstitutionVoting');
          result = yield constitutionVoting.createProposal(data, userAddress);
          contractName = 'ConstitutionVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          // yield put(getQProposal(constitutionVoting, result?.events?.ProposalCreated?.returnValues?._id));
          break;
        case 'general-q-update':
          const generalUpdateVoting = new GeneralUpdateVotingService(drizzle, 'GeneralUpdateVoting');
          result = yield generalUpdateVoting.createProposal(data, userAddress);
          contractName = 'GeneralUpdateVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          // yield put(getQProposal(generalUpdateVoting, result?.events?.ProposalCreated?.returnValues?._id));
          console.log('RESULT, general-q-update', result);
          break;
        case 'emergency-update':
          const emergencyUpdateVoting = new EmergencyUpdateVotingService(drizzle, 'EmergencyUpdateVoting');
          result = yield emergencyUpdateVoting.createProposal(data, userAddress);
          contractName = 'EmergencyUpdateVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          // yield put(getQProposal(emergencyUpdateVoting, result?.events?.ProposalCreated?.returnValues?._id));
          break;
        case 'add-a-new-root-node':
        case 'remove-a-current-root-node':
          const rootsVoting = new RootsVotingService(drizzle, 'RootsVoting');
          result = yield rootsVoting.createProposal(data, userAddress);
          contractName = 'RootsVoting';
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          // yield put(getRootsVotingProposal(rootsVoting, result?.events?.ProposalCreated?.returnValues?._id));
          break;
        case 'root-node-slashing':
        case 'validator-node-slashing':
          const chosenContract = chooseSlashingContractDependsOnType(drizzle, data?.first);
          result = yield chosenContract.createProposal(data, userAddress);
          if (data?.first === 'root-node-slashing') {
            contractName = 'RootNodesSlashingVoting';
          } else if (type === 'validator-node-slashing') {
            contractName = 'ValidatorsSlashingVoting';
          }
          idProposal = result?.events?.ProposalCreated?.returnValues?._id;
          // yield put(getSlashingVotingProposal(chosenContract, result?.events?.ProposalCreated?.returnValues?._id));
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

            // yield put(getQExpertProposal(contract, result?.events?.RemoveProposalCreated?.returnValues?._id));
          } else {
            idProposal = result?.events?.ProposalCreated?.returnValues?._id;
            // yield put(getQExpertProposal(contract, result?.events?.ProposalCreated?.returnValues?._id));
          }
          break;
        default:
          return null;
      }
    }
    // idProposal = result?.events?.ProposalCreated?.returnValues?._id;
    yield call(getProposalDependsOnType, contractName, drizzle, data, idProposal);
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
      const contract = new VotingService(drizzle, data?.contract);
      console.log('VOTING contract', contract);
      if (data?.first === 'basic-vote-on-proposal') {
        if (data['vote-proposal'] === 'yes') {
          result = yield contract.voteFor(data?.idProposal, userAddress);
          const execute = yield contract.execute(data?.idProposal, userAddress);
          console.log('RESULT VOTING voteFor', result);
          // console.log("RESULT VOTING execute", execute);
        } else if (data['vote-proposal'] === 'no') {
          result = yield contract.voteAgainst(data?.idProposal, userAddress);
          const execute = yield contract.execute(data?.idProposal, userAddress);
          console.log('RESULT VOTING voteAgainst', result);
          // console.log("RESULT VOTING execute", execute);
        }
      } else if (data?.first === 'constitution-check') {
        result = yield contract.veto(data?.idProposal, userAddress);
        console.log('RESULT VETO', result);
      } else if (data?.first === 'q-community-veto') {
        //TODO: when backenders do it
      }
    }
    yield call(getProposalDependsOnType, data?.contract, drizzle, data, data?.idProposal);
    yield put(voteForProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* getProposalDependsOnType(contractName, drizzle, data, id,) {
  console.log('getProposalDependsOnType', drizzle);
  console.log('getProposalDependsOnType', data);
  console.log('getProposalDependsOnType', id);
  console.log('getProposalDependsOnType', contractName);
  try {
    switch (contractName) {
      case 'ConstitutionVoting':
      case 'EmergencyUpdateVoting':
      case 'GeneralUpdateVoting':
        yield put(getQProposal(contractName, id, drizzle));
        break;
      case 'RootsVoting':
        yield put(getRootsVotingProposal(contractName, id, drizzle));
        break;
      case 'root-node-slashing':
      case 'validator-node-slashing':
        const chosenContract = chooseSlashingContractDependsOnType(drizzle, data?.first);
        yield put(getSlashingVotingProposal(chosenContract, id));
        break;
      case 'add-a-new-expert':
      case 'remove-a-current-expert':
      case 'parameter-vote':
        const typeContract = data.first !== 'parameter-vote' ? 'member' : 'parameters';
        const contract = chooseExpertContractDependsOnType(drizzle, typeContract, data['type-proposal']);
        yield put(getQExpertProposal(contract, id));
        break;
      default:
        return null;
    }
  } catch (e) {
    console.log('e', e);
  }

}

function* getEndedProposals({ drizzle, activeTab }) {
  try {
    console.log('drizzle', drizzle);
    console.log('activeTab', activeTab);
    let result = [];
    if (drizzle) {
      switch (activeTab) {
        case 'q-proposals':
          const constitutionVoting = new ConstitutionVotingService(drizzle, 'ConstitutionVoting');
          const emergencyUpdateVoting = new EmergencyUpdateVotingService(drizzle, 'EmergencyUpdateVoting');
          const generalUpdateVoting = new GeneralUpdateVotingService(drizzle, 'GeneralUpdateVoting');
          const contracts = [constitutionVoting, emergencyUpdateVoting, generalUpdateVoting];
          for (let contractName of contracts) {
            const data = yield contractName.getEndedProposals();
            result = [...result, ...data];
          }
          console.log('GET_Q_PROPOSALS_ENDED', result);
          break;
        case 'q-root-node-panel':
          const rootsVotingService = new RootsVotingService(drizzle, 'RootsVoting');
          result = yield rootsVotingService.getEndedProposals();
          console.log('GET_ROOT_VOTING_PROPOSALS_ENDED', result);
          break;
        case 'q-expert-proposals':
          let contractsList = [];
          for (let contract of arrContracts) {
            contractsList.push(chooseExpertContractDependsOnType(drizzle, contract.typeContract, contract.type));
          }
          for (let contract of contractsList) {
            const data = yield contract.getEndedProposals();
            result = [...result, ...data];
          }
          console.log('GET_QEXPERT_PROPOSALS_ENDED', result);
          break;
        case 'slashing-proposals':
          const validatorsSlashingVoting = new SlashingVotingService(drizzle, 'ValidatorsSlashingVoting');
          const rootNodesSlashingVoting = new SlashingVotingService(drizzle, 'RootNodesSlashingVoting');
          const contractsLists = [validatorsSlashingVoting, rootNodesSlashingVoting];
          for (let contractName of contractsLists) {
            const data = yield contractName.getEndedProposals();
            result = [...result, ...data];
          }
          console.log('GET_SLASHING_VOTING_PROPOSALS_ENDED', result);
          break;
      }
    }

    yield put(getEndedProposalsSuccess(result));

  } catch (err) {
    console.log('err', err.message);
    yield put(getEndedProposalsError(err.message));
  }
}

export default [
  takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),
  takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposal),

  takeEvery(actionTypes.GET_ENDED_PROPOSALS, getEndedProposals),
];
