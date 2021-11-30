import { call, put, takeEvery, select } from 'redux-saga/effects'

import { PROPOSALS_TYPES } from 'constants/statuses'

import * as actionTypes from 'store/voting/proposals/action-types'
import { setErrorMessage, setTransactionCounter } from 'store/transaction-handler/action-creators'

import { getLockedAssets } from 'store/q-vault/action-creators'

import {
  createProposalSuccess,
  voteForProposalSuccess,
  executeProposalSuccess,
  getConstitutionHashSuccess,
  setBaseVotingWeightInfo,
  setProposal
} from 'store/voting/proposals/action-creators'
import { getProposalQ, getQProposals, getQProposalsCount } from 'store/voting/q-proposals/action-creators'
import {
  getProposalRootNode,
  getRootProposals,
  getRootProposalsCount
} from 'store/voting/root-node-proposals/action-creators'
import {
  getProposalExpert,
  getExpertProposalsCount,
  getExpertProposals
} from 'store/voting/expert-proposals/action-creators'
import {
  getProposalSlashing,
  getSlashingProposals,
  getSlashingProposalsCount
} from 'store/voting/slashing-proposals/action-creators'

import {
  creationExpertContractObj,
  creationQContractObj,
  creationRootContractObj,
  creationSlashingContractObj
} from 'contracts/helpers/voting-helpers/base-voting-helper'
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
    let result = null
    let idProposal = null
    let contractName = null
    if (data) {
      const type = data?.first
      switch (type) {
        case CONTRACT_TYPES.constitutionUpdate:
          const constitutionVoting = new ConstitutionVotingService(CONTRACTS_NAMES.constitutionVoting)
          result = yield constitutionVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.constitutionVoting
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.generalQUpdate:
          const generalUpdateVoting = new GeneralUpdateVotingService(CONTRACTS_NAMES.generalUpdateVoting)
          result = yield generalUpdateVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.generalUpdateVoting
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.emergencyUpdate:
          const emergencyUpdateVoting = new EmergencyUpdateVotingService(CONTRACTS_NAMES.emergencyUpdateVoting)
          result = yield emergencyUpdateVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.emergencyUpdateVoting
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.addAnewRootNode:
        case CONTRACT_TYPES.removeACurrentRootNode:
          const rootsVoting = new RootsVotingService(CONTRACTS_NAMES.rootsVoting)
          result = yield rootsVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.rootsVoting
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.rootNodeSlashing:
        case CONTRACT_TYPES.validatorNodeSlashing:
          const chosenContract = chooseSlashingContractDependsOnType(type)
          result = yield chosenContract.createProposal(data, userAddress)
          if (type === CONTRACT_TYPES.rootNodeSlashing) {
            contractName = CONTRACTS_NAMES.rootNodesSlashingVoting
          } else if (type === CONTRACT_TYPES.validatorNodeSlashing) {
            contractName = CONTRACTS_NAMES.validatorsSlashingVoting
          }
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.addNewExpert:
        case CONTRACT_TYPES.removeCurrentExpert:
        case CONTRACT_TYPES.parameterVote:
          const typeContract =
            data.first !== CONTRACT_TYPES.parameterVote ? CONTRACT_TYPES.member : CONTRACT_TYPES.parameters
          const contract = chooseExpertContractDependsOnType(typeContract, data['type-proposal'])
          contractName = contract.contractName
          result = yield contract.createProposal(data, userAddress)
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        default:
          return null
      }
    }
    yield call(getProposalDependsOnTypeGenerator, contractName, data, idProposal, true)
    yield put(createProposalSuccess(result))
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

    let result = null
    if (data) {
      const contract = new VotingService(data?.contract)
      if (data?.first === 'basic-vote-on-proposal') {
        if (data['vote-proposal'] === 'yes') {
          result = yield contract.voteFor(data?.idProposal, userAddress)
        } else if (data['vote-proposal'] === 'no') {
          result = yield contract.voteAgainst(data?.idProposal, userAddress)
        }
      } else if (data?.first === 'constitution-check') {
        result = yield contract.veto(data?.idProposal, userAddress)
      }
    }
    yield call(getProposalDependsOnTypeGenerator, data?.contract, data, data?.idProposal, true)
    yield put(voteForProposalSuccess(result))
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
    const result = null
    if (data) {
      const contract = new VotingService(data?.contract)
      yield contract.execute(data?.idProposal, userAddress)
    }
    yield call(getProposalDependsOnTypeGenerator, data?.contract, data, data?.idProposal, false)
    yield put(executeProposalSuccess(result))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  } finally {
    yield put(setTransactionCounter(-1))
  }
}

