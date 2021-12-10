import { delay, call, put, takeEvery, select } from 'redux-saga/effects'

import * as actionTypes from 'store/voting/proposals/action-types'
import { setErrorMessage, setTransactionCounter } from 'store/transaction-handler/action-creators'

import { getDelegationInfo, getLockedAssets } from 'store/q-vault/action-creators'

import {
  getConstitutionHashSuccess,
  setBaseVotingWeightInfo,
  getProposal,
  setExecutedProposal,
  getBaseVotingWeightInfo
} from 'store/voting/proposals/action-creators'
import { getQProposalsCount } from 'store/voting/q-proposals/action-creators'
import { getRootProposalsCount } from 'store/voting/root-node-proposals/action-creators'
import { getExpertProposalsCount } from 'store/voting/expert-proposals/action-creators'
import { getSlashingProposalsCount } from 'store/voting/slashing-proposals/action-creators'

import { creationQContractObj } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { chooseSlashingContractDependsOnType } from 'contracts/handler/SlashingVotingHandler'
import { chooseExpertContractDependsOnType } from 'contracts/handler/QExpertVotingHandler'

import ConstitutionVotingService from 'contracts/helpers/voting-helpers/constitution-voting-helper'
import EmergencyUpdateVotingService from 'contracts/helpers/voting-helpers/emergency-update-voting-helper'
import GeneralUpdateVotingService from 'contracts/helpers/voting-helpers/general-update-voting-helper'
import RootsVotingService from 'contracts/helpers/voting-helpers/roots-voting-helper'
import VotingService from 'contracts/helpers/voting-helpers/voting-service-helper'
import ErrorHandler from 'func/ErrorHandler'
import { CONTRACTS_NAMES, CONTRACT_TYPES } from 'constants/contracts'
import { getVotingWeightProxyInstance } from 'contracts/contract-instance'
import { getNowTimestamp } from 'func/convertDate'

