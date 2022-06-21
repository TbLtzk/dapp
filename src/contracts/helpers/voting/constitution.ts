import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';
import { QProposalForm } from 'typings/forms';

import { getContractProposals } from '.';

import { getConstitutionVotingInstance, getEmergencyUpdateVotingInstance, getGeneralUpdateVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getQProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getConstitutionVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.constitutionVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEmergencyUpdateVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.emergencyUpdateVoting
    }),
    getContractProposals({
      proposals,
      contract: await getGeneralUpdateVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.generalUpdateVoting
    })
  ]);

  return flatten(newProposals);
}

export async function createConstitutionProposal (
  form: QProposalForm,
  address: string
) {
  const contract = await getConstitutionVotingInstance();
  await contract.createProposal(
    form.externalLink,
    form.classification,
    form.hash,
    form.isParamsChanged
      ? form.params.map((item) => ({
        paramType: item.type,
        paramKey: item.key,
        paramValue: item.value
      }))
      : [],
    { from: address }
  );
}

export async function createGeneralProposal (
  form: QProposalForm,
  address: string
) {
  const contract = await getGeneralUpdateVotingInstance();
  return contract.createProposal(form.externalLink, { from: address });
}

export async function createEmergencyProposal (
  form: QProposalForm,
  address: string
) {
  const contract = await getEmergencyUpdateVotingInstance();
  return contract.createProposal(form.externalLink, { from: address });
}
