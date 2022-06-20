import { ConstitutionVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/constitution/ConstitutionVotingInstance';
import { ContractRegistryAddressVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryAddressVoting';
import { ContractRegistryUpgradeVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryUpgradeVoting';
import { EmergencyUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/EmergencyUpdateVotingInstance';
import { EPDRMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPDRMembershipVotingInstance';
import { EPDRParametersVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPDRParametersVotingInstance';
import { EPQFIMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPQFIMembershipVotingInstance';
import { EPQFIParametersVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPQFIParametersVotingInstance';
import { EPRSMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPRSMembershipVotingInstance';
import { EPRSParametersVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPRSParametersVotingInstance';
import { GeneralUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/GeneralUpdateVotingInstance';
import { RootNodesMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesMembershipVotingInstance';
import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { ValidatorsSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsSlashingVotingInstance';

export type ProposalsContract =
  | ConstitutionVotingInstance
  | EmergencyUpdateVotingInstance
  | GeneralUpdateVotingInstance
  | RootNodesMembershipVotingInstance
  | RootNodesSlashingVotingInstance
  | ValidatorsSlashingVotingInstance
  | ContractRegistryAddressVotingInstance
  | ContractRegistryUpgradeVotingInstance
  | EPQFIMembershipVotingInstance
  | EPDRMembershipVotingInstance
  | EPQFIParametersVotingInstance
  | EPDRParametersVotingInstance
  | EPRSParametersVotingInstance
  | EPRSMembershipVotingInstance

export interface ProposalEvent {
  blockNumber: number
  id: string
  contract: string
  status?: string
}
