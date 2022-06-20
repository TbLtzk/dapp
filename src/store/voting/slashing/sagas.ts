import { call, put, select, takeEvery } from 'typed-redux-saga';

import { setVoteDetails } from '../proposals/actions';

import * as types from './types';

import { setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/action-creators';

import { getRootNodesInstance, getValidatorsInstance } from 'contracts/contract-instance';
import SlashingEscrow from 'contracts/helpers/voting-helpers/slashing-escrow-helper';

import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts';
import { escrowTypes } from 'constants/escrowTypes';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';

function* onEscrowCastObjectionGenerator ({
  data,
  contractName,
  proposalId
}: types.OnEscrowCastObjection) {
  try {
    yield* put(setTransactionLoading());
    yield* put(setVoteDetails({
      contract: contractName,
      proposalId,
    }));

    const { userAddress } = yield* select((state) => state.userInf);

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const contract = new SlashingEscrow(escrowContractName);
    yield contract.castObjection(proposalId, data.externalLink, userAddress);

    yield* put(setTransactionLoadingSuccess({
      type: formTypes.castObjection,
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

function* onEscrowProposeDecisionGenerator ({
  data,
  contractName,
  proposalId
}: types.OnEscrowProposeDecision) {
  try {
    yield* put(setTransactionLoading());
    yield* put(setVoteDetails({ contract: contractName, proposalId }));

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = new SlashingEscrow(escrowContractName);
    yield contract.proposeDecision(
      proposalId,
      data.percentage,
      data.isAppealNeglected,
      data.externalLink,
      userAddress
    );

    yield* put(setTransactionLoadingSuccess({
      type: formTypes.proposeDecision,
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

function* onEscrowProposerRemarkGenerator ({
  data,
  contractName,
  proposalId
}: types.OnEscrowProposerRemark) {
  try {
    yield* put(setTransactionLoading());
    yield* put(setVoteDetails({ contract: contractName, proposalId }));

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = new SlashingEscrow(escrowContractName);
    yield contract.setProposerRemark(
      proposalId,
      data.proposerRemark,
      data.isAppealConfirmed,
      userAddress
    );

    yield* put(setTransactionLoadingSuccess({
      type: formTypes.proposerRemark,
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

function* setEscrowActionGenerator ({
  contractName,
  proposalId,
  escrowType
}: types.SetEscrowAction) {
  try {
    yield* put(setTransactionLoading());
    yield* put(setVoteDetails({ contract: contractName, proposalId }));

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const { userAddress } = yield* select((state) => state.userInf);
    const contract = new SlashingEscrow(escrowContractName);

    switch (escrowType) {
      case escrowTypes.confirm: {
        yield contract.confirmDecision(proposalId, userAddress);
        break;
      }
      case escrowTypes.recall: {
        yield contract.recallProposedDecision(proposalId, userAddress);
        break;
      }
      case escrowTypes.execute: {
        yield contract.execute(proposalId, userAddress);
        break;
      }
    }

    yield* put(setTransactionLoadingSuccess({
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

function* setPurgeSlashingGenerator ({
  slashingAddress,
  contractType
}: types.SetPurgeSlashing) {
  try {
    yield* put(setTransactionLoading());
    const { userAddress } = yield* select((state) => state.userInf);
    const contract = contractType === CONTRACT_TYPES.rootNodes
      ? yield* call(getRootNodesInstance)
      : yield* call(getValidatorsInstance);

    yield contract.purgePendingSlashings(slashingAddress, { from: userAddress });

    yield* put(setTransactionLoadingSuccess({ type: formTypes.purgeSlashing }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield* put(setTransactionLoadingError(errorMsg));
  }
}

export default [
  takeEvery<types.OnEscrowCastObjection>('ESCROW_CAST_OBJECTION', onEscrowCastObjectionGenerator),
  takeEvery<types.OnEscrowProposeDecision>('ESCROW_PROPOSE_DECISION', onEscrowProposeDecisionGenerator),
  takeEvery<types.OnEscrowProposerRemark>('ESCROW_PROPOSER_REMARK', onEscrowProposerRemarkGenerator),

  takeEvery<types.SetEscrowAction>('SET_ESCROW_ACTION', setEscrowActionGenerator),
  takeEvery<types.SetPurgeSlashing>('SET_PURGE_SLASHING', setPurgeSlashingGenerator),
];
