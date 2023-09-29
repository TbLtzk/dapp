import type { ChainId } from '@distributedlab/w3p';
import { RootNodesMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesMembershipVotingInstance';
import { transformToPercentage } from '@q-dev/utils';
import { ProposalEvent } from 'typings/contracts';
import { RootNodeProposalForm } from 'typings/forms';
import { Proposal } from 'typings/proposals';

import { getContractProposals } from '.';

import { getRootNodesMembershipVotingInstance } from 'contracts/contract-instance';

import { ZERO_ADDRESS, ZERO_BYTES_32 } from 'constants/boundaries';
import { fromWei } from 'utils/web3';

export async function getRootNodeProposals (
  proposals: ProposalEvent[],
  lastBlock: number,
  chainId: ChainId
) {
  return getContractProposals({
    proposals,
    contract: await getRootNodesMembershipVotingInstance(),
    lastBlock,
    contractName: 'rootNodesMembershipVoting',
    chainId,
  });
}

export async function createRootNodeProposal (
  form: RootNodeProposalForm,
  address: string,
) {
  const contract = await getRootNodesMembershipVotingInstance();
  return contract.createProposal(
    form.externalLink,
    form.type === 'add-root-node' ? address : ZERO_ADDRESS,
    form.address || ZERO_ADDRESS,
    form.hash || ZERO_BYTES_32,
    { from: address }
  );
}

export async function getRootNodeProposal (
  contract: RootNodesMembershipVotingInstance,
  id: string
): Promise<Partial<Proposal>> {
  const proposal = await contract.getProposal(id);

  return {
    votingEndTime: Number(proposal.base.params.votingEndTime),
    vetoEndTime: Number(proposal.base.params.vetoEndTime),
    remark: proposal.base.remark,
    candidate: proposal.candidate,
    replaceDest: proposal.replaceDest,

    votesFor: Number(fromWei(proposal.base.counters.weightFor)),
    votesAgainst: Number(fromWei(proposal.base.counters.weightAgainst)),
    vetoesNumber: Number(proposal.base.counters.vetosCount),

    requiredMajority: Number(transformToPercentage(proposal.base.params.requiredMajority)),
    requiredQuorum: Number(transformToPercentage(proposal.base.params.requiredQuorum)),
  };
}
