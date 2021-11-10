import { call, put, takeEvery, select } from 'redux-saga/effects'

import { PROPOSALS_TYPES } from 'constants/statuses'

import * as actionTypes from 'store/actions/action-types/voting/proposals'
import {
  setErrorMessage,
  setTransactionLoading,
  setTransactionLoadingSuccess
} from 'store/actions/action-creaters/transaction-handler'

import { getLockedAssets } from 'store/actions/action-creaters/q-vault'

import {
  createProposalSuccess,
  voteForProposalSuccess,
  executeProposalSuccess,
  getNumberAllProposalsSuccess,
  getConstitutionHashSuccess,
  setBaseVotingWeightInfo
} from 'store/actions/action-creaters/voting/proposals'
import { getProposalQ, getQProposalsList } from 'store/actions/action-creaters/voting/q-proposals'
import {
  getProposalRootNode,
  getRootNodeProposalsList
} from 'store/actions/action-creaters/voting/root-node-proposals'
import { getProposalExpert, getExpertProposalsList } from 'store/actions/action-creaters/voting/expert-proposals'
import { getProposalSlashing, getSlashingProposalsList } from 'store/actions/action-creaters/voting/slashing-proposals'

import {
  creationQContractObj,
  creationRootContractObj,
  creationQContractsObjArray,
  creationSlashingContractsObjArray,
  creationExpertContractsObjArray
} from 'contracts/handler/VotingHandler'
import { chooseSlashingContractDependsOnType } from 'contracts/handler/SlashingVotingHandler'
import { chooseExpertContractDependsOnType } from 'contracts/handler/QExpertVotingHandler'

import ConstitutionVotingService from 'contracts/src/voting/ConstitutionVoting'
import EmergencyUpdateVotingService from 'contracts/src/voting/EmergencyUpdateVoting'
import GeneralUpdateVotingService from 'contracts/src/voting/GeneralUpdateVoting'
import RootsVotingService from 'contracts/src/voting/RootsVoting'
import VotingService from 'contracts/src/voting/VotingService'
import ErrorHandler from 'func/ErrorHandler'
import { CONTRACTS_NAMES, CONTRACT_TYPES } from 'constants/contracts'
import { getVotingWeightProxyInstance } from 'contracts/contract-instance'
import { getNowTimestamp } from 'func/convertDate'

function * createProposal ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    let result = null
    let idProposal = null
    let contractName = null
    if (data) {
      const type = data?.first
      switch (type) {
        case CONTRACT_TYPES.constitutionUpdate:
          const constitutionVoting = new ConstitutionVotingService()
          result = yield constitutionVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.constitutionVoting
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.generalQUpdate:
          const generalUpdateVoting = new GeneralUpdateVotingService()
          result = yield generalUpdateVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.generalUpdateVoting
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.emergencyUpdate:
          const emergencyUpdateVoting = new EmergencyUpdateVotingService()
          result = yield emergencyUpdateVoting.createProposal(data, userAddress)
          contractName = CONTRACTS_NAMES.emergencyUpdateVoting
          idProposal = result?.events?.ProposalCreated?.returnValues?._id
          break
        case CONTRACT_TYPES.addAnewRootNode:
        case CONTRACT_TYPES.removeACurrentRootNode:
          const rootsVoting = new RootsVotingService()
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
    yield call(getProposalDependsOnType, contractName, data, idProposal, true)
    yield put(createProposalSuccess(result))
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * voteForProposal ({ data }) {
  try {
    yield put(setTransactionLoading())
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
      } else if (data?.first === 'q-community-veto') {
        // TODO: when backenders do it
      }
    }
    yield call(getProposalDependsOnType, data?.contract, data, data?.idProposal, true)
    yield put(voteForProposalSuccess(result))
    yield put(setTransactionLoadingSuccess())
    yield put(getLockedAssets(userAddress))
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * executeProposal ({ data }) {
  try {
    yield put(setTransactionLoading())
    const { userAddress } = yield select((state) => state.userInf)
    const result = null
    if (data) {
      const contract = new VotingService(data?.contract)
      yield contract.execute(data?.idProposal, userAddress)
    }
    yield call(getProposalDependsOnType, data?.contract, data, data?.idProposal, false)
    yield put(executeProposalSuccess(result))
    yield put(setTransactionLoadingSuccess())
  } catch (error) {
    const errorMsg = ErrorHandler.process(error)
    yield put(setErrorMessage(errorMsg))
  }
}

function * updateProposal ({ data }) {
  yield call(getProposalDependsOnType, data?.contract, data, data?.idProposal, false)
}

function * getProposalDependsOnType (contractName, data, id, activeProposal) {
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

function * getOneProposalShared ({ data }) {
  yield call(getProposalDependsOnType, data?.contract, data, data?.id, false)
}

function * getProposalsList ({ proposalType, proposalStatusType }) {
  try {
    switch (proposalType) {
      case PROPOSALS_TYPES.proposals:
        yield put(getQProposalsList(proposalStatusType))
        break
      case PROPOSALS_TYPES.rootNodePanel:
        yield put(getRootNodeProposalsList(proposalStatusType))
        break
      case PROPOSALS_TYPES.slashingProposals:
        yield put(getSlashingProposalsList(proposalStatusType))
        break
      case PROPOSALS_TYPES.expertProposals:
        yield put(getExpertProposalsList(proposalStatusType))
        break
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getNumberAllProposals () {
  try {
    const contracts = [
      ...creationQContractsObjArray(),
      creationRootContractObj(),
      ...creationExpertContractsObjArray(),
      ...creationSlashingContractsObjArray()
    ]
    const result = {
      ended: 0,
      active: 0
    }

    const proposals = yield Promise.all(contracts.map((contract) => contract.getProposalsCount()))

    proposals.forEach((proposal) => {
      if (proposal.ended) {
        result.ended += proposal.ended
      }
      if (proposal.active) {
        result.active += proposal.active
      }
    })
    yield put(getNumberAllProposalsSuccess(result))
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

function * getConstitutionHash () {
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
  takeEvery(actionTypes.CREATE_PROPOSAL, createProposal),
  takeEvery(actionTypes.VOTE_FOR_PROPOSAL, voteForProposal),
  takeEvery(actionTypes.EXECUTE_PROPOSAL, executeProposal),
  takeEvery(actionTypes.UPDATE_PROPOSAL, updateProposal),

  takeEvery(actionTypes.GET_ONE_PROPOSAL, getOneProposalShared),
  takeEvery(actionTypes.GET_PROPOSALS_LIST, getProposalsList),

  takeEvery(actionTypes.GET_NUMBER_ALL_PROPOSALS, getNumberAllProposals),
  takeEvery(actionTypes.GET_CONSTITUTION_HASH, getConstitutionHash),
  takeEvery(actionTypes.GET_BASE_VOTING_WEIGHT_INFO, getBaseVotingWeightInfoGenerator)
]
