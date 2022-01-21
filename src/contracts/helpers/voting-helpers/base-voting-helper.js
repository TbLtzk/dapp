import SlashingVotingService from './slashing-voting-helper'
import RootsVotingService from './roots-voting-helper'
import ConstitutionVotingService from './constitution-voting-helper'
import EmergencyUpdateVotingService from './emergency-update-voting-helper'
import GeneralUpdateVotingService from './general-update-voting-helper'
import MembershipVoting from './membership-voting-helper'
import ParametersVoting from './parameters-voting-helper'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { BN } from 'func/useful'
import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts'
import ErrorHandler from 'func/ErrorHandler'
import ContractUpdates from './contract-updates'

export const getStatusTransformation = (statusId) => {
  const status = ['None', 'Pending', 'Rejected', 'Accepted', 'Passed', 'Executed', 'Obsolete', 'Expired']
  return status[Number(statusId)]
}
export const getTypeParameter = (id) => {
  const status = ['None', 'Pending', 'Rejected', 'Accepted', 'Passed', 'Boolean', 'Obsolete']
  return status[Number(id)]
}

export const getPercentageFormat = (number) => {
  return BN(number)
    .multipliedBy(BN(10 ** 27))
    .dividedBy(100)
    .toFixed()
}

export const transformToPercentage = (number) => {
  const amount = '10000000000000000000000000'
  let convertedNumber = BN(number).dividedBy(amount)
  if (convertedNumber?.e < 0) {
    convertedNumber = convertedNumber.toFixed(10)
  } else {
    convertedNumber = Math.round(convertedNumber?.c[0])
  }
  return convertedNumber
}

export function creationSlashingContractObj (contractName) {
  return new SlashingVotingService(contractName)
}

export function creationSlashingContractsObjArray () {
  const validatorsSlashingVoting = new SlashingVotingService(CONTRACTS_NAMES.validatorsSlashingVoting)
  const rootNodesSlashingVoting = new SlashingVotingService(CONTRACTS_NAMES.rootNodesSlashingVoting)
  return [validatorsSlashingVoting, rootNodesSlashingVoting]
}

export function creationRootContractObj () {
  return new RootsVotingService(CONTRACTS_NAMES.rootsVoting)
}

export function creationQContractObj (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.constitutionVoting:
      return new ConstitutionVotingService(CONTRACTS_NAMES.constitutionVoting)
    case CONTRACTS_NAMES.emergencyUpdateVoting:
      return new EmergencyUpdateVotingService(CONTRACTS_NAMES.emergencyUpdateVoting)
    case CONTRACTS_NAMES.generalUpdateVoting:
      return new GeneralUpdateVotingService(CONTRACTS_NAMES.generalUpdateVoting)
  }
}

export function creationQContractsObjArray () {
  const constitutionVoting = new ConstitutionVotingService(CONTRACTS_NAMES.constitutionVoting)
  const emergencyUpdateVoting = new EmergencyUpdateVotingService(CONTRACTS_NAMES.emergencyUpdateVoting)
  const generalUpdateVoting = new GeneralUpdateVotingService(CONTRACTS_NAMES.generalUpdateVoting)
  return [constitutionVoting, emergencyUpdateVoting, generalUpdateVoting]
}

export const arrContractsExpert = [
  {
    typeContract: CONTRACT_TYPES.member,
    type: CONTRACT_TYPES.qFee
  },
  {
    typeContract: CONTRACT_TYPES.member,
    type: CONTRACT_TYPES.qDefi
  },
  {
    typeContract: CONTRACT_TYPES.parameters,
    type: CONTRACT_TYPES.qFee
  },
  {
    typeContract: CONTRACT_TYPES.parameters,
    type: CONTRACT_TYPES.qDefi
  }
]

export function creationExpertContractObj (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.ePQFIMembershipVoting:
    case CONTRACTS_NAMES.ePDRMembershipVoting:
      return new MembershipVoting(contractName)
    case CONTRACTS_NAMES.ePQFIParametersVoting:
    case CONTRACTS_NAMES.ePDRParametersVoting:
      return new ParametersVoting(contractName)
  }
}

export function creationExpertContractsObjArray () {
  const ePQFImembershipVoting = new MembershipVoting(CONTRACTS_NAMES.ePQFIMembershipVoting)
  const ePDRmembershipVoting = new MembershipVoting(CONTRACTS_NAMES.ePDRMembershipVoting)
  const ePQFIparametersVoting = new ParametersVoting(CONTRACTS_NAMES.ePQFIParametersVoting)
  const ePDRparametersVoting = new ParametersVoting(CONTRACTS_NAMES.ePDRParametersVoting)
  return [ePQFImembershipVoting, ePDRmembershipVoting, ePQFIparametersVoting, ePDRparametersVoting]
}