function * createProposalGenerator ({ data }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    let contractName = null
    if (data) {
      const type = data?.first
      switch (type) {
        case CONTRACT_TYPES.constitutionUpdate:
          const constitutionVoting = new ConstitutionVotingService(CONTRACTS_NAMES.constitutionVoting)
          yield constitutionVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.constitutionVoting
          break
        case CONTRACT_TYPES.generalQUpdate:
          const generalUpdateVoting = new GeneralUpdateVotingService(CONTRACTS_NAMES.generalUpdateVoting)
          yield generalUpdateVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.generalUpdateVoting
          break
        case CONTRACT_TYPES.emergencyUpdate:
          const emergencyUpdateVoting = new EmergencyUpdateVotingService(CONTRACTS_NAMES.emergencyUpdateVoting)
          yield emergencyUpdateVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.emergencyUpdateVoting
          break
        case CONTRACT_TYPES.addAnewRootNode:
        case CONTRACT_TYPES.removeACurrentRootNode:
          const rootsVoting = new RootsVotingService(CONTRACTS_NAMES.rootsVoting)
          yield rootsVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.rootsVoting
          break
        case CONTRACT_TYPES.rootNodeSlashing:
        case CONTRACT_TYPES.validatorNodeSlashing:
          const chosenContract = chooseSlashingContractDependsOnType(type)
          yield chosenContract.createProposal(data, userAddress)
          if (type === CONTRACT_TYPES.rootNodeSlashing) {
            contractName = CONTRACTS_NAMES.rootNodesSlashingVoting
          } else if (type === CONTRACT_TYPES.validatorNodeSlashing) {
            contractName = CONTRACTS_NAMES.validatorsSlashingVoting
          }
          break
        case CONTRACT_TYPES.addNewExpert:
        case CONTRACT_TYPES.removeCurrentExpert:
        case CONTRACT_TYPES.parameterVote:
          const typeContract =
            data.first !== CONTRACT_TYPES.parameterVote ? CONTRACT_TYPES.member : CONTRACT_TYPES.parameters
          const contract = chooseExpertContractDependsOnType(typeContract, data['type-proposal'])
          contractName = contract.contractName
          yield contract.createProposal(data, userAddress)
          break
        default:
          return null
      }
    }
    yield put(getBaseVotingWeightInfo())
    yield put(getDelegationInfo(userAddress))
    yield put(getProposal(contractName))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * voteForProposalGenerator ({ data }) {
  try {
    yield put(setTransactionCounter(1))
    const { userAddress } = yield select((state) => state.userInf)
    if (data) {
      const contract = new VotingService(data?.contract)
      if (data?.first === 'basic-vote-on-proposal') {
        if (data['vote-proposal'] === 'yes') {
          yield contract.voteFor(data?.idProposal, userAddress)
        } else if (data['vote-proposal'] === 'no') {
          yield contract.voteAgainst(data?.idProposal, userAddress)
        }
      } else if (data?.first === 'constitution-check') {
        yield contract.veto(data?.idProposal, userAddress)
      }
    }
    yield put(getBaseVotingWeightInfo())
    yield put(getDelegationInfo(userAddress))
    yield put(getLockedAssets(userAddress))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * executeProposalGenerator ({ data }) {
  try {
    yield put(setTransactionCounter(1))

    const { userAddress } = yield select((state) => state.userInf)
    if (data) {
      const contract = new VotingService(data?.contract)
      yield contract.execute(data?.idProposal, userAddress)
    }
    yield put(getProposal(data.contract))
    yield put(getBaseVotingWeightInfo())
    yield put(getDelegationInfo(userAddress))
    yield put(setExecutedProposal(data))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * getProposalGenerator ({ contractName, id }) {
  switch (contractName) {
    case CONTRACTS_NAMES.constitutionVoting:
    case CONTRACTS_NAMES.emergencyUpdateVoting:
    case CONTRACTS_NAMES.generalUpdateVoting: {
      yield put(getQProposalsCount())
      break
    }
    case CONTRACTS_NAMES.rootsVoting: {
      yield put(getRootProposalsCount())
      break
    }
    case CONTRACTS_NAMES.rootNodesSlashingVoting:
    case CONTRACTS_NAMES.validatorsSlashingVoting: {
      yield put(getSlashingProposalsCount())
      break
    }
    case CONTRACTS_NAMES.ePQFIMembershipVoting:
    case CONTRACTS_NAMES.ePDRMembershipVoting:
    case CONTRACTS_NAMES.ePQFIParametersVoting:
    case CONTRACTS_NAMES.ePDRParametersVoting: {
      yield put(getExpertProposalsCount())
      break
    }
  }
}

function * getNumberAllProposalsGenerator () {
  yield put(getQProposalsCount())
  yield put(getExpertProposalsCount())
  yield put(getRootProposalsCount())
  yield put(getSlashingProposalsCount())
  yield delay(120000)
  yield call(getNumberAllProposalsGenerator)
}

function * getConstitutionHashGenerator () {
  try {
    const contract = creationQContractObj(CONTRACTS_NAMES.constitutionVoting)
    const data = yield contract.getConstitutionHash()
    yield put(getConstitutionHashSuccess(data))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getBaseVotingWeightInfoGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf)
    const contract = yield call(getVotingWeightProxyInstance)
    const timeStamp = getNowTimestamp()
    const result = yield contract.getBaseVotingWeightInfo(userAddress, timeStamp)
    yield put(setBaseVotingWeightInfo(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [
  takeEvery(actionTypes.CREATE_PROPOSAL, createProposalGenerator),
  takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposalGenerator),
  takeEvery(actionTypes.EXECUTE_PROPOSAL, executeProposalGenerator),
  takeEvery(actionTypes.GET_PROPOSAL, getProposalGenerator),
  takeEvery(actionTypes.GET_NUMBER_ALL_PROPOSALS, getNumberAllProposalsGenerator),
  takeEvery(actionTypes.GET_CONSTITUTION_HASH, getConstitutionHashGenerator),
  takeEvery(actionTypes.GET_BASE_VOTING_WEIGHT_INFO, getBaseVotingWeightInfoGenerator)
]
