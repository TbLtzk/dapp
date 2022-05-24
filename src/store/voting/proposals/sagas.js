import { call, delay, put, select, takeEvery } from 'redux-saga/effects';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';

import { getContractUpdatesProposals } from '../contract-updates/action-creators';

import { getDelegationInfo, getLockedAssets } from 'store/q-vault/action-creators';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';
import { getExpertProposals } from 'store/voting/expert-proposals/action-creators';
import {
  getBaseVotingWeightInfo,
  getConstitutionHashSuccess,
  getProposalsByType,
  setBaseVotingWeightInfo,
} from 'store/voting/proposals/action-creators';
import * as actionTypes from 'store/voting/proposals/action-types';
import { getQProposals } from 'store/voting/q-proposals/action-creators';
import { getRootProposals } from 'store/voting/root-node-proposals/action-creators';
import { getSlashingProposals } from 'store/voting/slashing-proposals/action-creators';

import { getVotingWeightProxyInstance } from 'contracts/contract-instance';
import {
  chooseExpertContractDependsOnType,
  chooseSlashingContractDependsOnType,
  creationQContractObj,
} from 'contracts/helpers/voting-helpers/base-voting-helper';
import ConstitutionVotingService from 'contracts/helpers/voting-helpers/constitution-voting-helper';
import EmergencyUpdateVotingService from 'contracts/helpers/voting-helpers/emergency-update-voting-helper';
import GeneralUpdateVotingService from 'contracts/helpers/voting-helpers/general-update-voting-helper';
import RootsVotingService from 'contracts/helpers/voting-helpers/roots-voting-helper';
import VotingService from 'contracts/helpers/voting-helpers/voting-service-helper';

import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { getNowTimestamp } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';

