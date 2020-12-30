import MembershipVotingService from 'api/contracts/Voting/MembershipVotingService';
import ParametersVotingService from 'api/contracts/Voting/ParametersVotingService';

export const chooseExpertContractDependsOnType = (drizzle, typeContract, type) => {
  let contract = null;
  let contractName = null;
  if (type === 'q-fees-&-incentives-expert-panel') {
    if (typeContract === 'member') {
      contractName = 'EPQFI_MembershipVoting';
      contract = new MembershipVotingService(drizzle, contractName);
    } else if (typeContract === 'parameters') {
      contractName = 'EPQFI_ParametersVoting';
      contract = new ParametersVotingService(drizzle, contractName);
    }
  } else if (type === 'q-defi-(decentralized-finance)-expert-panel') {
    if (typeContract === 'member') {
      contractName = 'EPDR_MembershipVoting';
      contract = new MembershipVotingService(drizzle, contractName);
    } else if (typeContract === 'parameters') {
      contractName = 'EPDR_ParametersVoting';
      contract = new ParametersVotingService(drizzle, contractName);
    }
  }

  return contract;
};
