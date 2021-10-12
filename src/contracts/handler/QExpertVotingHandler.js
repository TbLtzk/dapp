import MembershipVotingService from '../src/voting/MembershipVoting'
import ParametersVotingService from '../src/voting/ParametersVoting'
import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts'

export const chooseExpertContractDependsOnType = (typeContract, type) => {
  let contract = null
  let contractName = null
  switch (type) {
    case CONTRACT_TYPES.qFee:
      if (typeContract === CONTRACT_TYPES.member) {
        contractName = CONTRACTS_NAMES.ePQFIMembershipVoting
        contract = new MembershipVotingService(contractName)
      } else if (typeContract === CONTRACT_TYPES.parameters) {
        contractName = CONTRACTS_NAMES.ePQFIParametersVoting
        contract = new ParametersVotingService(contractName)
      }
      break
    case CONTRACT_TYPES.qDefi:
      if (typeContract === CONTRACT_TYPES.member) {
        contractName = CONTRACTS_NAMES.ePDRMembershipVoting
        contract = new MembershipVotingService(contractName)
      } else if (typeContract === CONTRACT_TYPES.parameters) {
        contractName = CONTRACTS_NAMES.ePDRParametersVoting
        contract = new ParametersVotingService(contractName)
      }
      break
  }
  return contract
}
