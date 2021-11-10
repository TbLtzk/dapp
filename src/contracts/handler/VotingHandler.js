import SlashingVotingService from '../src/voting/SlashingVoting'
import RootsVotingService from '../src/voting/RootsVoting'
import ConstitutionVotingService from '../src/voting/ConstitutionVoting'
import EmergencyUpdateVotingService from '../src/voting/EmergencyUpdateVoting'
import GeneralUpdateVotingService from '../src/voting/GeneralUpdateVoting'
import MembershipVoting from '../src/voting/MembershipVoting'
import ParametersVoting from '../src/voting/ParametersVoting'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { BN } from 'func/useful'
import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts'

export const getPastEvents = async (contract, event) => {
  try {
    const contractWeb3 = contract
    const eventOptions = {
      // topics: [],
      fromBlock: 0,
      toBlock: 'latest'
    }
    const result = await contractWeb3.getPastEvents(event, eventOptions)
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getPastProposalsIds = (proposalArr) => {
  return proposalArr?.map((evt) => evt.returnValues._id)
}

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
  return new RootsVotingService('RootsVoting')
}

export function creationQContractObj (contractName) {
  switch (contractName) {
    case CONTRACTS_NAMES.constitutionVoting:
      return new ConstitutionVotingService('ConstitutionVoting')
    case CONTRACTS_NAMES.emergencyUpdateVoting:
      return new EmergencyUpdateVotingService('EmergencyUpdateVoting')
    case CONTRACTS_NAMES.generalUpdateVoting:
      return new GeneralUpdateVotingService('GeneralUpdateVoting')
  }
}

export function creationQContractsObjArray () {
  const constitutionVoting = new ConstitutionVotingService('ConstitutionVoting')
  const emergencyUpdateVoting = new EmergencyUpdateVotingService('EmergencyUpdateVoting')
  const generalUpdateVoting = new GeneralUpdateVotingService('GeneralUpdateVoting')
  return [constitutionVoting, emergencyUpdateVoting, generalUpdateVoting]
}

export const arrContractsExpert = [
  {
    // EPQFIMembershipVoting
    typeContract: CONTRACT_TYPES.member,
    type: CONTRACT_TYPES.qFee
  },
  {
    // EPDRMembershipVoting
    typeContract: CONTRACT_TYPES.member,
    type: CONTRACT_TYPES.qDefi
  },
  {
    // EPQFIParametersVoting
    typeContract: CONTRACT_TYPES.parameters,
    type: CONTRACT_TYPES.qFee
  },
  {
    // EPDRParametersVoting
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
      return new MembershipVoting(contractName)
  }
}

export function creationExpertContractsObjArray () {
  const ePQFImembershipVoting = new MembershipVoting('EPQFIMembershipVoting')
  const ePDRmembershipVoting = new MembershipVoting('EPDRMembershipVoting')
  const ePQFIparametersVoting = new ParametersVoting('EPQFIParametersVoting')
  const ePDRparametersVoting = new ParametersVoting('EPDRParametersVoting')
  return [ePQFImembershipVoting, ePDRmembershipVoting, ePQFIparametersVoting, ePDRparametersVoting]
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

export function changeProposalsArrIfExist (proposalsArr, data) {
  const findElem = proposalsArr?.find((element) => {
    return element.id === data.result[0].id && element.contract === data.result[0].contract
  })
  if (findElem) {
    return proposalsArr?.map((element) => {
      if (element.id === data.result[0].id && element.contract === data.result[0].contract) {
        return { ...data.result[0] }
      } else {
        return { ...element }
      }
    })
  } else {
    return [...proposalsArr, ...data.result]
  }
}

export function changeProposalsArrIfEmptyResult (proposalsArr, data) {
  const findElem = proposalsArr?.find((element) => {
    return element.id === data.result.id && element.contract === data.result.contractName
  })
  if (findElem) {
    return proposalsArr?.filter((element) => {
      if (element.id === data.result.id && element.contract === data.result.contractName) {
        return false
      } else {
        return { ...element }
      }
    })
  }
}
