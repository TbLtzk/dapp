import { ProposalStatus } from '@q-dev/q-js-sdk';
import { call, delay, put, select, takeEvery } from 'typed-redux-saga';
import { CreateProposalForm } from 'typings/forms';
import { FormProposalType } from 'typings/proposals';
import { TransactionReceipt } from 'web3-eth';

import {
  getBaseVotingWeightInfo,
  getConstitutionHashSuccess,
  getNumberAllProposals,
  getProposals,
  getProposalsByType,
  setBaseVotingWeightInfo,
  setMinimalActiveBlock,
  setProposals,
} from './actions';
import { proposalsByTypeSelector } from './selectors';
import * as types from './types';

import { getDelegationInfo, getLockedAssets } from 'store/q-vault/action-creators';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getConstitutionVotingInstance, getInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance';
import { getMinimalActiveBlockHeight } from 'contracts/helpers/block-number';
import { createProposal, getProposalEvents } from 'contracts/helpers/voting';

import { ZERO_ADDRESS } from 'constants/boundaries';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { dateToUnix } from 'utils/date';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';

function getProposalTypeFromFormType (type: CreateProposalForm['type']): FormProposalType {
  switch (type) {
    case 'constitution':
    case 'general':
    case 'emergency':
      return 'q';

    case 'add-root-node':
    case 'remove-root-node':
    case 'exit-root-node':
      return 'rootNode';

    case 'root-slashing':
    case 'validator-slashing':
      return 'slashing';

    case 'add-expert':
    case 'remove-expert':
    case 'parameter-vote':
      return 'expert';
  }
}

function* getProposalsGenerator ({ proposalType }: types.GetProposals) {
  try {
    const { minimalActiveBlockHeight, lastBlockHeight } = yield* call(getMinimalActiveBlockHeight);

    const { proposals, lastBlock } = yield* select(proposalsByTypeSelector(proposalType));
    const newProposals = yield* call(() => getProposalEvents(proposalType, proposals, lastBlock));

    yield* put(setProposals(proposalType, newProposals, Number(lastBlockHeight)));
    yield* put(setMinimalActiveBlock(minimalActiveBlockHeight));
  } catch (error) {
    captureError(error);
  }
}

function* createProposalGenerator ({ form, label }: types.CreateProposal) {
  try {
    yield* put(setTransactionLoading());

    const userAddress = yield* select(userAddressMetamask);
    const transaction = yield* call(() => createProposal(form, userAddress));

    yield* put(getBaseVotingWeightInfo());
    yield* put(getDelegationInfo(userAddress));

    const proposalType = getProposalTypeFromFormType(form.type);
    yield* put(getProposals(proposalType));

    const formTypesMap: Record<FormProposalType, string> = {
      q: formTypes.qProposal,
      rootNode: formTypes.rootNodeProposal,
      expert: formTypes.expertProposal,
      slashing: formTypes.slashingProposal,
    };

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypesMap[proposalType], transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* voteForProposalGenerator ({ payload, label }: types.VoteForProposal) {
  const { proposal, type, isVotedFor } = payload;

  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    if (userAddress === ZERO_ADDRESS) return;

    const contract = yield* call(() => getInstance(proposal.contract)());
    let transaction = {} as TransactionReceipt;
    switch (type) {
      case 'approve':
        if ('aprove' in contract) {
          transaction = yield* call(() => contract.aprove(proposal.id, { from: userAddress }));
        }
        break;
      case 'constitution':
        if ('veto' in contract) {
          transaction = yield* call(() => contract.veto(proposal.id, { from: userAddress }));
        }
        break;
      case 'basic':
        if ('voteFor' in contract && 'voteAgainst' in contract) {
          transaction = yield* call(() =>
            isVotedFor
              ? contract.voteFor(proposal.id, { from: userAddress })
              : contract.voteAgainst(proposal.id, { from: userAddress })
          );
        }
        break;
    }

    yield* put(getBaseVotingWeightInfo());
    yield* put(getDelegationInfo(userAddress));
    yield* put(getLockedAssets(userAddress));

    yield* put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.vote, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* executeProposalGenerator ({ proposal, label }: types.ExecuteProposal) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    if (userAddress === ZERO_ADDRESS) return;
    let transaction = {} as TransactionReceipt;
    const contract = yield* call(() => getInstance(proposal.contract)());
    const promiseStatus = yield* call(() => contract.getStatus(proposal.id));
    if (promiseStatus === ProposalStatus.PASSED && 'execute' in contract) {
      transaction = yield* call(() => contract.execute(proposal.id, { from: userAddress }));
    }

    yield* put(getProposalsByType(proposal.contract));
    yield* put(getBaseVotingWeightInfo());
    yield* put(getDelegationInfo(userAddress));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* getProposalsByTypeGenerator ({ contractName }: types.GetProposalsByType) {
  switch (contractName) {
    case 'constitutionVoting':
    case 'emergencyUpdateVoting':
    case 'generalUpdateVoting': {
      yield* put(getProposals('q'));
      break;
    }
    case 'rootNodesMembershipVoting': {
      yield* put(getProposals('rootNode'));
      break;
    }
    case 'rootNodesSlashingVoting':
    case 'validatorsSlashingVoting': {
      yield* put(getProposals('slashing'));
      break;
    }
    case 'epqfiMembershipVoting':
    case 'epdrMembershipVoting':
    case 'epqfiParametersVoting':
    case 'epdrParametersVoting':
    case 'eprsMembershipVoting':
    case 'eprsParametersVoting': {
      yield* put(getProposals('expert'));
      break;
    }
    case 'addressVoting':
    case 'upgradeVoting': {
      yield* put(getProposals('contractUpdate'));
      break;
    }
  }
}

function* getNumberAllProposalsGenerator () {
  yield* delay(5_000);

  yield* put(getProposals('q'));
  yield* put(getProposals('rootNode'));
  yield* put(getProposals('expert'));
  yield* put(getProposals('slashing'));
  yield* put(getProposals('contractUpdate'));

  yield* delay(235_000);
  yield* put(getNumberAllProposals());
}

function* getConstitutionHashGenerator () {
  try {
    const contract = yield* call(() => getConstitutionVotingInstance());
    const hash = yield* call(() => contract.constitutionHash());
    yield* put(getConstitutionHashSuccess(hash));
  } catch (error) {
    captureError(error);
  }
}

function* getBaseVotingWeightInfoGenerator () {
  try {
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(getVotingWeightProxyInstance);
    const result = yield* call(() => contract.getBaseVotingWeightInfo(userAddress, String(dateToUnix())));
    yield* put(setBaseVotingWeightInfo(result));
  } catch (error) {
    captureError(error);
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
