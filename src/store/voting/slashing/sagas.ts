import { call, put, select, takeEvery } from 'typed-redux-saga';
import { TransactionReceipt } from 'web3-eth';

import * as types from './types';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';

import {
  getRootNodesInstance,
  getRootNodeSlashingEscrowInstance,
  getValidatorsInstance,
  getValidatorSlashingEscrowInstance,
} from 'contracts/contract-instance';

import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { escrowTypes } from 'constants/slashing';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';
import { getFixedPercentage } from 'utils/numbers';

function getContractInstance (contractName: string) {
  return contractName === CONTRACTS_NAMES.validatorsSlashingVoting
    ? getValidatorSlashingEscrowInstance()
    : getRootNodeSlashingEscrowInstance();
}

function* onEscrowCastObjectionGenerator ({ data, contractName, proposalId, label }: types.OnEscrowCastObjection) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(() => getContractInstance(contractName));
    const transaction = yield* call(() => contract.castObjection(proposalId, data.externalLink, { from: userAddress }));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.castObjection, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* onEscrowProposeDecisionGenerator ({ data, contractName, proposalId, label }: types.OnEscrowProposeDecision) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(() => getContractInstance(contractName));
    const transaction = yield* call(() =>
      contract.proposeDecision(
        proposalId,
        getFixedPercentage(data.percentage),
        data.isAppealNeglected,
        data.externalLink,
        { from: userAddress }
      )
    );

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.proposeDecision, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* onEscrowProposerRemarkGenerator ({ data, contractName, proposalId, label }: types.OnEscrowProposerRemark) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(() => getContractInstance(contractName));
    const transaction = yield* call(() =>
      contract.setProposerRemark(proposalId, data.proposerRemark, data.isAppealConfirmed, {
        from: userAddress,
      })
    );

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.proposerRemark, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setEscrowActionGenerator ({ contractName, proposalId, escrowType, label }: types.SetEscrowAction) {
  try {
    yield* put(setTransactionLoading());

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = yield* call(() => getContractInstance(contractName));
    let transaction = {} as TransactionReceipt;
    switch (escrowType) {
      case escrowTypes.confirm: {
        const { decision } = yield* call(() => contract.arbitrationInfos(proposalId));
        transaction = yield* call(() => contract.confirmDecision(proposalId, decision.hash, { from: userAddress }));
        break;
      }
      case escrowTypes.recall: {
        transaction = yield* call(() => contract.recallProposedDecision(proposalId, { from: userAddress }));
        break;
      }
      case escrowTypes.execute: {
        transaction = yield* call(() => contract.execute(proposalId, { from: userAddress }));
        break;
      }
    }

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setPurgeSlashingGenerator ({ slashingAddress, contractType, label }: types.SetPurgeSlashing) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract =
      contractType === CONTRACT_TYPES.rootNodes
        ? yield* call(getRootNodesInstance)
        : yield* call(getValidatorsInstance);

    const transaction = yield* call(() => contract.purgePendingSlashings(slashingAddress, { from: userAddress }));

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.purgeSlashing, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery<types.OnEscrowCastObjection>('ESCROW_CAST_OBJECTION', onEscrowCastObjectionGenerator),
  takeEvery<types.OnEscrowProposeDecision>('ESCROW_PROPOSE_DECISION', onEscrowProposeDecisionGenerator),
  takeEvery<types.OnEscrowProposerRemark>('ESCROW_PROPOSER_REMARK', onEscrowProposerRemarkGenerator),

  takeEvery<types.SetEscrowAction>('SET_ESCROW_ACTION', setEscrowActionGenerator),
  takeEvery<types.SetPurgeSlashing>('SET_PURGE_SLASHING', setPurgeSlashingGenerator),
];
