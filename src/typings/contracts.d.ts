import { ContractRegistryInstance, SystemContractWithQBalance } from '@q-dev/q-js-sdk';
import { BaseContractInstance } from '@q-dev/q-js-sdk/lib/contracts/BaseContractInstance';
import { LiquidationAuctionInstance } from '@q-dev/q-js-sdk/lib/contracts/defi/LiquidationAuctionInstance';
import { SystemDebtAuctionInstance } from '@q-dev/q-js-sdk/lib/contracts/defi/SystemDebtAuctionInstance';
import { SystemSurplusAuctionInstance } from '@q-dev/q-js-sdk/lib/contracts/defi/SystemSurplusAuctionInstance';
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
import Web3 from 'web3';

declare global {
  interface Window {
    web3: Web3;
  }
}

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
  | EPRSMembershipVotingInstance;

export type AuctionInstance = LiquidationAuctionInstance | SystemDebtAuctionInstance | SystemSurplusAuctionInstance;

type KeyOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P: never
}[keyof T]

type ContractPromise = Promise<BaseContractInstance<any> | SystemContractWithQBalance[]>
export type ContractType = KeyOfType<ContractRegistryInstance, (val: string) => ContractPromise>;
type ContractValue<T extends ContractType> = ReturnType<ContractRegistryInstance[T]>;

export type ProposalContractType =
  | 'addressVoting'
  | 'upgradeVoting'
  | 'constitutionVoting'
  | 'emergencyUpdateVoting'
  | 'generalUpdateVoting'
  | 'rootNodesMembershipVoting'
  | 'rootNodesSlashingVoting'
  | 'validatorsSlashingVoting'
  | 'epqfiMembershipVoting'
  | 'epdrMembershipVoting'
  | 'epqfiParametersVoting'
  | 'epdrParametersVoting'
  | 'eprsMembershipVoting'
  | 'eprsParametersVoting'

export interface ProposalEvent {
  blockNumber: number;
  id: string;
  contract: ProposalContractType;
  status?: string;
}
