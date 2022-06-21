import { ProposalStatus } from '@q-dev/q-js-sdk';
import { uniqBy } from 'lodash';
import { ProposalEvent, ProposalsContract } from 'typings/contracts';
import { CreateProposalForm } from 'typings/forms';

import { createConstitutionProposal, createEmergencyProposal, createGeneralProposal } from './constitution';
import { createAddExpertProposal, createParameterVoteProposal, createRemoveExpertProposal } from './expert';
import { createRootNodeProposal } from './root-node';
import { createRootNodeSlashingProposal, createValidatorSlashingProposal } from './slashing';

export async function getContractProposals ({
  proposals,
  contract,
  lastBlock,
  contractName
}: {
  proposals: ProposalEvent[],
  contract: ProposalsContract,
  lastBlock: number,
  contractName: string
}): Promise<ProposalEvent[]> {
  const contractProposals = proposals.filter(({ contract }) => contract === contractName);
  const activeProposals = contractProposals.filter(({ status }) => status === 'active');

  const newProposals = await getProposalEvents(contract, {
    fromBlock: lastBlock,
    contractName
  });

  const proposalsToCheck = [...activeProposals, ...newProposals];
  const result = await Promise.all(proposalsToCheck.map(async (proposal) => {
    const status = await contract.getStatus(proposal.id);
    if (status === ProposalStatus.NONE) return { ...proposal, status };

    const isActive = [
      ProposalStatus.PENDING,
      ProposalStatus.ACCEPTED,
      ProposalStatus.PASSED
    ].includes(status);

    return {
      ...proposal,
      status: isActive ? 'active' : 'ended'
    };
  }));

  return uniqBy([...result, ...contractProposals], 'id');
}

export async function getProposalEvents (
  contract: ProposalsContract,
  { fromBlock = 0, toBlock = 'latest', contractName = '' }
): Promise<ProposalEvent[]> {
  const pastEvents = await contract.instance.getPastEvents(
    'ProposalCreated',
    { fromBlock, toBlock }
  );

  return pastEvents.map((evt) => ({
    blockNumber: evt.blockNumber,
    id: evt.returnValues._id || evt.returnValues._proposalId,
    contract: contractName
  }));
}

export async function createProposal (form: CreateProposalForm, address: string) {
  switch (form.type) {
    case 'constitution':
      return createConstitutionProposal(form, address);
    case 'emergency':
      return createEmergencyProposal(form, address);
    case 'general':
      return createGeneralProposal(form, address);
    case 'add-root-node':
      return createRootNodeProposal(form, address);
    case 'remove-root-node':
      return createRootNodeProposal(form, address, true);
    case 'root-slashing':
      return createRootNodeSlashingProposal(form, address);
    case 'validator-slashing':
      return createValidatorSlashingProposal(form, address);
    case 'add-expert':
      return createAddExpertProposal(form, address);
    case 'remove-expert':
      return createRemoveExpertProposal(form, address);
    case 'parameter-vote':
      return createParameterVoteProposal(form, address);
  };
}
