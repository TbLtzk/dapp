import MembershipVotingService from '../src/voting/MembershipVoting'
import ParametersVotingService from '../src/voting/ParametersVoting'
import { CONTRACT_TYPES } from 'constants/contracts'

export const chooseExpertContractDependsOnType = (typeContract, type) => {
  let contract = null
  let contractName = null
  if (type === CONTRACT_TYPES.qFee) {
    if (typeContract === 'member') {
      contractName = 'EPQFI_MembershipVoting'
      contract = new MembershipVotingService(contractName)
    } else if (typeContract === 'parameters') {
      contractName = 'EPQFI_ParametersVoting'
      contract = new ParametersVotingService(contractName)
    }
  } else if (type === CONTRACT_TYPES.qDefi) {
    if (typeContract === 'member') {
      contractName = 'EPDR_MembershipVoting'
      contract = new MembershipVotingService(contractName)
    } else if (typeContract === 'parameters') {
      contractName = 'EPDR_ParametersVoting'
      contract = new ParametersVotingService(contractName)
    }
  }

  return contract
}
export const chooseExpertContractNameDependsOnType = (typeContract, type) => {
  let contractName = null
  if (type === CONTRACT_TYPES.qFee) {
    if (typeContract === 'member') {
      contractName = 'EPQFI_MembershipVoting'
    } else if (typeContract === 'parameters') {
      contractName = 'EPQFI_ParametersVoting'
    }
  } else if (type === CONTRACT_TYPES.qDefi) {
    if (typeContract === 'member') {
      contractName = 'EPDR_MembershipVoting'
    } else if (typeContract === 'parameters') {
      contractName = 'EPDR_ParametersVoting'
    }
  }

  return contractName
}