function * updateProposal ({ data }) {
  yield call(getProposalDependsOnTypeGenerator, data?.contract, data, data?.idProposal, false)
}

function * getProposalDependsOnTypeGenerator (contractName, data, id, activeProposal) {
  try {
    switch (contractName) {
      case CONTRACTS_NAMES.constitutionVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
      case CONTRACTS_NAMES.generalUpdateVoting:
        yield put(getProposalQ(contractName, id, activeProposal))
        break
      case CONTRACTS_NAMES.rootsVoting:
        yield put(getProposalRootNode(contractName, id, activeProposal))
        break
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting:
        yield put(getProposalSlashing(contractName, id, activeProposal))
        break
      case CONTRACTS_NAMES.ePQFIMembershipVoting:
      case CONTRACTS_NAMES.ePDRMembershipVoting:
      case CONTRACTS_NAMES.ePQFIParametersVoting:
      case CONTRACTS_NAMES.ePDRParametersVoting:
        yield put(getProposalExpert(contractName, id, activeProposal))
        break
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getOneProposalSharedGenerator ({ data }) {
  yield call(getProposalDependsOnTypeGenerator, data?.contract, data, data?.id, false)
}

function * getProposalsListGenerator ({ proposalType, proposalStatusType, range }) {
  try {
    switch (proposalType) {
      case PROPOSALS_TYPES.proposals: {
        yield put(getQProposals(proposalStatusType, range))
        yield put(getQProposalsCount())
        break
      }
      case PROPOSALS_TYPES.rootNodePanel: {
        yield put(getRootProposals(proposalStatusType, range))
        yield put(getRootProposalsCount())
        break
      }
      case PROPOSALS_TYPES.slashingProposals: {
        yield put(getSlashingProposals(proposalStatusType, range))
        yield put(getSlashingProposalsCount())
        break
      }
      case PROPOSALS_TYPES.expertProposals: {
        yield put(getExpertProposals(proposalStatusType, range))
        yield put(getExpertProposalsCount())
        break
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getNumberAllProposalsGenerator () {
  yield put(getQProposalsCount())
  yield put(getExpertProposalsCount())
  yield put(getRootProposalsCount())
  yield put(getSlashingProposalsCount())
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

function * getProposalGenerator ({ contractName, id }) {
  try {
    console.log(contractName)
    switch (contractName) {
      case CONTRACTS_NAMES.constitutionVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
      case CONTRACTS_NAMES.generalUpdateVoting: {
        const contract = creationQContractObj(contractName)
        const proposal = yield contract.getProposal(id)
        yield put(setProposal(proposal))
        break
      }
      case CONTRACTS_NAMES.rootsVoting: {
        const contract = creationRootContractObj()
        const proposal = yield contract.getProposal(id)
        yield put(setProposal(proposal))
        break
      }
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting: {
        const contract = creationSlashingContractObj(contractName)
        console.log(contract)
        const proposal = yield contract.getProposal(id)
        yield put(setProposal(proposal))
        break
      }
      case CONTRACTS_NAMES.ePQFIMembershipVoting:
      case CONTRACTS_NAMES.ePDRMembershipVoting:
      case CONTRACTS_NAMES.ePQFIParametersVoting:
      case CONTRACTS_NAMES.ePDRParametersVoting: {
        const contract = creationExpertContractObj(contractName)
        const proposal = yield contract.getProposal(id)
        yield put(setProposal(proposal))
        break
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export default [
  takeEvery(actionTypes.CREATE_PROPOSAL, createProposalGenerator),
  takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposalGenerator),
  takeEvery(actionTypes.EXECUTE_PROPOSAL, executeProposalGenerator),
  takeEvery(actionTypes.UPDATE_PROPOSAL, updateProposal),

  takeEvery(actionTypes.GET_ONE_PROPOSAL, getOneProposalSharedGenerator),

  takeEvery(actionTypes.GET_PROPOSAL, getProposalGenerator),

  takeEvery(actionTypes.GET_PROPOSALS_LIST, getProposalsListGenerator),

  takeEvery(actionTypes.GET_NUMBER_ALL_PROPOSALS, getNumberAllProposalsGenerator),
  takeEvery(actionTypes.GET_CONSTITUTION_HASH, getConstitutionHashGenerator),
  takeEvery(actionTypes.GET_BASE_VOTING_WEIGHT_INFO, getBaseVotingWeightInfoGenerator)
]
