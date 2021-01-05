import SlashingVotingService from 'api/contracts/Voting/SlashingVotingService';

export const chooseSlashingContractDependsOnType = (drizzle, type) => {
  let contractName = null;
  if (type === 'root-node-slashing') {
    contractName = 'RootNodesSlashingVoting';
  } else if (type === 'validator-node-slashing') {
    contractName = 'ValidatorsSlashingVoting';
  }
  const contract = new SlashingVotingService(drizzle, contractName);

  return contract;
};
