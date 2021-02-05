import { BigNumber } from 'bignumber.js';
import SlashingVotingService from '../src/voting/SlashingVoting';
import RootsVotingService from '../src/voting/RootsVoting';
import ConstitutionVotingService from '../src/voting/ConstitutionVoting';
import EmergencyUpdateVotingService from '../src/voting/EmergencyUpdateVoting';
import GeneralUpdateVotingService from '../src/voting/GeneralUpdateVoting';
import MembershipVotingService from '../src/voting/MembershipVoting';
import ParametersVotingService from '../src/voting/ParametersVoting';
import { chooseExpertContractDependsOnType } from './QExpertVotingHandler';

export const getPastEvents = async (drizzle, contract, event) => {
  const web3 = drizzle.web3;
  // const contract = drizzle.contracts[contractName];
  const contractWeb3 = contract;
  // const contractWeb3 = new web3.eth.Contract(contract.abi, contract.address);
  const eventOptions = {
    // topics: [],
    fromBlock: 0,
    toBlock: 'latest'
  };
  const result = await contractWeb3.getPastEvents(event, eventOptions);
  return result;
};

export const getPastProposalsIds = (proposalArr) => {
  return proposalArr?.map(evt => evt.returnValues._id);
};

export const getStatusTransformation = (statusId) => {
  const status = ['None', 'Pending', 'Rejected', 'Accepted', 'Passed', 'Executed', 'Obsolete', 'Expired'];
  return status[Number(statusId)];
};
export const getTypeParameter = (id) => {
  const status = ['None', 'Pending', 'Rejected', 'Accepted', 'Passed', 'Boolean', 'Obsolete'];
  return status[Number(id)];
};
export const getParameterTypeTransformation = (statusId) => {
  switch (Number(statusId)) {
    case 0:
      return 'None';
    case 1:
      return 'Address';
    case 2:
      return 'Uint';
    case 3:
      return 'String';
    case 4:
      return 'Byte32';
    case 5:
      return 'Bool';
    default:
      return 'None';
  }
};

export const convertNumVotes = (number) => {
  if (number.length === 1) {
    return Number(number);
  } else if (number.length === 27) {
    // const result = toFixed(number);
    const res = number.slice(0, 2);
    return res * 0.01;

  } else if (number.length === 26) {
    const res = number.slice(0, 1);
    return res * 0.01;

  } else {
    const res = number.slice(0, 2);
    return res * 0.001;
  }
};

export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString()
      .split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + (new Array(e)).join('0') + x.toString()
        .substring(2);
    }
  } else {
    var e = parseInt(x.toString()
      .split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += (new Array(e + 1)).join('0');
    }
  }
  console.log('toFixed', x);
  return x;
}

export const getPercentageFormat = (number) => {
  return bn(1e+27)
    .multipliedBy(bn(number))
    .dividedBy(100);
};

export const transformToPercentage = (number) => {
  const amount = '10000000000000000000000000';
  let convertedNumber = bn(number)
    .dividedBy(amount);
  if (convertedNumber?.e < 0) {
    convertedNumber = ((convertedNumber)).toFixed(10);
  } else {
    convertedNumber = Math.round(convertedNumber?.c[0]);
  }
  return convertedNumber;
};

export const bn = (number) => {
  return new BigNumber(number);
};

export const calculatePercentage = (part, amount) => {
  return bn(((10 ** 27) * part) / amount);

};


export function creationSlashingContractObj(drizzle, contractName) {
  return new SlashingVotingService(contractName);
  // return new SlashingVotingService(drizzle, contractName);
}

export function creationSlashingContractsObjArray(drizzle) {
  const validatorsSlashingVoting = new SlashingVotingService('ValidatorsSlashingVoting');
  const rootNodesSlashingVoting = new SlashingVotingService('RootNodesSlashingVoting');
  return [validatorsSlashingVoting, rootNodesSlashingVoting];
}

export function creationRootContractObj(drizzle) {
  return new RootsVotingService('RootsVoting');
}

export function creationQContractObj(drizzle, contractName) {
  switch (contractName) {
    case 'ConstitutionVoting':
      return new ConstitutionVotingService(contractName);
    case 'EmergencyUpdateVoting':
      return new EmergencyUpdateVotingService(contractName);
    case 'GeneralUpdateVoting':
      return new GeneralUpdateVotingService(contractName);
  }
}

export function creationQContractsObjArray(drizzle) {
  const constitutionVoting = new ConstitutionVotingService('ConstitutionVoting');
  const emergencyUpdateVoting = new EmergencyUpdateVotingService('EmergencyUpdateVoting');
  const generalUpdateVoting = new GeneralUpdateVotingService('GeneralUpdateVoting');
  return [constitutionVoting, emergencyUpdateVoting, generalUpdateVoting];
}

export const arrContractsExpert = [
  {
    // EPQFI_MembershipVoting
    typeContract: 'member',
    type: 'q-fees-&-incentives-membership-panel',
  },
  {
    // EPDR_MembershipVoting
    typeContract: 'member',
    type: 'q-defi-(decentralized-finance)-membership-panel',
  },
  {
    // EPQFI_ParametersVoting
    typeContract: 'parameters',
    type: 'q-fees-&-incentives-membership-panel',
  },
  {
    // EPDR_ParametersVoting
    typeContract: 'parameters',
    type: 'q-defi-(decentralized-finance)-membership-panel',
  }
];

export function creationExpertContractObj(drizzle, contractName) {
  switch (contractName) {
    case 'EPQFI_MembershipVoting':
    case 'EPDR_MembershipVoting':
      return new MembershipVotingService(contractName);
    case 'EPQFI_ParametersVoting':
    case 'EPDR_ParametersVoting':
      return new ParametersVotingService(contractName);
  }
}

export function creationExpertContractsObjArray(drizzle) {
  let contracts = [];
  for (let contract of arrContractsExpert) {
    contracts.push(chooseExpertContractDependsOnType(drizzle, contract.typeContract, contract.type));
  }
  return contracts;
}
