import SlashingVotingService from '../src/voting/SlashingVoting'

export const chooseSlashingContractDependsOnType = (type) => {
  let contractName = null
  if (type === 'root-node-slashing') {
    contractName = 'RootNodesSlashingVoting'
  } else if (type === 'validator-node-slashing') {
    contractName = 'ValidatorsSlashingVoting'
  }
  const contract = new SlashingVotingService(contractName)

  return contract
}
