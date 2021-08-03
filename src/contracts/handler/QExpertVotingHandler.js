import MembershipVotingService from '../src/voting/MembershipVoting'
import ParametersVotingService from '../src/voting/ParametersVoting'
import { CONTRACT_TYPES } from 'constants/contracts'

export const chooseExpertContractDependsOnType = (typeContract, type) => {
  let contract = null
  let contractName = null
  if (type === CONTRACT_TYPES.qFee) {
    if (typeContract === 'member') {
      contractName = 'EPQFIMembershipVoting'
      contract = new MembershipVotingService(contractName)
    } else if (typeContract === 'parameters') {
      contractName = 'EPQFIParametersVoting'
      contract = new ParametersVotingService(contractName)
    }
  } else if (type === CONTRACT_TYPES.qDefi) {
    if (typeContract === 'member') {
      contractName = 'EPDRMembershipVoting'
      contract = new MembershipVotingService(contractName)
    } else if (typeContract === 'parameters') {
      contractName = 'EPDRParametersVoting'
      contract = new ParametersVotingService(contractName)
    }
  }

  return contract
}
export const chooseExpertContractNameDependsOnType = (typeContract, type) => {
  let contractName = null
  if (type === CONTRACT_TYPES.qFee) {
    if (typeContract === 'member') {
      contractName = 'EPQFIMembershipVoting'
    } else if (typeContract === 'parameters') {
      contractName = 'EPQFIParametersVoting'
    }
  } else if (type === CONTRACT_TYPES.qDefi) {
    if (typeContract === 'member') {
      contractName = 'EPDRMembershipVoting'
    } else if (typeContract === 'parameters') {
      contractName = 'EPDRParametersVoting'
    }
  }

  return contractName
}
