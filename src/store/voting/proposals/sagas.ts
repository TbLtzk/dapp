import { call, delay, put, select, takeEvery } from 'typed-redux-saga';

import {
  getBaseVotingWeightInfo,
  getConstitutionHashSuccess,
  getNumberAllProposals,
  getProposals,
  getProposalsByType,
  setBaseVotingWeightInfo,
  setMinimalActiveBlock,
  setProposals,
  setVoteDetails,
} from './actions';
import { proposalsByTypeSelector } from './selectors';
import * as types from './types';

import { getDelegationInfo, getLockedAssets } from 'store/q-vault/action-creators';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';

import { getConstitutionVotingInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance';
import { getQProposals } from 'contracts/helpers/voting/constitution';
import { getContractUpdateProposals } from 'contracts/helpers/voting/contract-update';
import { getExpertProposals } from 'contracts/helpers/voting/expert';
import { getRootNodeProposals } from 'contracts/helpers/voting/root-node';
import { getSlashingProposals } from 'contracts/helpers/voting/slashing';
import {
  chooseExpertContractDependsOnType,
  chooseSlashingContractDependsOnType,
} from 'contracts/helpers/voting-helpers/base-voting-helper';
import ConstitutionVotingService from 'contracts/helpers/voting-helpers/constitution-voting-helper';
import EmergencyUpdateVotingService from 'contracts/helpers/voting-helpers/emergency-update-voting-helper';
import GeneralUpdateVotingService from 'contracts/helpers/voting-helpers/general-update-voting-helper';
import RootsVotingService from 'contracts/helpers/voting-helpers/roots-voting-helper';
import VotingService from 'contracts/helpers/voting-helpers/voting-service-helper';

import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { VOTING_TYPES } from 'constants/votingTypes';
import { getNowTimestamp } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';
import { getMinimalActiveBlockHeight } from 'func/useful';

function* getProposalsGenerator ({ proposalType }: types.GetProposals) {
  try {
    const { minimalActiveBlockHeight, lastBlockHeight } = yield* call(getMinimalActiveBlockHeight);

    const { proposals, lastBlock } = yield* select(proposalsByTypeSelector(proposalType));
    const proposalFn = {
      q: getQProposals,
      rootNode: getRootNodeProposals,
      expert: getExpertProposals,
      slashing: getSlashingProposals,
      contractUpdate: getContractUpdateProposals,
    }[proposalType];

    const newProposals = yield* call(
      () => proposalFn(proposals, lastBlock)
    );

    yield* put(setProposals(proposalType, newProposals, Number(lastBlockHeight)));
    yield* put(setMinimalActiveBlock(minimalActiveBlockHeight));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export const onEscrowCastObjection = (
  data: any,
  contractName: string,
  proposalId: string
) => ({
  data,
  contractName,
  proposalId
});

function* createProposalGenerator ({ proposal }: types.CreateProposal) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    let contractName = null;
    let formType = '';
    const type = proposal.type;
    switch (type) {
      case CONTRACT_TYPES.constitutionUpdate:
        const constitutionVoting = new ConstitutionVotingService(CONTRACTS_NAMES.constitutionVoting);
        yield constitutionVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.constitutionVoting;
        formType = formTypes.qProposal;
        break;
      case CONTRACT_TYPES.generalQUpdate:
        const generalUpdateVoting = new GeneralUpdateVotingService(CONTRACTS_NAMES.generalUpdateVoting);
        yield generalUpdateVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.generalUpdateVoting;
        formType = formTypes.qProposal;
        break;
      case CONTRACT_TYPES.emergencyUpdate:
        const emergencyUpdateVoting = new EmergencyUpdateVotingService(CONTRACTS_NAMES.emergencyUpdateVoting);
        yield emergencyUpdateVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.emergencyUpdateVoting;
        formType = formTypes.qProposal;
        break;
      case CONTRACT_TYPES.addAnewRootNode:
      case CONTRACT_TYPES.removeACurrentRootNode:
        const rootsVoting = new RootsVotingService(CONTRACTS_NAMES.rootsVoting);
        yield rootsVoting.createProposal(proposal, userAddress);
        contractName = CONTRACTS_NAMES.rootsVoting;
        formType = formTypes.rootNodeProposal;
        break;
      case CONTRACT_TYPES.rootNodeSlashing:
      case CONTRACT_TYPES.validatorNodeSlashing:
        const chosenContract = chooseSlashingContractDependsOnType(type);
        yield chosenContract.createProposal(proposal, userAddress);
        formType = formTypes.slashingProposal;
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
        contractName = contract?.contractName;
        formType = formTypes.expertProposal;
        yield contract?.createProposal(proposal, userAddress);
        break;
      default:
        return null;
    }

    yield* put(getBaseVotingWeightInfo());
    yield* put(getDelegationInfo(userAddress));
    yield* put(getProposalsByType(contractName));

    yield* put(setTransactionLoadingSuccess({ type: formType }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

function* voteForProposalGenerator ({ data }: types.VoteForProposal) {
  try {
    yield* put(setTransactionLoading());
    yield* put(setVoteDetails({
      contract: data.contract,
      proposalId: data.proposalId,
    }));

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = new VotingService(data.contract);

    switch (data.type) {
      case VOTING_TYPES.approve:
        yield contract.approve(data.proposalId, userAddress);
        break;

      case VOTING_TYPES.constitution:
        yield contract.veto(data.proposalId, userAddress);
        break;

      case VOTING_TYPES.basic:
        yield data.isVotedFor
          ? contract.voteFor(data.proposalId, userAddress)
          : contract.voteAgainst(data.proposalId, userAddress);
        break;
    }

    yield* put(getBaseVotingWeightInfo());
    yield* put(getDelegationInfo(userAddress));
    yield* put(getLockedAssets(userAddress));

    yield* put(setTransactionLoadingSuccess({
      type: formTypes.vote,
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

function* executeProposalGenerator ({ data }: types.ExecuteProposal) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = new VotingService(data?.contract);
    yield contract.execute(data?.idProposal, userAddress);
    yield* put(getProposalsByType(data.contract));
    yield* put(getBaseVotingWeightInfo());
    yield* put(getDelegationInfo(userAddress));

    yield* put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

function* getProposalsByTypeGenerator ({ contractName }: types.GetProposalsByType) {
  switch (contractName) {
    case CONTRACTS_NAMES.constitutionVoting:
    case CONTRACTS_NAMES.emergencyUpdateVoting:
    case CONTRACTS_NAMES.generalUpdateVoting: {
      yield* put(getProposals('q'));
      break;
    }
    case CONTRACTS_NAMES.rootsVoting: {
      yield* put(getProposals('rootNode'));
      break;
    }
    case CONTRACTS_NAMES.rootNodesSlashingVoting:
    case CONTRACTS_NAMES.validatorsSlashingVoting: {
      yield* put(getProposals('slashing'));
      break;
    }
    case CONTRACTS_NAMES.ePQFIMembershipVoting:
    case CONTRACTS_NAMES.ePDRMembershipVoting:
    case CONTRACTS_NAMES.ePQFIParametersVoting:
    case CONTRACTS_NAMES.ePDRParametersVoting:
    case CONTRACTS_NAMES.ePRSMembershipVoting:
    case CONTRACTS_NAMES.ePRSParametersVoting: {
      yield* put(getProposals('expert'));
      break;
    }
    case CONTRACTS_NAMES.addressVoting:
    case CONTRACTS_NAMES.upgradeVoting: {
      yield* put(getProposals('contractUpdate'));
      break;
    }
  }
}

function* getNumberAllProposalsGenerator () {
  yield* put(getProposals('q'));
  yield* put(getProposals('rootNode'));
  yield* put(getProposals('expert'));
  yield* put(getProposals('slashing'));
  yield* put(getProposals('contractUpdate'));

  yield* delay(240000);
  yield* put(getNumberAllProposals());
}

function* getConstitutionHashGenerator () {
  try {
    const contract = yield* call(() => getConstitutionVotingInstance());
    const hash = yield* call(() => contract.constitutionHash());
    yield* put(getConstitutionHashSuccess(hash));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function* getBaseVotingWeightInfoGenerator () {
  try {
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getVotingWeightProxyInstance);
    const timeStamp = getNowTimestamp();
    const result = yield* call(() => contract.getBaseVotingWeightInfo(userAddress, timeStamp));
    yield* put(setBaseVotingWeightInfo(result));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export default [
  takeEvery<types.GetProposals>('GET_PROPOSALS', getProposalsGenerator),
  takeEvery<types.CreateProposal>('CREATE_PROPOSAL', createProposalGenerator),
  takeEvery<types.VoteForProposal>('VOTE_FOR_PROPOSAL', voteForProposalGenerator),
  takeEvery<types.ExecuteProposal>('EXECUTE_PROPOSAL', executeProposalGenerator),
  takeEvery<types.GetProposalsByType>('GET_PROPOSALS_BY_TYPE', getProposalsByTypeGenerator),
  takeEvery<types.GetNumberAllProposals>('GET_NUMBER_ALL_ENDED_PROPOSALS', getNumberAllProposalsGenerator),
  takeEvery<types.GetConstitutionHash>('GET_CONSTITUTION_HASH', getConstitutionHashGenerator),
  takeEvery<types.GetBaseVotingWeightInfo>('GET_BASE_VOTING_WEIGHT_INFO', getBaseVotingWeightInfoGenerator),
];
