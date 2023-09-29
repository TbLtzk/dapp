import type { ChainId } from '@distributedlab/w3p';
import { ContractRegistryAddressVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryAddressVoting';
import { ContractRegistryUpgradeVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryUpgradeVoting';
import flatten from 'lodash/flatten';
import { ProposalEvent } from 'typings/contracts';
import { Proposal } from 'typings/proposals';

import { getContractProposals } from '.';

import { getAddressVotingInstance, getRootNodesInstance, getUpgradeVotingInstance } from 'contracts/contract-instance';

export async function getContractUpdateProposals (
  proposals: ProposalEvent[],
  lastBlock: number,
  chainId: ChainId
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getAddressVotingInstance(),
      lastBlock,
      contractName: 'addressVoting',
      chainId,
    }),
    getContractProposals({
      proposals,
      contract: await getUpgradeVotingInstance(),
      lastBlock,
      contractName: 'upgradeVoting',
      chainId,
    }),
  ]);

  return flatten(newProposals);
}

export async function getContractUpdateProposal (
  contract: ContractRegistryAddressVotingInstance | ContractRegistryUpgradeVotingInstance,
  id: string
): Promise<Partial<Proposal>> {
  const proposal = await contract.getProposal(id);
  const voteCount = await contract.instance.voteCount(id);

  const rootNodesInstance = await getRootNodesInstance();
  const rootNodesNumber = await rootNodesInstance.getSize();

  return {
    votingEndTime: Number(proposal.votingExpiredTime),
    proxy: proposal.proxy,
    implementation: 'implementation' in proposal ? proposal.implementation : '',
    key: 'key' in proposal ? proposal.key : '',
    votesFor: Number(voteCount),
    votesAgainst: Number(rootNodesNumber) - Number(voteCount),
    currentQuorum: Number(voteCount) / Number(rootNodesNumber) * 100,
    requiredQuorum: 50
  };
}
