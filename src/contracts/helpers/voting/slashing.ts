import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';
import { SlashingProposalForm } from 'typings/forms';

import { getContractProposals } from '.';

import { getRootNodesSlashingVotingInstance, getValidatorsSlashingVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getSlashingProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getValidatorsSlashingVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.validatorsSlashingVoting
    }),
    getContractProposals({
      proposals,
      contract: await getRootNodesSlashingVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.rootNodesSlashingVoting
    }),
  ]);

  return flatten(newProposals);
}

export async function createRootNodeSlashingProposal (
  form: SlashingProposalForm,
  address: string
) {
  const contract = await getRootNodesSlashingVotingInstance();
  return contract.createProposal(
    form.externalLink,
    form.address,
    form.percent,
    { from: address }
  );
}

export async function createValidatorSlashingProposal (
  form: SlashingProposalForm,
  address: string
) {
  const contract = await getValidatorsSlashingVotingInstance();
  return contract.createProposal(
    form.externalLink,
    form.address,
    form.percent,
    { from: address }
  );
}
