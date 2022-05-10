import { all, put, select, takeEvery } from 'redux-saga/effects';

import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess
} from 'store/transaction-handler/action-creators';
import { setSlashingProposals } from 'store/voting/slashing-proposals/action-creators';
import * as actionTypes from 'store/voting/slashing-proposals/action-types';

import { getRootNodesInstance, getValidatorsInstance } from 'contracts/contract-instance';
import { creationSlashingContractsObjArray } from 'contracts/helpers/voting-helpers/base-voting-helper';
import SlashingEscrow from 'contracts/helpers/voting-helpers/slashing-escrow-helper';

import { CONTRACT_TYPES } from 'constants/contracts';
import { escrowTypes } from 'constants/escrowTypes';
import formTypes from 'constants/form-types';
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
        ended: slashingEndedProposalsCount + newProposalsCount.ended
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
    const { userAddress } = yield select((state) => state.userInf);

    const contract = new SlashingEscrow(contractName);
    yield contract.castObjection(proposalId, data['external-link'], userAddress);

    yield put(setTransactionLoadingSuccess());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * onEscrowProposeDecisionGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contract = new SlashingEscrow(contractName);
    const notAppealed = data['target-slashing-appeal'] === 'yes';

    yield contract.proposeDecision(proposalId, data['%-value'], notAppealed, data['external-link'], userAddress);
    yield put(setTransactionLoadingSuccess());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * onEscrowProposerRemarkGenerator ({ data, contractName, proposalId }) {
  try {
    yield put(setTransactionLoading(1));
    const { userAddress } = yield select((state) => state.userInf);
    const contract = new SlashingEscrow(contractName);
    const appealConfirmed = data.appealConfirmed === 'yes';
    yield contract.setProposerRemark(proposalId, data['proposer-remark'], appealConfirmed, userAddress);

    yield put(setTransactionLoadingSuccess());
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setEscrowActionGenerator ({ contractName, proposalId, escrowType }) {
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select((state) => state.userInf);
    const contract = new SlashingEscrow(contractName);

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
    yield put(setTransactionLoadingSuccess());
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
  takeEvery(actionTypes.SET_PURGE_SLASHING, setPurgeSlashingGenerator)
];