export function creationUpdatesContractObjArray () {
  const upgradeVoting = new ContractUpdates(CONTRACTS_NAMES.upgradeVoting)
  const addressVoting = new ContractUpdates(CONTRACTS_NAMES.addressVoting)
  return [upgradeVoting, addressVoting]
}

export function creationUpdatesContractObj (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.addressVoting:
      return new ContractUpdates(CONTRACTS_NAMES.addressVoting)
    case CONTRACTS_NAMES.upgradeVoting:
      return new ContractUpdates(CONTRACTS_NAMES.upgradeVoting)
  }
}
export function tabSwitcher (activeTab, qProp, rootNodeProp, expertProp, slashingProp) {
  switch (activeTab) {
    case PROPOSALS_TYPES.proposals:
      return qProp
    case PROPOSALS_TYPES.rootNodePanel:
      return rootNodeProp
    case PROPOSALS_TYPES.expertProposals:
      return expertProp
    case PROPOSALS_TYPES.slashingProposals:
      return slashingProp
  }
}

export async function getProposal (contractName, id, oneProposal) {
  try {
    switch (contractName) {
      case CONTRACTS_NAMES.constitutionVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
      case CONTRACTS_NAMES.generalUpdateVoting: {
        const contract = creationQContractObj(contractName)
        const proposal = await contract.getProposal(id, oneProposal)
        return proposal
      }
      case CONTRACTS_NAMES.rootsVoting: {
        const contract = creationRootContractObj()
        const proposal = await contract.getProposal(id, oneProposal)
        return proposal
      }
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting: {
        const contract = creationSlashingContractObj(contractName)
        const proposal = await contract.getProposal(id, oneProposal)
        return proposal
      }
      case CONTRACTS_NAMES.ePQFIMembershipVoting:
      case CONTRACTS_NAMES.ePDRMembershipVoting:
      case CONTRACTS_NAMES.ePQFIParametersVoting:
      case CONTRACTS_NAMES.ePDRParametersVoting: {
        const contract = creationExpertContractObj(contractName)
        const proposal = await contract.getProposal(id, oneProposal)
        return proposal
      }
      case CONTRACTS_NAMES.addressVoting:
      case CONTRACTS_NAMES.upgradeVoting: {
        const contract = creationUpdatesContractObj(contractName)
        const proposal = await contract.getProposal(id, oneProposal)
        return proposal
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
}

export const chooseSlashingContractDependsOnType = (type) => {
  let contractName = null
  if (type === CONTRACT_TYPES.rootNodeSlashing) {
    contractName = CONTRACTS_NAMES.rootNodesSlashingVoting
  } else if (type === CONTRACT_TYPES.validatorNodeSlashing) {
    contractName = CONTRACTS_NAMES.validatorsSlashingVoting
  }

  return new SlashingVotingService(contractName)
}

export const chooseExpertContractDependsOnType = (typeContract, type) => {
  let contract = null
  let contractName = null
  switch (type) {
    case CONTRACT_TYPES.qFee:
      if (typeContract === CONTRACT_TYPES.member) {
        contractName = CONTRACTS_NAMES.ePQFIMembershipVoting
        contract = new MembershipVoting(contractName)
      } else if (typeContract === CONTRACT_TYPES.parameters) {
        contractName = CONTRACTS_NAMES.ePQFIParametersVoting
        contract = new ParametersVoting(contractName)
      }
      break
    case CONTRACT_TYPES.qDefi:
      if (typeContract === CONTRACT_TYPES.member) {
        contractName = CONTRACTS_NAMES.ePDRMembershipVoting
        contract = new MembershipVoting(contractName)
      } else if (typeContract === CONTRACT_TYPES.parameters) {
        contractName = CONTRACTS_NAMES.ePDRParametersVoting
        contract = new ParametersVoting(contractName)
      }
      break
  }
  return contract
}

export function getVoteDelegation (agent, ownWeight, address) {
  const zeroAddress = '0x0000000000000000000000000000000000000000'
  const info = {}

  switch (true) {
    case !agent: {
      info.delegateInfo = '...'
      info.votingInfo = '...'
      break
    }
    case agent !== address && agent !== zeroAddress: {
      info.delegateInfo = `You delegated your voting rights to ${agent}`
      info.votingInfo = `Your voting agent is ${agent}`
      break
    }
    case Number(ownWeight) && agent === address: {
      info.delegateInfo = 'You exercise your voting right yourself'
      info.votingInfo = 'You vote for yourself'
      break
    }
    default: {
      const title = 'You currently have no voting weight & rights'
      info.delegateInfo = title
      info.votingInfo = title
    }
  }
  return info
}
