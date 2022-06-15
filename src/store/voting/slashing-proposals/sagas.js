import { all, put, select, takeEvery } from 'redux-saga/effects';

import { setVoteDetails } from '../proposals/action-creators';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/action-creators';
import { setSlashingProposals } from 'store/voting/slashing-proposals/action-creators';
import * as actionTypes from 'store/voting/slashing-proposals/action-types';

import { getRootNodesInstance, getValidatorsInstance } from 'contracts/contract-instance';
import { creationSlashingContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper';
import SlashingEscrow from 'contracts/helpers/voting-helpers/slashing-escrow-helper';

import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts';
import { escrowTypes } from 'constants/escrowTypes';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';
import { getMinimalActiveBlockHeight, sortAndCountProposalsByType } from 'func/useful';

let lastActiveBlock;

function * getSlashingProposalsGenerator () {
  try {
    const contracts = creationSlashingContractsObjArray();
    const { minimalActiveBlockHeight, lastBlockHeight } = yield getMinimalActiveBlockHeight();

    let proposalsCounter;
    let activeProposalsArray;
    let endedProposalsArray;

    if (lastActiveBlock) {
      const { activeProposals, endedProposals, slashingEndedProposalsCount } = yield select(
        (state) => state.slashingProposals
      );
      const proposals = yield all(
        contracts.map((contract) => contract.getNewProposalsAndCheckActive(activeProposals, lastActiveBlock))
      );
      const [newProposalsCount, newActiveProposals, newEndedProposalsIds] = sortAndCountProposalsByType(proposals);

      proposalsCounter = {
        active: newProposalsCount.active,
        ended: slashingEndedProposalsCount + newProposalsCount.ended,
      };
      activeProposalsArray = newActiveProposals;
      endedProposalsArray = [...endedProposals, ...newEndedProposalsIds];
      lastActiveBlock = lastBlockHeight;
    } else {
      const proposals = yield all(contracts.map((contract) => contract.getProposalsCount(minimalActiveBlockHeight)));
      const [proposalsCount, activeProposalsIds, endedProposalsIds] = sortAndCountProposalsByType(proposals);
      proposalsCounter = proposalsCount;
      activeProposalsArray = activeProposalsIds;
      endedProposalsArray = endedProposalsIds;
      lastActiveBlock = lastBlockHeight;
    }
    yield put(setSlashingProposals(activeProposalsArray, endedProposalsArray, proposalsCounter));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * onEscrowCastObjectionGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading(1));
    yield put(setVoteDetails({
      contract: contractName,
      proposalId,
    }));

    const { userAddress } = yield select((state) => state.userInf);

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const contract = new SlashingEscrow(escrowContractName);
    yield contract.castObjection(proposalId, data.externalLink, userAddress);

    yield put(setTransactionLoadingSuccess({
      type: formTypes.castObjection,
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * onEscrowProposeDecisionGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading());
    yield put(setVoteDetails({ contract: contractName, proposalId }));

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const { userAddress } = yield select((state) => state.userInf);
    const contract = new SlashingEscrow(escrowContractName);
    yield contract.proposeDecision(
      proposalId,
      data.percentage,
      data.isAppealNeglected,
      data.externalLink,
      userAddress
    );

    yield put(setTransactionLoadingSuccess({
      type: formTypes.proposeDecision,
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * onEscrowProposerRemarkGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading(1));
    yield put(setVoteDetails({ contract: contractName, proposalId }));

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const { userAddress } = yield select((state) => state.userInf);
    const contract = new SlashingEscrow(escrowContractName);
    yield contract.setProposerRemark(
      proposalId,
      data.proposerRemark,
      data.isAppealConfirmed,
      userAddress
    );

    yield put(setTransactionLoadingSuccess({
      type: formTypes.proposerRemark,
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setEscrowActionGenerator ({ contractName, proposalId, escrowType }) {
  try {
    yield put(setTransactionLoading());
    yield put(setVoteDetails({ contract: contractName, proposalId }));

    const escrowContractName = contractName === CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;

    const { userAddress } = yield select((state) => state.userInf);
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

    yield put(setTransactionLoadingSuccess({
      transactionType: TRANSACTION_TYPES.success,
    }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setPurgeSlashingGenerator ({ slashingAddress, contractType }) {
  try {
    yield put(setTransactionLoading(1));
    const { userAddress } = yield select((state) => state.userInf);
    const contract =
      contractType === CONTRACT_TYPES.rootNodes ? yield getRootNodesInstance() : yield getValidatorsInstance();
    yield contract.purgePendingSlashings(slashingAddress, { from: userAddress });

    yield put(setTransactionLoadingSuccess({ type: formTypes.purgeSlashing }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

export default [
  takeEvery(actionTypes.ESCROW_CAST_OBJECTION, onEscrowCastObjectionGenerator),
  takeEvery(actionTypes.ESCROW_PROPOSE_DECISION, onEscrowProposeDecisionGenerator),
  takeEvery(actionTypes.ESCROW_PROPOSER_REMARK, onEscrowProposerRemarkGenerator),
  takeEvery(actionTypes.GET_SLASHING_PROPOSALS, getSlashingProposalsGenerator),

  takeEvery(actionTypes.SET_ESCROW_ACTION, setEscrowActionGenerator),
  takeEvery(actionTypes.SET_PURGE_SLASHING, setPurgeSlashingGenerator),
];
