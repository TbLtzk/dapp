import { Classification, ProposalStatus, ValidatorsWithdrawalInfo } from '@q-dev/q-js-sdk';

import { ProposalContractType } from './contracts';
import { FormParameter } from './forms';

import { ObjectionStatus } from 'constants/slashing';

export type ProposalFilterStatus = '' | 'active' | 'ended';

export interface ProposalFilter {
  status: ProposalFilterStatus;
}

export type FormProposalType = 'q' | 'rootNode' | 'expert' | 'slashing';
export type ProposalType = FormProposalType | 'contractUpdate';

export type VotingType = 'basic' | 'constitution' | 'approve';

export interface ProposalRootNodeInfo {
  stake: string;
  withdrawalInfo: ValidatorsWithdrawalInfo;
};

export interface ProposalRootNodesInfo {
  addedNode?: ProposalRootNodeInfo;
  removedNode?: ProposalRootNodeInfo;
}

export interface Proposal {
  id: string;
  status: ProposalStatus;
  candidate: string;
  contract: ProposalContractType;
  parameters: FormParameter[];
  votingEndTime: number;
  votesFor: number;
  votesAgainst: number;
  requiredMajority: number;
  vetoEndTime: number;
  vetoesNumber: number;
  vetoThreshold: number;
  requiredQuorum: number;
  currentQuorum: number;
  rootNodesNumber: number;
  userVoted: boolean;
  userVetoed: boolean;
  key: string;
  implementation: string;
  proxy: string;
  addressToAdd: string;
  addressToRemove: string;
  remark: string;
  currentConstitutionHash: string;
  newConstitutionHash: string;
  classification?: Classification;
  replaceDest: string;
  amountToSlash: string | number;
  proposer: string;
  rootNodes?: ProposalRootNodesInfo;
}

export interface SlashingProposal extends Proposal {
  objEscrow: {
    objection: {
      appealConfirmed: boolean;
      appealEndTime: Date;
      objectionEndTime: Date;
      status: ObjectionStatus;
      slashedAmount: string | number;
      executed: boolean;
      remark: string;
      proposerRemark: string;
    };
    decision: {
      endDate: Date;
      requiredConfirmations: string | number;
      confirmationCount: string | number;
      proposer: string;
      externalReference: string;
      percentage: string | number;
      currentConfirmationPercentage: string | number;
    };
  };
}
