import MembershipVotingService from '../src/voting/MembershipVoting';
import ParametersVotingService from '../src/voting/ParametersVoting';

export const chooseExpertContractDependsOnType = (drizzle, typeContract, type) => {
  let contract = null;
  let contractName = null;
  if (type === 'q-fees-&-incentives-expert-panel') {
    if (typeContract === 'member') {
      contractName = 'EPQFI_MembershipVoting';
      contract = new MembershipVotingService(contractName);
    } else if (typeContract === 'parameters') {
      contractName = 'EPQFI_ParametersVoting';
      contract = new ParametersVotingService(contractName);
    }
  } else if (type === 'q-defi-(decentralized-finance)-expert-panel') {
    if (typeContract === 'member') {
      contractName = 'EPDR_MembershipVoting';
      contract = new MembershipVotingService(contractName);
    } else if (typeContract === 'parameters') {
      contractName = 'EPDR_ParametersVoting';
      contract = new ParametersVotingService(contractName);
    }
  }

  return contract;
};
export const chooseExpertContractNameDependsOnType = (drizzle, typeContract, type) => {
  let contractName = null;
  if (type === 'q-fees-&-incentives-expert-panel') {
    if (typeContract === 'member') {
      contractName = 'EPQFI_MembershipVoting';
    } else if (typeContract === 'parameters') {
      contractName = 'EPQFI_ParametersVoting';
    }
  } else if (type === 'q-defi-(decentralized-finance)-expert-panel') {
    if (typeContract === 'member') {
      contractName = 'EPDR_MembershipVoting';
    } else if (typeContract === 'parameters') {
      contractName = 'EPDR_ParametersVoting';
    }
  }

  return contractName;
};
