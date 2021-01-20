import { call, put, takeEvery, select } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/action-types/auctions/auctions';
import {
  setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler';

import {
  getAuctionsListError, getAuctionsListSuccess,
  getAuction, getAuctionSuccess, getAuctionError, getEmptyAuctionSuccess
} from 'store/actions/action-creaters/auctions/auctions';
import {
  creationLiquidationContractObj,
  creationSystemDebtContractObj,
  creationSystemSurplusContractObj
} from 'contracts/handler/AuctionHandler';
import VotingService from '../../../contracts/src/voting/VotingService';
import {
  getEmptyProposalSuccess, getProposalError,
  getProposalSuccess,
  voteForProposalSuccess
} from '../../actions/action-creaters/voting/proposals';
import AuctionService from '../../../contracts/src/auction/AuctionService';
import {
  creationExpertContractObj,
  creationQContractObj,
  creationRootContractObj,
  creationSlashingContractObj
} from '../../../contracts/handler/VotingHandler';

// function* createAuction({ drizzle, data }) {
//   try {
//     yield put(setTransactionLoading());
//     const { userAddress } = yield select(state => state.userInf);
//
//     let result = null;
//     let idProposal = null;
//     let contractName = null;
//     if (data && drizzle) {
//       switch (data?.first) {
//         case 'constitution-update':
//           const constitutionVoting = new ConstitutionVotingService('ConstitutionVoting');
//           result = yield constitutionVoting.createProposal(data, userAddress);
//           contractName = 'ConstitutionVoting';
//           idProposal = result?.events?.ProposalCreated?.returnValues?._id;
//           break;
//         case 'general-q-update':
//           const generalUpdateVoting = new GeneralUpdateVotingService('GeneralUpdateVoting');
//           result = yield generalUpdateVoting.createProposal(data, userAddress);
//           contractName = 'GeneralUpdateVoting';
//           idProposal = result?.events?.ProposalCreated?.returnValues?._id;
//           break;
//         case 'emergency-update':
//           const emergencyUpdateVoting = new EmergencyUpdateVotingService('EmergencyUpdateVoting');
//           result = yield emergencyUpdateVoting.createProposal(data, userAddress);
//           contractName = 'EmergencyUpdateVoting';
//           idProposal = result?.events?.ProposalCreated?.returnValues?._id;
//           break;
//         case 'add-a-new-root-node':
//         case 'remove-a-current-root-node':
//           const rootsVoting = new RootsVotingService('RootsVoting');
//           result = yield rootsVoting.createProposal(data, userAddress);
//           contractName = 'RootsVoting';
//           idProposal = result?.events?.ProposalCreated?.returnValues?._id;
//           break;
//         case 'root-node-slashing':
//         case 'validator-node-slashing':
//           const chosenContract = chooseSlashingContractDependsOnType(drizzle, data?.first);
//           result = yield chosenContract.createProposal(data, userAddress);
//           if (data?.first === 'root-node-slashing') {
//             contractName = 'RootNodesSlashingVoting';
//           } else if (data?.first === 'validator-node-slashing') {
//             contractName = 'ValidatorsSlashingVoting';
//           }
//           idProposal = result?.events?.ProposalCreated?.returnValues?._id;
//           break;
//         case 'add-a-new-expert':
//         case 'remove-a-current-expert':
//         case 'parameter-vote':
//           const typeContract = data.first !== 'parameter-vote' ? 'member' : 'parameters';
//           const contract = chooseExpertContractDependsOnType(drizzle, typeContract, data['type-proposal']);
//           result = yield contract.createProposal(data, userAddress);
//           contractName = chooseExpertContractNameDependsOnType(drizzle, typeContract, data['type-proposal']);
//           if (data?.first === 'remove-a-current-expert') {
//             //TODO: for createRemoveExpertProposal use RemoveProposalCreated event
//             idProposal = result?.events?.RemoveProposalCreated?.returnValues?._id;
//           } else {
//             idProposal = result?.events?.ProposalCreated?.returnValues?._id;
//           }
//           break;
//         default:
//           return null;
//       }
//     }
//     yield call(getAuctionDependsOnType, contractName, drizzle, data, idProposal, true);
//     yield put(createProposalSuccess(result));
//     yield put(setTransactionLoadingSuccess());
//
//   } catch (err) {
//     console.log('err', err.message);
//     yield put(setTransactionLoadingError(err.message));
//   }
// }

function* getAuctionDependsOnType(contractName, inf, activeAuction) {
  try {
    switch (contractName) {
      case 'LiquidationAuction':
        yield put(getAuction(contractName, inf, 'liquidation', activeAuction));
        break;
      case 'SystemDebtAuction':
        yield put(getAuction(contractName, inf, 'system-debt', activeAuction));
        break;
      case 'SystemSurplusAuction':
        yield put(getAuction(contractName, inf, 'system-surplus', activeAuction));
        break;
      default:
        return null;
    }
  } catch (e) {
    console.log('e', e);
  }
}

function* getOneAuction({ contractName, inf, activeTab, activeAuction }) {
  try {
    let contract = null;
    switch (activeTab) {
      case 'liquidation':
        contract = creationLiquidationContractObj(contractName);
        break;
      case 'system-debt':
        contract = creationSystemDebtContractObj();
        break;
      case 'system-surplus':
        contract = creationSystemSurplusContractObj(contractName);
        break;
    }
    console.log('contract', contract);
    if (contract) {
      let data = null;
      data = yield contract.getOneAuction(inf);
      console.log('GET_AUCTION', data);
      if (data) {
        yield put(getAuctionSuccess(data));
      } else {
        yield put(getEmptyAuctionSuccess(inf));
      }
    }
  } catch (err) {
    console.log('err', err);
    yield put(getAuctionError(id));
  }
}

function* getAuctionsList({ activeTab, activeAuction }) {
  try {
    let contract = null;
    switch (activeTab) {
      case 'liquidation':
        contract = creationLiquidationContractObj();
        break;
      case 'system-debt':
        contract = creationSystemDebtContractObj();
        break;
      case 'system-surplus':
        contract = creationSystemSurplusContractObj();
        break;
    }
    let result = [];
    console.log('contract', contract);
    result = yield contract?.getAuctions(activeAuction);

    console.log('Auctions', result);

    yield put(getAuctionsListSuccess(result));
  } catch (e) {
    console.log('e', e);
    yield put(getAuctionsListError(e));
  }
}

function* bidForAuctionHandler({ data }) {
  console.log('data', data);
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);

    let result = null;
    console.log('data', data);
    if (data?.user && data?.vaultId && data?.bid) {
      console.log('data', data);
      const contract = new AuctionService(data?.contract);
      console.log('Auction contract', contract);
      result = yield contract.bid(data.user, data.vaultId, data.bid, userAddress);
      console.log('result', result);
    }
    yield call(getAuctionDependsOnType, data?.contract, data, true);
    // yield put(voteForProposalSuccess(result));
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

function* executeAuctionHandler({ data }) {
  console.log('data', data);
  try {
    yield put(setTransactionLoading());
    const { userAddress } = yield select(state => state.userInf);

    let result = null;
    if (data?.user && data?.vaultId) {
      const contract = new AuctionService(data?.contract);
      result = yield contract.execute(data.user, data.vaultId, userAddress);
    }
    yield call(getAuctionDependsOnType, data?.contract, data, true);
    yield put(setTransactionLoadingSuccess());

  } catch (err) {
    console.log('err', err.message);
    yield put(setTransactionLoadingError(err.message));
  }
}

export default [
  // takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),
  takeEvery(actionTypes.GET_AUCTIONS_LIST, getAuctionsList),
  takeEvery(actionTypes.GET_AUCTION, getOneAuction),
  takeEvery(actionTypes.BID_FOR_AUCTION, bidForAuctionHandler),
  takeEvery(actionTypes.EXECUTE_AUCTION, executeAuctionHandler),
];
