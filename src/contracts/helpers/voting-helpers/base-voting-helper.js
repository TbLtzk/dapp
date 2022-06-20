import ConstitutionVotingService from './constitution-voting-helper';
import ContractUpdates from './contract-updates';
import EmergencyUpdateVotingService from './emergency-update-voting-helper';
import GeneralUpdateVotingService from './general-update-voting-helper';
import MembershipVoting from './membership-voting-helper';
import ParametersVoting from './parameters-voting-helper';
import RootsVotingService from './roots-voting-helper';
import SlashingVotingService from './slashing-voting-helper';

import { ZERO_ADDRESS } from 'constants/config';
import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts';
import ErrorHandler from 'func/ErrorHandler';

export const getStatusTransformation = (statusId) => {
  const status = ['None', 'Pending', 'Rejected', 'Accepted', 'Passed', 'Executed', 'Obsolete', 'Expired'];
  return status[Number(statusId)];
};

export function creationQContractObj (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.constitutionVoting:
      return new ConstitutionVotingService(CONTRACTS_NAMES.constitutionVoting);
    case CONTRACTS_NAMES.emergencyUpdateVoting:
      return new EmergencyUpdateVotingService(CONTRACTS_NAMES.emergencyUpdateVoting);
    case CONTRACTS_NAMES.generalUpdateVoting:
      return new GeneralUpdateVotingService(CONTRACTS_NAMES.generalUpdateVoting);
  }
}

export function creationExpertContractObj (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.ePQFIMembershipVoting:
    case CONTRACTS_NAMES.ePDRMembershipVoting:
    case CONTRACTS_NAMES.ePRSMembershipVoting:
      return new MembershipVoting(contractName);
    case CONTRACTS_NAMES.ePQFIParametersVoting:
    case CONTRACTS_NAMES.ePDRParametersVoting:
    case CONTRACTS_NAMES.ePRSParametersVoting:
      return new ParametersVoting(contractName);
  }
}

export function creationUpdatesContractObj (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.addressVoting:
      return new ContractUpdates(CONTRACTS_NAMES.addressVoting);
    case CONTRACTS_NAMES.upgradeVoting:
      return new ContractUpdates(CONTRACTS_NAMES.upgradeVoting);
  }
}

export async function getProposal (contractName, id, oneProposal) {
  try {
    switch (contractName) {
      case CONTRACTS_NAMES.constitutionVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
      case CONTRACTS_NAMES.generalUpdateVoting: {
        const contract = creationQContractObj(contractName);
        const proposal = await contract.getProposal(id, oneProposal);
        return proposal;
      }
      case CONTRACTS_NAMES.rootsVoting: {
        const contract = new RootsVotingService(CONTRACTS_NAMES.rootsVoting);
        const proposal = await contract.getProposal(id, oneProposal);
        return proposal;
      }
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting: {
        const contract = new SlashingVotingService(contractName);
        const proposal = await contract.getProposal(id, oneProposal);
        return proposal;
      }
      case CONTRACTS_NAMES.ePQFIMembershipVoting:
      case CONTRACTS_NAMES.ePDRMembershipVoting:
      case CONTRACTS_NAMES.ePQFIParametersVoting:
      case CONTRACTS_NAMES.ePDRParametersVoting:
      case CONTRACTS_NAMES.ePRSParametersVoting:
      case CONTRACTS_NAMES.ePRSMembershipVoting: {
        const contract = creationExpertContractObj(contractName);
        const proposal = await contract.getProposal(id, oneProposal);
        return proposal;
      }
      case CONTRACTS_NAMES.addressVoting:
      case CONTRACTS_NAMES.upgradeVoting: {
        const contract = creationUpdatesContractObj(contractName);
        const proposal = await contract.getProposal(id, oneProposal);
        return proposal;
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

export const chooseSlashingContractDependsOnType = (type) => {
  const contractName = type === CONTRACT_TYPES.rootNodeSlashing
    ? CONTRACTS_NAMES.rootNodesSlashingVoting
    : CONTRACTS_NAMES.validatorsSlashingVoting;
  return new SlashingVotingService(contractName);
};

export const chooseExpertContractDependsOnType = (typeContract, type) => {
  switch (type) {
    case CONTRACT_TYPES.qFee:
      return typeContract === CONTRACT_TYPES.member
        ? new MembershipVoting(CONTRACTS_NAMES.ePQFIMembershipVoting)
        : new ParametersVoting(CONTRACTS_NAMES.ePQFIParametersVoting);

    case CONTRACT_TYPES.qDefi:
      return typeContract === CONTRACT_TYPES.member
        ? new MembershipVoting(CONTRACTS_NAMES.ePDRMembershipVoting)
        : new ParametersVoting(CONTRACTS_NAMES.ePDRParametersVoting);

    case CONTRACT_TYPES.qEprs:
      return typeContract === CONTRACT_TYPES.member
        ? new MembershipVoting(CONTRACTS_NAMES.ePRSMembershipVoting)
        : new ParametersVoting(CONTRACTS_NAMES.ePRSParametersVoting);
  }
};

export function getVoteDelegation (agent, ownWeight, address) {
  switch (true) {
    case !agent:
      return {
        delegateInfo: '...',
        votingInfo: '...'
      };

    case agent !== address && agent !== ZERO_ADDRESS:
      return {
        delegateInfo: `You delegated your voting rights to ${agent}`,
        votingInfo: `Your voting agent is ${agent}`
      };

    case Number(ownWeight) && agent === address:
      return {
        delegateInfo: 'You exercise your voting right yourself',
        votingInfo: 'You vote for yourself'
      };

    case agent === address:
      return {
        delegateInfo: 'You delegated your voting rights to yourself',
        votingInfo: 'You vote for yourself'
      };

    default:
      const title = 'You currently have no voting weight & rights';
      return {
        delegateInfo: title,
        votingInfo: title,
      };
  }
}