function * createProposalGenerator ({ proposal }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    let contractName = null;
    const type = proposal.type;
    switch (type) {
      case CONTRACT_TYPES.constitutionUpdate:
        const constitutionVoting = new ConstitutionVotingService(CONTRACTS_NAMES.constitutionVoting);
        yield constitutionVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.constitutionVoting;
        break;
      case CONTRACT_TYPES.generalQUpdate:
        const generalUpdateVoting = new GeneralUpdateVotingService(CONTRACTS_NAMES.generalUpdateVoting);
        yield generalUpdateVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.generalUpdateVoting;
        break;
      case CONTRACT_TYPES.emergencyUpdate:
        const emergencyUpdateVoting = new EmergencyUpdateVotingService(CONTRACTS_NAMES.emergencyUpdateVoting);
        yield emergencyUpdateVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.emergencyUpdateVoting;
        break;
      case CONTRACT_TYPES.addAnewRootNode:
      case CONTRACT_TYPES.removeACurrentRootNode:
        const rootsVoting = new RootsVotingService(CONTRACTS_NAMES.rootsVoting);
        yield rootsVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.rootsVoting;
        break;
      case CONTRACT_TYPES.rootNodeSlashing:
      case CONTRACT_TYPES.validatorNodeSlashing:
        const chosenContract = chooseSlashingContractDependsOnType(type);
        yield chosenContract.createProposal(proposal, userAddress);
        if (type === CONTRACT_TYPES.rootNodeSlashing) {
          contractName = CONTRACTS_NAMES.rootNodesSlashingVoting;
        } else if (type === CONTRACT_TYPES.validatorNodeSlashing) {
          contractName = CONTRACTS_NAMES.validatorsSlashingVoting;
        }
        break;
      case CONTRACT_TYPES.addNewExpert:
      case CONTRACT_TYPES.removeCurrentExpert:
      case CONTRACT_TYPES.parameterVote:
        const typeContract = proposal.type !== CONTRACT_TYPES.parameterVote
          ? CONTRACT_TYPES.member
          : CONTRACT_TYPES.parameters;
        const contract = chooseExpertContractDependsOnType(typeContract, proposal.panelType);
        contractName = contract.contractName;
        yield contract.createProposal(proposal, userAddress);
        break;
      default:
        return null;
    }

    yield put(getBaseVotingWeightInfo());
    yield put(getDelegationInfo(userAddress));
    yield put(getProposalsByType(contractName));

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * voteForProposalGenerator ({ data }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contract = new VotingService(data?.contract);
    if (data.first === 'approve') {
      yield contract.approve(data.id, userAddress);
    } else if (data?.first === 'basic-vote-on-proposal') {
      if (data['vote-proposal'] === 'yes') {
        yield contract.voteFor(data?.idProposal, userAddress);
      } else if (data['vote-proposal'] === 'no') {
        yield contract.voteAgainst(data?.idProposal, userAddress);
      }
    } else if (data?.first === 'constitution-check') {
      yield contract.veto(data?.idProposal, userAddress);
    }

    yield put(getBaseVotingWeightInfo());
    yield put(getDelegationInfo(userAddress));
    yield put(getLockedAssets(userAddress));

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * executeProposalGenerator ({ data }) {
  try {
    yield put(setTransactionLoading());

    const { userAddress } = yield select((state) => state.userInf);
    const contract = new VotingService(data?.contract);
    yield contract.execute(data?.idProposal, userAddress);
    yield put(getProposalsByType(data.contract));
    yield put(getBaseVotingWeightInfo());
    yield put(getDelegationInfo(userAddress));

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * getProposalsByTypeGenerator ({ contractName }) {
  switch (contractName) {
    case CONTRACTS_NAMES.constitutionVoting:
    case CONTRACTS_NAMES.emergencyUpdateVoting:
    case CONTRACTS_NAMES.generalUpdateVoting: {
      yield put(getQProposals());
      break;
    }
    case CONTRACTS_NAMES.rootsVoting: {
      yield put(getRootProposals());
      break;
    }
    case CONTRACTS_NAMES.rootNodesSlashingVoting:
    case CONTRACTS_NAMES.validatorsSlashingVoting: {
      yield put(getSlashingProposals());
      break;
    }
    case CONTRACTS_NAMES.ePQFIMembershipVoting:
    case CONTRACTS_NAMES.ePDRMembershipVoting:
    case CONTRACTS_NAMES.ePQFIParametersVoting:
    case CONTRACTS_NAMES.ePDRParametersVoting:
    case CONTRACTS_NAMES.ePRSMembershipVoting:
    case CONTRACTS_NAMES.ePRSParametersVoting: {
      yield put(getExpertProposals());
      break;
    }
    case CONTRACTS_NAMES.addressVoting:
    case CONTRACTS_NAMES.upgradeVoting: {
      yield put(getContractUpdatesProposals());
      break;
    }
  }
}

function * getNumberAllProposalsGenerator () {
  const { appMode } = yield select((state) => state.dashboardMode);
  yield put(getQProposals());
  yield put(getRootProposals());

  if (appMode === MODE.advanced) {
    yield put(getExpertProposals());
    yield put(getSlashingProposals());
    yield put(getContractUpdatesProposals());
  }
  yield delay(240000);
  yield call(getNumberAllProposalsGenerator);
}

function * getConstitutionHashGenerator () {
  try {
    const contract = creationQContractObj(CONTRACTS_NAMES.constitutionVoting);
    const data = yield contract.getConstitutionHash();
    yield put(getConstitutionHashSuccess(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getBaseVotingWeightInfoGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getVotingWeightProxyInstance);
    const timeStamp = getNowTimestamp();
    const result = yield contract.getBaseVotingWeightInfo(userAddress, timeStamp);
    yield put(setBaseVotingWeightInfo(result));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export default [
  takeEvery(actionTypes.CREATE_PROPOSAL, createProposalGenerator),
  takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposalGenerator),
  takeEvery(actionTypes.EXECUTE_PROPOSAL, executeProposalGenerator),
  takeEvery(actionTypes.GET_PROPOSALS_BY_TYPE, getProposalsByTypeGenerator),
  takeEvery(actionTypes.GET_NUMBER_ALL_PROPOSALS, getNumberAllProposalsGenerator),
  takeEvery(actionTypes.GET_CONSTITUTION_HASH, getConstitutionHashGenerator),
  takeEvery(actionTypes.GET_BASE_VOTING_WEIGHT_INFO, getBaseVotingWeightInfoGenerator),
];
