import SlashingVotingService from 'contracts/src/voting/SlashingVoting';
import RootsVotingService from 'contracts/src/voting/RootsVoting';
import ConstitutionVotingService from 'contracts/src/voting/ConstitutionVoting';
import EmergencyUpdateVotingService from 'contracts/src/voting/EmergencyUpdateVoting';
import GeneralUpdateVotingService from 'contracts/src/voting/GeneralUpdateVoting';
import MembershipVotingService from 'contracts/src/voting/MembershipVoting';
import ParametersVotingService from 'contracts/src/voting/ParametersVoting';
import { chooseExpertContractDependsOnType } from './QExpertVotingHandler';

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
    type: 'q-fees-&-incentives-expert-panel',
  },
  {
    // EPDR_MembershipVoting
    typeContract: 'member',
    type: 'q-defi-(decentralized-finance)-expert-panel',
  },
  {
    // EPQFI_ParametersVoting
    typeContract: 'parameters',
    type: 'q-fees-&-incentives-expert-panel',
  },
  {
    // EPDR_ParametersVoting
    typeContract: 'parameters',
    type: 'q-defi-(decentralized-finance)-expert-panel',
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
