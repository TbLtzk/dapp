import { ProposalEvent } from 'typings/contracts';
import { RootNodeProposalForm } from 'typings/forms';

import { getContractProposals } from '.';

import { getRootNodesMembershipVotingInstance } from 'contracts/contract-instance';

import { ZERO_ADDRESS } from 'constants/config';
import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getRootNodeProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  return getContractProposals({
    proposals,
    contract: await getRootNodesMembershipVotingInstance(),
    lastBlock,
    contractName: CONTRACTS_NAMES.rootsVoting
  });
}

export async function createRootNodeProposal (
  form: RootNodeProposalForm,
  address: string,
  isRemovingNode = form.isRemovingNode
) {
  const contract = await getRootNodesMembershipVotingInstance();
  return contract.createProposal(
    form.externalLink,
    form.type === 'add-root-node' ? address : ZERO_ADDRESS,
    isRemovingNode ? form.address : ZERO_ADDRESS,
    form.hash || '0x00',
    { from: address }
  );
}
