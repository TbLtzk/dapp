import SlashingVotingService from '../src/voting/SlashingVoting'
import { CONTRACTS_NAMES, CONTRACT_TYPES } from 'constants/contracts'

export const chooseSlashingContractDependsOnType = (type) => {
  let contractName = null
  if (type === CONTRACT_TYPES.rootNodeSlashing) {
    contractName = CONTRACTS_NAMES.rootNodesSlashingVoting
  } else if (type === CONTRACT_TYPES.validatorNodeSlashing) {
    contractName = CONTRACTS_NAMES.validatorsSlashingVoting
  }

  return new SlashingVotingService(contractName)
}
