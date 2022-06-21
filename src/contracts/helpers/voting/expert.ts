import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';
import { ExpertProposalForm, ExpertType } from 'typings/forms';

import { getContractProposals } from './common';

import {
  getEpdrMembershipVotingInstance,
  getEpdrParametersVotingInstance,
  getEpqfiMembershipVotingInstance,
  getEpqfiParametersVotingInstance,
  getEprsMembershipVotingInstance,
  getEprsParametersVotingInstance
} from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getExpertProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getEpqfiMembershipVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePQFIMembershipVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEpdrMembershipVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePDRMembershipVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEpqfiParametersVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePQFIParametersVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEpdrParametersVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePDRParametersVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEprsParametersVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePRSParametersVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEprsMembershipVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePRSMembershipVoting
    })
  ]);

  return flatten(newProposals);
}

export async function createAddExpertProposal (
  form: ExpertProposalForm,
  address: string
) {
  const contract = await getMembershipContractByType(form.panelType);
  return contract.createAddExpertProposal(
    form.externalLink,
    form.address,
    { from: address }
  );
}

export async function createRemoveExpertProposal (
  form: ExpertProposalForm,
  address: string
) {
  const contract = await getMembershipContractByType(form.panelType);
  return contract.createRemoveExpertProposal(
    form.externalLink,
    form.address,
    { from: address }
  );
}

export async function createParameterVoteProposal (
  form: ExpertProposalForm,
  address: string
) {
  const contract = await getParametersContractByType(form.panelType);
  return contract.createProposal(
    form.externalLink,
    form.params.map((item) => ({
      paramType: item.type,
      paramKey: item.key,
      paramValue: item.value
    })),
    { from: address }
  );
}

async function getMembershipContractByType (type: ExpertType) {
  switch (type) {
    case 'fees-incentives':
      return getEpqfiMembershipVotingInstance();
    case 'defi':
      return getEpdrMembershipVotingInstance();
    case 'root-node':
      return getEprsMembershipVotingInstance();
  }
}

async function getParametersContractByType (type: ExpertType) {
  switch (type) {
    case 'fees-incentives':
      return getEpqfiParametersVotingInstance();
    case 'defi':
      return getEpdrParametersVotingInstance();
    case 'root-node':
      return getEprsParametersVotingInstance();
  }
}
